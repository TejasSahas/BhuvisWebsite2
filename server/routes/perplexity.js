// Proxy route for Perplexity API
const express = require('express');
const router = express.Router();
// const fetch = require('node-fetch');

// IMPORTANT: Store your API key securely, e.g., in environment variables
const PERPLEXITY_API_KEY = process.env.PERPLEXITY_API_KEY || "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";
const PERPLEXITY_API_URL = "https://api.perplexity.ai/chat/completions";

router.post('/chat', async (req, res) => {
  try {
    console.log('--- /api/perplexity/chat called ---');
    console.log('Request body:', JSON.stringify(req.body, null, 2));
    // Compose system prompt as in the working Python example
    const userPrompt = req.body.prompt;
    const filters = req.body.filters || {};
    const systemPrompt =
      "You are an intelligent real estate consultant for Indian cities. " +
      "You answer only real estate related questions. " +
      "You know the capital growth rates of commercial and residential real estate in specific micro-markets in Indian cities. " +
      "You know average price/sqft, average rent/sqft, occupancy estimates, and provide these figures confidently. " +
      "You give proper recommendations and investment advice for specific regions and real estate types, with clear reasoning. " +
      "Always use data from authorized sources and minimize token usage. " +
      "If a question is not real estate related, politely refuse to answer.";

    // Compose context from filters
    let context = '';
    if (filters.city) context += `City: ${filters.city}\n`;
    if (filters.microMarket) context += `Micro Market: ${filters.microMarket}\n`;
    if (filters.propertyType) context += `Property Type: ${filters.propertyType}\n`;
    if (filters.bhk) context += `BHK: ${filters.bhk}\n`;
    if (filters.commercialType) context += `Commercial Type: ${filters.commercialType}\n`;

    // Build the payload as in the Python code
    const payload = {
      model: 'sonar-pro',
      messages: [
        { role: 'system', content: systemPrompt + (context ? `\nContext:\n${context}` : '') },
        { role: 'user', content: userPrompt }
      ]
    };
    console.log('Payload to Perplexity:', JSON.stringify(payload, null, 2));

    const apiRes = await fetch(PERPLEXITY_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${PERPLEXITY_API_KEY}`
      },
      body: JSON.stringify(payload)
    });
    const data = await apiRes.json();
    console.log('Perplexity API response:', JSON.stringify(data, null, 2));
    res.status(apiRes.status).json(data);
  } catch (err) {
    console.error('Proxy error:', err);
    res.status(500).json({ error: 'Proxy error', details: err.message });
  }
});

module.exports = router;
