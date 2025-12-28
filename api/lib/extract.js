/**
 * Lead Information Extraction
 * Extracts contact details and service interests from chat messages
 */

// Philippine phone number patterns
const PHONE_PATTERNS = [
  // Mobile: 09XXXXXXXXX or +639XXXXXXXXX
  /(?:\+63|0)9\d{9}/g,
  // With spaces/dashes: 0917 123 4567 or 0917-123-4567
  /(?:\+63|0)9\d{2}[\s-]?\d{3}[\s-]?\d{4}/g,
  // Landline: (02) 1234 5678 or 02-1234-5678
  /\(?\d{2,4}\)?[\s-]?\d{3,4}[\s-]?\d{4}/g,
];

// Email pattern
const EMAIL_PATTERN = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;

// Name patterns (simple heuristics)
const NAME_INDICATORS = [
  /(?:my name is|i'm|i am|this is)\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)/i,
  /(?:name|call me)\s*[:\s]+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)/i,
];

// Service/interest keywords
const SERVICE_KEYWORDS = {
  'tdc': 'TDC (Theoretical Driving Course)',
  'theoretical': 'TDC (Theoretical Driving Course)',
  'practical': 'Practical Driving Course (PDC)',
  'pdc': 'Practical Driving Course (PDC)',
  'beginner': 'Beginner Package',
  'master': 'Master Package',
  'refresher': 'Refresher Course',
  'motorcycle': 'Motorcycle Training',
  'car': 'Car/Motor Vehicle Training',
  'renewal': 'License Renewal',
  'international': 'International License',
  'defensive': 'Defensive Driving',
  'corporate': 'Corporate Training',
  'assessment': 'Driving Assessment',
  'student permit': 'Student Permit',
  'license': 'License-related Service',
};

/**
 * Extract phone numbers from text
 */
export function extractPhones(text) {
  const phones = new Set();

  for (const pattern of PHONE_PATTERNS) {
    const matches = text.match(pattern) || [];
    matches.forEach(phone => {
      // Normalize phone number
      const normalized = phone.replace(/[\s-()]/g, '');
      phones.add(normalized);
    });
  }

  return Array.from(phones);
}

/**
 * Extract email addresses from text
 */
export function extractEmails(text) {
  const matches = text.match(EMAIL_PATTERN) || [];
  return [...new Set(matches.map(e => e.toLowerCase()))];
}

/**
 * Extract potential name from text
 */
export function extractName(text) {
  for (const pattern of NAME_INDICATORS) {
    const match = text.match(pattern);
    if (match && match[1]) {
      return match[1].trim();
    }
  }
  return null;
}

/**
 * Extract service interests from text
 */
export function extractServices(text) {
  const services = new Set();
  const lowerText = text.toLowerCase();

  for (const [keyword, serviceName] of Object.entries(SERVICE_KEYWORDS)) {
    if (lowerText.includes(keyword)) {
      services.add(serviceName);
    }
  }

  return Array.from(services);
}

/**
 * Extract all lead information from a message or conversation
 */
export function extractLeadInfo(text) {
  return {
    phones: extractPhones(text),
    emails: extractEmails(text),
    name: extractName(text),
    services: extractServices(text),
  };
}

/**
 * Merge lead info from multiple messages
 */
export function mergeLeadInfo(existingLead, newInfo) {
  return {
    phones: [...new Set([...(existingLead.phones || []), ...(newInfo.phones || [])])],
    emails: [...new Set([...(existingLead.emails || []), ...(newInfo.emails || [])])],
    name: newInfo.name || existingLead.name || null,
    services: [...new Set([...(existingLead.services || []), ...(newInfo.services || [])])],
  };
}

/**
 * Check if lead info has any useful data
 */
export function hasLeadData(lead) {
  return (
    (lead.phones && lead.phones.length > 0) ||
    (lead.emails && lead.emails.length > 0) ||
    lead.name
  );
}

/**
 * Format lead info for storage
 */
export function formatLeadForStorage(lead, conversationSummary = '') {
  return {
    timestamp: new Date().toISOString(),
    name: lead.name || '',
    email: lead.emails?.join(', ') || '',
    phone: lead.phones?.join(', ') || '',
    services: lead.services?.join(', ') || '',
    conversationSummary: conversationSummary.substring(0, 500), // Limit length
  };
}
