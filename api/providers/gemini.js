/**
 * Google Gemini AI Provider
 * Uses Gemini 3 Flash API
 */

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_MODEL = process.env.GEMINI_MODEL || 'gemini-3-flash';
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta';

/**
 * Create Gemini provider instance
 */
export function createGeminiProvider() {
  return {
    name: 'gemini',
    model: GEMINI_MODEL,

    /**
     * Send chat completion request to Gemini
     * @param {Object} params - Chat parameters
     * @param {string} params.systemPrompt - System instructions
     * @param {Array} params.messages - Message history
     * @param {number} params.temperature - Response creativity (0-1)
     * @param {number} params.maxTokens - Maximum response length
     * @param {boolean} params.jsonMode - Enable JSON output mode
     * @returns {Promise<string>} AI response text
     */
    async chat({ systemPrompt, messages, temperature = 0.7, maxTokens = 800, jsonMode = false }) {
      if (!GEMINI_API_KEY) {
        throw new Error('GEMINI_API_KEY is not configured');
      }

      // Convert messages to Gemini format
      const contents = messages.map(msg => ({
        role: msg.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: msg.content }],
      }));

      const requestBody = {
        contents,
        systemInstruction: {
          parts: [{ text: systemPrompt }],
        },
        generationConfig: {
          temperature,
          maxOutputTokens: maxTokens,
          topP: 0.95,
        },
      };

      // Enable JSON mode if requested
      if (jsonMode) {
        requestBody.generationConfig.responseMimeType = 'application/json';
      }

      const url = `${GEMINI_API_URL}/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`;

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Gemini API error (${response.status}): ${errorText}`);
      }

      const data = await response.json();

      if (!data.candidates || !data.candidates[0]?.content?.parts?.[0]?.text) {
        throw new Error('Invalid response format from Gemini');
      }

      return data.candidates[0].content.parts[0].text.trim();
    },

    /**
     * Check if Gemini API is available
     * @returns {Promise<{available: boolean, model?: string}>}
     */
    async healthCheck() {
      if (!GEMINI_API_KEY) {
        return {
          available: false,
          error: 'GEMINI_API_KEY not configured',
        };
      }

      try {
        // List models to verify API key works
        const url = `${GEMINI_API_URL}/models?key=${GEMINI_API_KEY}`;
        const response = await fetch(url, {
          method: 'GET',
          signal: AbortSignal.timeout(5000),
        });

        if (!response.ok) {
          return { available: false };
        }

        const data = await response.json();
        const models = data.models || [];

        // Check if our model is available
        const modelAvailable = models.some(m =>
          m.name === `models/${GEMINI_MODEL}` || m.name.includes(GEMINI_MODEL)
        );

        return {
          available: modelAvailable || models.length > 0,
          model: GEMINI_MODEL,
          availableModels: models.map(m => m.name.replace('models/', '')),
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
