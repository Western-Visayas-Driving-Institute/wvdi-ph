/**
 * Lead Capture API - Google Sheets Integration
 * Uses upsert logic: updates existing row if threadId exists, otherwise appends new row
 * Updated: Philippine timezone (Asia/Manila) for timestamps
 */

// Google Sheets configuration
const SHEETS_ID = process.env.GOOGLE_SHEETS_ID || '1LjJLLHIzGl-s78keZwkGV20GUgaJgw8qKacNTo6UgVk';
const SHEET_NAME = process.env.GOOGLE_SHEET_NAME || 'Sheet1';

// Column headers for the spreadsheet (8 columns: A-H)
const HEADERS = [
  'Thread ID',
  'Timestamp',
  'Name',
  'Email',
  'Phone',
  'Services',
  'Summary',
  'Conversation'
];

/**
 * Get Google API access token using service account
 */
async function getAccessToken() {
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');

  if (!email || !privateKey) {
    throw new Error('Google service account credentials not configured');
  }

  // Create JWT for service account authentication
  const now = Math.floor(Date.now() / 1000);
  const header = { alg: 'RS256', typ: 'JWT' };
  const payload = {
    iss: email,
    scope: 'https://www.googleapis.com/auth/spreadsheets',
    aud: 'https://oauth2.googleapis.com/token',
    iat: now,
    exp: now + 3600,
  };

  // Base64URL encode
  const base64url = (obj) => {
    const json = JSON.stringify(obj);
    const base64 = Buffer.from(json).toString('base64');
    return base64.replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
  };

  const signInput = `${base64url(header)}.${base64url(payload)}`;

  // Sign with private key
  const crypto = await import('crypto');
  const sign = crypto.createSign('RSA-SHA256');
  sign.update(signInput);
  const signature = sign.sign(privateKey, 'base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');

  const jwt = `${signInput}.${signature}`;

  // Exchange JWT for access token
  const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&assertion=${jwt}`,
  });

  if (!tokenResponse.ok) {
    const errorText = await tokenResponse.text();
    throw new Error(`Failed to get access token: ${errorText}`);
  }

  const tokenData = await tokenResponse.json();
  return tokenData.access_token;
}

/**
 * Check if headers exist and add them if not
 * If data exists without headers, insert a new row at the top
 */
async function ensureHeaders(accessToken) {
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEETS_ID}/values/${SHEET_NAME}!A1:H1`;

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to read headers: ${errorText}`);
  }

  const data = await response.json();
  const existingHeaders = data.values?.[0] || [];

  // Check if headers already exist (first cell should be "Thread ID")
  if (existingHeaders[0] === 'Thread ID') {
    return; // Headers already exist
  }

  // If there's existing data (not headers), insert a new row at top first
  if (existingHeaders.length > 0 && existingHeaders[0]) {
    console.log('Existing data found, inserting new row for headers');

    // Insert a new row at position 0 (top)
    const insertUrl = `https://sheets.googleapis.com/v4/spreadsheets/${SHEETS_ID}:batchUpdate`;
    const insertResponse = await fetch(insertUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        requests: [{
          insertDimension: {
            range: {
              sheetId: 0, // First sheet
              dimension: 'ROWS',
              startIndex: 0,
              endIndex: 1
            },
            inheritFromBefore: false
          }
        }]
      }),
    });

    if (!insertResponse.ok) {
      const errorText = await insertResponse.text();
      console.error('Failed to insert row:', errorText);
      // Continue anyway - we'll try to write headers
    }
  }

  // Add headers to row 1
  const headerUrl = `https://sheets.googleapis.com/v4/spreadsheets/${SHEETS_ID}/values/${SHEET_NAME}!A1:H1?valueInputOption=USER_ENTERED`;

  const headerResponse = await fetch(headerUrl, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ values: [HEADERS] }),
  });

  if (!headerResponse.ok) {
    const errorText = await headerResponse.text();
    throw new Error(`Failed to add headers: ${errorText}`);
  }

  console.log('Headers added to spreadsheet');
}

/**
 * Find row number by threadId (Column A)
 * Returns row number (1-indexed) or null if not found
 * Skips row 1 (headers)
 */
async function findRowByThreadId(accessToken, threadId) {
  // Get all values from column A (thread IDs)
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEETS_ID}/values/${SHEET_NAME}!A:A`;

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to read sheet: ${errorText}`);
  }

  const data = await response.json();
  const values = data.values || [];

  // Find the row with matching threadId (skip row 0 which is headers)
  for (let i = 1; i < values.length; i++) {
    if (values[i][0] === threadId) {
      return i + 1; // Row numbers are 1-indexed
    }
  }

  return null;
}

