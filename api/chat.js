import { OpenAI } from 'openai';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Handle preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { messages, model = 'gpt-4-turbo', language = 'en' } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Messages array is required' });
    }

    // Add system message for context about WVDI
    const systemMessage = {
      role: 'system',
      content: `You are DriveBot, a helpful assistant for Western Visayas Driving Institute (WVDI).
      
Respond in the user's language, which is currently: ${language}.

Here is information about WVDI:
- WVDI is an LTO accredited driving school
- Branches: Bacolod, Himamaylan, and Dumaguete
- Office hours: 8 AM - 7 PM (Monday to Sunday)
- Services: Driving courses, theoretical lectures, site lectures, hands-on car maintenance
- Phone numbers:
  * BACOLOD: 09178100009 / 0917 825 4580 / 0917 594 7890 / 0908 873 3598 / 0908705 4162
  * HIMAMAYLAN: 09171587908 / 09190938891
  * DUMAGUETE: 09690505125 / 09178619706
- Email: info@wvdi-ph.com

Be friendly, helpful, and concise in your answers. If you don't know the answer to a question, suggest that the user contact WVDI directly through phone or email.`
    };

    // Make request to OpenAI API
    const completion = await openai.chat.completions.create({
      model: model,
      messages: [systemMessage, ...messages],
      temperature: 0.7,
      max_tokens: 500,
    });

    // Return the response to the client
    return res.status(200).json({ 
      response: completion.choices[0].message.content.trim() 
    });

  } catch (error) {
    console.error('OpenAI API error:', error);
    return res.status(500).json({ 
      error: 'An error occurred while processing your request',
      details: error.message
    });
  }
}
