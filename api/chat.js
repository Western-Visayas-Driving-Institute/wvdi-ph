/**
 * Chat API - Main endpoint for DriveBot
 * Uses configurable AI provider and extracts lead information
 */

import { getProvider } from './providers/index.js';
import { generateSystemPrompt } from './lib/knowledge.js';
import { extractLeadInfo, mergeLeadInfo, hasLeadData, formatLeadForStorage } from './lib/extract.js';

// In-memory session storage (for lead accumulation)
// In production, use Redis or similar
const sessions = new Map();

// Session cleanup interval (30 minutes)
const SESSION_TIMEOUT = 30 * 60 * 1000;

/**
 * Get or create a session
 */
function getSession(sessionId) {
  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  if (!sessions.has(sessionId)) {
    sessions.set(sessionId, {
      lead: { phones: [], emails: [], name: null, services: [] },
      messages: [],
      createdAt: Date.now(),
    });
  }

  return { sessionId, session: sessions.get(sessionId) };
}

/**
 * Cleanup old sessions
 */
function cleanupSessions() {
  const now = Date.now();
  for (const [id, session] of sessions.entries()) {
    if (now - session.createdAt > SESSION_TIMEOUT) {
      sessions.delete(id);
    }
  }
}

// Run cleanup every 10 minutes
setInterval(cleanupSessions, 10 * 60 * 1000);

/**
 * API Handler
 */
export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
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
    const { messages, language = 'en', sessionId: inputSessionId } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Messages array is required' });
    }

    // Get or create session
    const { sessionId, session } = getSession(inputSessionId);

    // Get the last user message for lead extraction
    const lastUserMessage = [...messages].reverse().find(m => m.role === 'user');

    if (lastUserMessage) {
      // Extract lead info from the message
      const newLeadInfo = extractLeadInfo(lastUserMessage.content);

      // Merge with existing lead data
      session.lead = mergeLeadInfo(session.lead, newLeadInfo);
    }

    // Generate system prompt with knowledge base
    const systemPrompt = generateSystemPrompt(language);

    // Get AI provider and generate response
    const provider = getProvider();

    const response = await provider.chat({
      systemPrompt,
      messages,
      temperature: 0.7,
      maxTokens: 500,
    });

    // Store messages in session for context
    session.messages = messages.slice(-10); // Keep last 10 messages

    // Return response with session info and lead data
    return res.status(200).json({
      response: response,
      sessionId: sessionId,
      leadCaptured: hasLeadData(session.lead),
      lead: session.lead, // Return accumulated lead data
    });

  } catch (error) {
    console.error('Chat API error:', error);

    // Provide helpful error for provider issues
    if (error.message.includes('Ollama')) {
      return res.status(503).json({
        error: 'AI service temporarily unavailable',
        details: 'The AI backend is not responding. Please try again later.',
      });
    }

    return res.status(500).json({
      error: 'An error occurred while processing your request',
      details: error.message,
    });
  }
}

/**
 * Export function to get session lead data (for leads.js)
 */
export function getSessionLead(sessionId) {
  const session = sessions.get(sessionId);
  if (!session) return null;

  const conversationSummary = session.messages
    .map(m => `${m.role}: ${m.content.substring(0, 100)}`)
    .join('\n');

  return formatLeadForStorage(session.lead, conversationSummary);
}
