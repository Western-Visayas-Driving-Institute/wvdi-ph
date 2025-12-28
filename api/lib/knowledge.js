/**
 * WVDI Knowledge Base
 * Loads and formats data for chatbot system prompt
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataDir = path.join(__dirname, '../../src/data');

// Cache loaded data
let cachedKnowledge = null;

/**
 * Load JSON data file
 */
function loadJsonFile(filename) {
  try {
    const filePath = path.join(dataDir, filename);
    const content = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(content);
  } catch (error) {
    console.error(`Error loading ${filename}:`, error.message);
    return [];
  }
}

/**
 * Format courses for the prompt
 */
function formatCourses(courses) {
  const groups = {
    theoretical: 'Theoretical Courses',
    practical: 'Practical Driving Courses (LTO-required PDC)',
    'driving-lessons': 'Driving Lesson Packages',
    other: 'Other Services',
  };

  let text = '';

  for (const [groupId, groupName] of Object.entries(groups)) {
    const groupCourses = courses.filter(c => c.group === groupId);
    if (groupCourses.length === 0) continue;

    text += `\n${groupName}:\n`;
    for (const course of groupCourses) {
      const title = course.title || course.vehicle || 'Unknown';
      const price = course.price ? `PHP ${course.price.toLocaleString()}` : 'Contact for pricing';
      const hours = course.hours ? ` (${course.hours} hours)` : '';
      text += `- ${title}${hours}: ${price}\n`;
      if (course.note) {
        text += `  Note: ${course.note}\n`;
      }
    }
  }

  return text;
}

/**
 * Format branches for the prompt
 */
function formatBranches(branches) {
  let text = '\nBranch Locations:\n';

  for (const branch of branches) {
    text += `\n${branch.name}:\n`;
    text += `- Address: ${branch.address}\n`;
    text += `- Phone: ${branch.phones.join(' / ')}\n`;
  }

  return text;
}

/**
 * Format FAQ for the prompt
 */
function formatFaq(faq) {
  let text = '\nFrequently Asked Questions:\n';

  for (const item of faq) {
    text += `\nQ: ${item.question}\n`;
    text += `A: ${item.answer}\n`;
  }

  return text;
}

/**
 * Build the complete knowledge base
 */
export function buildKnowledge() {
  if (cachedKnowledge) {
    return cachedKnowledge;
  }

  const courses = loadJsonFile('courses.json');
  const branches = loadJsonFile('branches.json');
  const faq = loadJsonFile('faq.json');

  cachedKnowledge = {
    courses: formatCourses(courses),
    branches: formatBranches(branches),
    faq: formatFaq(faq),
    raw: { courses, branches, faq },
  };

  return cachedKnowledge;
}

/**
 * Generate the system prompt for the chatbot
 */
export function generateSystemPrompt(language = 'en') {
  const knowledge = buildKnowledge();

  return `You are DriveBot, a friendly and helpful assistant for Western Visayas Driving Institute (WVDI).

IMPORTANT INSTRUCTIONS:
- Always be polite, professional, and helpful
- Respond in the user's language (currently: ${language})
- Provide accurate information based on the knowledge below
- If you don't know something, suggest contacting WVDI directly
- When users provide contact info (name, phone, email), acknowledge receipt
- Encourage inquiries about courses and help users choose the right package
- Mention our "2 Hours Free" promo when discussing driving lesson packages

ABOUT WVDI:
- LTO accredited driving school since 2009
- First to offer FREE class lectures: Defensive Driving, Preventive Maintenance, and Hands-On Car Maintenance
- Office hours: 8 AM - 7 PM, Monday to Sunday
- Email: info@wvdi-ph.com
- Special promo: 2 Hours Free with driving lesson packages!

${knowledge.branches}

${knowledge.courses}

${knowledge.faq}

LEAD COLLECTION:
- If users ask about enrolling, booking, or pricing, offer to help them get started
- Politely ask for their name and preferred contact method (phone or email)
- Ask what course or service they're interested in
- Let them know someone will contact them to confirm their booking

Remember: Be concise but informative. Keep responses under 200 words unless detailed information is requested.`;
}