/**
 * Update existing row in Google Sheets
 * Columns: Thread ID | Timestamp | Name | Email | Phone | Services | Summary | Conversation
 */
async function updateRow(accessToken, rowNumber, leadData) {
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEETS_ID}/values/${SHEET_NAME}!A${rowNumber}:H${rowNumber}?valueInputOption=USER_ENTERED`;

  const values = [[
    leadData.threadId || '',
    leadData.timestamp || '',
    leadData.name || '',
    leadData.email || '',
    leadData.phone || '',
    leadData.services || '',
    leadData.summary || '',
    leadData.conversation || '',
  ]];

  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ values }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to update row: ${errorText}`);
  }

  return await response.json();
}

/**
 * Append new row to Google Sheets
 * Columns: Thread ID | Timestamp | Name | Email | Phone | Services | Summary | Conversation
 */
async function appendRow(accessToken, leadData) {
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEETS_ID}/values/${SHEET_NAME}!A:H:append?valueInputOption=USER_ENTERED`;

  const values = [[
    leadData.threadId || '',
    leadData.timestamp || '',
    leadData.name || '',
    leadData.email || '',
    leadData.phone || '',
    leadData.services || '',
    leadData.summary || '',
    leadData.conversation || '',
  ]];

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ values }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to append to sheet: ${errorText}`);
  }

  return await response.json();
}

/**
 * Upsert lead data to Google Sheets
 * Updates existing row if threadId found, otherwise appends new row
 */
async function upsertToSheet(leadData) {
  const accessToken = await getAccessToken();

  // Ensure headers exist in row 1
  await ensureHeaders(accessToken);

  // Find existing row by threadId
  const existingRow = await findRowByThreadId(accessToken, leadData.threadId);

  if (existingRow) {
    // Update existing row
    console.log(`Updating existing row ${existingRow} for thread ${leadData.threadId}`);
    return await updateRow(accessToken, existingRow, leadData);
  } else {
    // Append new row
    console.log(`Appending new row for thread ${leadData.threadId}`);
    return await appendRow(accessToken, leadData);
  }
}

/**
 * API Handler
 */
export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { sessionId, lead, conversationSummary, fullConversation } = req.body;

    // Debug logging
    console.log('Leads API received:', {
      sessionId: sessionId || 'MISSING',
      hasLead: !!lead,
      leadName: lead?.name
    });

    if (!lead) {
      return res.status(400).json({ error: 'Lead data is required' });
    }

    if (!sessionId) {
      console.log('ERROR: sessionId is missing from request');
      return res.status(400).json({ error: 'Thread ID is required' });
    }

    // Format lead data for Google Sheets
    // Use Philippine timezone (Asia/Manila) for timestamp
    const philippineTimestamp = new Date().toLocaleString('en-PH', {
      timeZone: 'Asia/Manila',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    });

    const leadData = {
      threadId: sessionId, // sessionId from frontend becomes threadId in sheets
      timestamp: philippineTimestamp,
      name: lead.name || '',
      email: Array.isArray(lead.emails) ? lead.emails.join(', ') : (lead.email || ''),
      phone: Array.isArray(lead.phones) ? lead.phones.join(', ') : (lead.phone || ''),
      services: Array.isArray(lead.services) ? lead.services.join(', ') : (lead.services || ''),
      summary: lead.needsDescription || '',
      conversation: (fullConversation || lead.fullConversation || conversationSummary || '').substring(0, 5000),
    };

    // Check if there's any useful data (name OR contact info)
    if (!leadData.name && !leadData.email && !leadData.phone) {
      return res.status(200).json({
        success: false,
        message: 'No contact information to save'
      });
    }

    // Upsert to Google Sheets (update if exists, append if new)
    await upsertToSheet(leadData);

    return res.status(200).json({
      success: true,
      message: 'Lead saved successfully',
    });

  } catch (error) {
    console.error('Error saving lead:', error);

    // Check if it's a configuration error
    if (error.message.includes('credentials not configured')) {
      return res.status(500).json({
        error: 'Google Sheets not configured',
        details: 'Service account credentials are missing',
      });
    }

    return res.status(500).json({
      error: 'Failed to save lead',
      details: error.message,
    });
  }
}
