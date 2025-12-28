/**
 * AI Provider Factory
 * Supports: ollama, gemini, openai
 * Selection based on AI_PROVIDER environment variable
 */

import { createOllamaProvider } from './ollama.js';
import { createGeminiProvider } from './gemini.js';

// Provider registry
const providers = {
  ollama: createOllamaProvider,
  gemini: createGeminiProvider,
  // Future providers:
  // openai: createOpenAIProvider,
};

/**
 * Get the configured AI provider
 * @returns {Object} Provider with chat() and healthCheck() methods
 */
export function getProvider() {
  const providerName = process.env.AI_PROVIDER || 'ollama';

  const createProvider = providers[providerName];

  if (!createProvider) {
    throw new Error(`Unknown AI provider: ${providerName}. Available: ${Object.keys(providers).join(', ')}`);
  }

  return createProvider();
}

/**
 * Check if AI backend is available
 * @returns {Promise<{available: boolean, provider: string, error?: string}>}
 */
export async function checkHealth() {
  try {
    const provider = getProvider();
    const result = await provider.healthCheck();
    return {
      available: result.available,
      provider: process.env.AI_PROVIDER || 'ollama',
      model: result.model || null,
    };
  } catch (error) {
    return {
      available: false,
      provider: process.env.AI_PROVIDER || 'ollama',
      error: error.message,
    };
  }
}
