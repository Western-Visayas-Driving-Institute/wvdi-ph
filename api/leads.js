/**
 * Lead Capture API - Google Sheets Integration
 * Uses upsert logic: updates existing row if sessionId exists, otherwise appends new row
 */

// Google Sheets configuration
const SHEETS_ID = process.env.GOOGLE_SHEETS_ID || '1LjJLLHIzGl-s78keZwkGV20GUgaJgw8qKacNTo6UgVk';
const SHEET_NAME = process.env.GOOGLE_SHEET_NAME || 'Sheet1';

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
 * Find row number by sessionId (Column A)
 * Returns row number (1-indexed) or null if not found
 */
async function findRowBySessionId(accessToken, sessionId) {
  // Get all values from column A (session IDs)
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

  // Find the row with matching sessionId
  for (let i = 0; i < values.length; i++) {
    if (values[i][0] === sessionId) {
      return i + 1; // Row numbers are 1-indexed
    }
  }

  return null;
}

/**
 * Update existing row in Google Sheets
 * Columns: SessionID | Timestamp | Name | Email | Phone | Services | Branch | Needs Description | Full Conversation
 */
async function updateRow(accessToken, rowNumber, leadData) {
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEETS_ID}/values/${SHEET_NAME}!A${rowNumber}:I${rowNumber}?valueInputOption=USER_ENTERED`;

  const values = [[
    leadData.sessionId,
    leadData.timestamp,
    leadData.name,
    leadData.email,
    leadData.phone,
    leadData.services,
    leadData.preferredBranch,
    leadData.needsDescription,
    leadData.fullConversation,
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
 * Columns: SessionID | Timestamp | Name | Email | Phone | Services | Branch | Needs Description | Full Conversation
 */
async function appendRow(accessToken, leadData) {
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEETS_ID}/values/${SHEET_NAME}!A:I:append?valueInputOption=USER_ENTERED`;

  const values = [[
    leadData.sessionId,
    leadData.timestamp,
    leadData.name,
    leadData.email,
    leadData.phone,
    leadData.services,
    leadData.preferredBranch,
    leadData.needsDescription,
    leadData.fullConversation,
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
 * Updates existing row if sessionId found, otherwise appends new row
 */
async function upsertToSheet(leadData) {
  const accessToken = await getAccessToken();

  // Find existing row by sessionId
  const existingRow = await findRowBySessionId(accessToken, leadData.sessionId);

  if (existingRow) {
    // Update existing row
    console.log(`Updating existing row ${existingRow} for session ${leadData.sessionId}`);
    return await updateRow(accessToken, existingRow, leadData);
  } else {
    // Append new row
    console.log(`Appending new row for session ${leadData.sessionId}`);
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

    if (!lead) {
      return res.status(400).json({ error: 'Lead data is required' });
    }

    if (!sessionId) {
      return res.status(400).json({ error: 'Session ID is required' });
    }

    // Format lead data for Google Sheets
    const leadData = {
      sessionId: sessionId,
      timestamp: new Date().toISOString(),
      name: lead.name || '',
      email: Array.isArray(lead.emails) ? lead.emails.join(', ') : (lead.email || ''),
      phone: Array.isArray(lead.phones) ? lead.phones.join(', ') : (lead.phone || ''),
      services: Array.isArray(lead.services) ? lead.services.join(', ') : (lead.services || ''),
      preferredBranch: lead.preferredBranch || '',
      needsDescription: lead.needsDescription || '',
      fullConversation: (fullConversation || lead.fullConversation || conversationSummary || '').substring(0, 5000),
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
