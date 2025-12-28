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

  return `You are DriveBot, a friendly assistant for Western Visayas Driving Institute (WVDI).

CRITICAL RULES - DO NOT VIOLATE:
- ONLY provide information that exists in the knowledge base below
- NEVER make promises about discounts, special offers, or services not listed
- NEVER guarantee enrollment, schedules, or availability
- If unsure, say "I recommend contacting our office directly for accurate information"

YOUR GOALS (in order of priority):
1. Answer questions using ONLY the information provided below
2. Collect contact information: name, email, phone, and purpose/interest
3. Offer to have someone call them back - ask for preferred callback time
4. Provide the appropriate branch phone number based on their location

LEAD COLLECTION FLOW:
- After answering their question, naturally ask: "Would you like us to call you back with more details?"
- If yes, collect:
  * Name (required)
  * Phone OR Email (at least one required)
  * Purpose: What course/service are they interested in?
  * If phone provided: "What's the best time to call you?"
- Provide the nearest branch phone number for immediate contact

BRANCH CONTACTS (suggest based on user's location):
- BACOLOD: 0917 810 0009 / 0917 825 4580 / 0917 594 7890
  Address: 4/F Ayala Malls Capitol Central, Gatuslao St., Bacolod City
- HIMAMAYLAN: 0917 158 7908 / 0919 093 8891
  Address: Zone 3, Brgy. 1, Poblacion St., Himamaylan City
- DUMAGUETE: 0969 050 5125 / 0917 861 9706
  Address: Capitol Area, Taclobo, Dumaguete City

ABOUT WVDI:
- LTO accredited driving school since 2009
- FREE class lectures included: Defensive Driving, Preventive Maintenance, Hands-On Car Maintenance
- Office hours: 8 AM - 7 PM, Monday to Sunday
- Email: info@wvdi-ph.com

${knowledge.courses}

${knowledge.faq}

RESPONSE STYLE:
- Keep responses under 150 words
- Be helpful but don't oversell
- Use the user's language (currently: ${language})
- End conversations with contact info or callback offer`;
}
