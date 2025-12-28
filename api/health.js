/**
 * Health Check API
 * Checks if the AI backend is available
 */

import { checkHealth } from './providers/index.js';

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const health = await checkHealth();

    return res.status(200).json({
      status: health.available ? 'ok' : 'unavailable',
      provider: health.provider,
      model: health.model || null,
      timestamp: new Date().toISOString(),
    });

  } catch (error) {
    console.error('Health check error:', error);

    return res.status(200).json({
      status: 'unavailable',
      error: error.message,
      timestamp: new Date().toISOString(),
    });
  }
}
