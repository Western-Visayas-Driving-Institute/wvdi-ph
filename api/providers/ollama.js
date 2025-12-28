/**
 * Ollama AI Provider
 * Uses OpenAI-compatible API format
 */

const OLLAMA_API_URL = process.env.OLLAMA_API_URL || 'http://localhost:11434';
const OLLAMA_MODEL = process.env.OLLAMA_MODEL || 'llama3.2';

/**
 * Create Ollama provider instance
 */
export function createOllamaProvider() {
  return {
    name: 'ollama',
    model: OLLAMA_MODEL,

    /**
     * Send chat completion request to Ollama
     * @param {Object} params - Chat parameters
     * @param {string} params.systemPrompt - System instructions
     * @param {Array} params.messages - Message history
     * @param {number} params.temperature - Response creativity (0-1)
     * @param {number} params.maxTokens - Maximum response length
     * @returns {Promise<string>} AI response text
     */
    async chat({ systemPrompt, messages, temperature = 0.7, maxTokens = 500 }) {
      const formattedMessages = [
        { role: 'system', content: systemPrompt },
        ...messages,
      ];

      const response = await fetch(`${OLLAMA_API_URL}/v1/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: OLLAMA_MODEL,
          messages: formattedMessages,
          temperature,
          max_tokens: maxTokens,
          stream: false,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Ollama API error (${response.status}): ${errorText}`);
      }

      const data = await response.json();

      if (!data.choices || !data.choices[0]?.message?.content) {
        throw new Error('Invalid response format from Ollama');
      }

      return data.choices[0].message.content.trim();
    },

    /**
     * Check if Ollama is available and the model is loaded
     * @returns {Promise<{available: boolean, model?: string}>}
     */
    async healthCheck() {
      try {
        // Check if Ollama server is running
        const response = await fetch(`${OLLAMA_API_URL}/api/tags`, {
          method: 'GET',
          signal: AbortSignal.timeout(5000), // 5 second timeout
        });

        if (!response.ok) {
          return { available: false };
        }

        const data = await response.json();
        const models = data.models || [];

        // Check if our model is available
        const modelAvailable = models.some(m =>
          m.name === OLLAMA_MODEL || m.name.startsWith(`${OLLAMA_MODEL}:`)
        );

        return {
          available: modelAvailable,
          model: OLLAMA_MODEL,
          availableModels: models.map(m => m.name),
        };
      } catch (error) {
        return {
          available: false,
          error: error.message,
        };
      }
    },
  };
}
