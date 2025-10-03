// Proxy route for Perplexity API
const express = require('express');
const router = express.Router();
// const fetch = require('node-fetch');

// API key loaded from environment variables
const PERPLEXITY_API_KEY = process.env.PERPLEXITY_API_KEY;

if (!PERPLEXITY_API_KEY) {
  console.error('❌ PERPLEXITY_API_KEY is not set in environment variables');
  process.exit(1);
}
const PERPLEXITY_API_URL = "https://api.perplexity.ai/chat/completions";

// Domain filtering function
function isRealEstateQuery(prompt, filters = {}) {
  const strongRealEstateKeywords = [
    'rent', 'yield', 'sqft', 'sq ft', 'square feet', 'price', 'appreciation', 
    'real estate', 'property', 'apartment', 'villa', 'office', 'commercial', 
    'residential', 'investment', 'roi', 'return', 'capital', 'rental', 
    'occupancy', 'possession', 'bhk', 'bedroom', 'floor', 'area', 'location',
    'market', 'trends', 'growth', 'cagr', 'pune', 'mumbai', 'bangalore', 
    'delhi', 'hyderabad', 'chennai', 'kolkata', 'gurgaon', 'noida',
    'baner', 'aundh', 'kharadi', 'hinjewadi', 'whitefield', 'koramangala',
    'buy', 'sell', 'purchase', 'lease', 'tenancy', 'landlord', 'tenant',
    'plot', 'land', 'construction', 'developer', 'builder', 'society',
    'retail', 'warehouse', 'industrial', 'logistics', 'office space', 'shopping',
    'mall', 'showroom', 'godown', 'factory', 'manufacturing', 'storage',
    'hospitality', 'hotel', 'restaurant', 'entertainment', 'recreation',
    'mixed use', 'it park', 'business park', 'tech park', 'sez', 'special economic zone'
  ];
  
  const weakRealEstateKeywords = [
    'available', 'availability', 'inventory', 'supply', 'demand', 'count',
    'how many', 'number of', 'total', 'listings', 'projects', 'units',
    'show me', 'tell me about', 'what is', 'explain'
  ];
  
  const lowerPrompt = prompt.toLowerCase();
  
  // Check if prompt contains strong real estate keywords
  const hasStrongRealEstateKeywords = strongRealEstateKeywords.some(keyword => lowerPrompt.includes(keyword));
  
  // Check if prompt contains weak real estate keywords
  const hasWeakRealEstateKeywords = weakRealEstateKeywords.some(keyword => lowerPrompt.includes(keyword));
  
  // Check if filters indicate real estate context
  const hasRealEstateFilters = (
    (filters.cities && filters.cities.length > 0) ||
    (filters.localities && filters.localities.length > 0) ||
    (filters.propertyTypes && filters.propertyTypes.length > 0) ||
    (filters.segments && filters.segments.length > 0) ||
    (filters.budgets && filters.budgets.length > 0)
  );
  
  // Consider it a real estate query if:
  // 1. Has strong real estate keywords, OR
  // 2. Has filters AND weak real estate keywords, OR
  // 3. Has filters (even without keywords)
  return hasStrongRealEstateKeywords || (hasRealEstateFilters && hasWeakRealEstateKeywords) || hasRealEstateFilters;
}

// Check if it's a basic greeting
function isBasicGreeting(prompt) {
  const greetingKeywords = [
    'hello', 'hi', 'hey', 'good morning', 'good afternoon', 'good evening',
    'how are you', 'how do you do', 'nice to meet you', 'greetings',
    'what can you do', 'what do you do', 'who are you', 'introduce yourself'
  ];
  
  const lowerPrompt = prompt.toLowerCase().trim();
  
  // Only consider it a greeting if it's a direct greeting, not a question about something
  const isDirectGreeting = greetingKeywords.some(keyword => {
    if (keyword === 'hello' || keyword === 'hi' || keyword === 'hey') {
      return lowerPrompt === keyword || lowerPrompt.startsWith(keyword + ' ') || lowerPrompt.startsWith(keyword + '!');
    }
    return lowerPrompt.includes(keyword);
  });
  
  return isDirectGreeting;
}

// Formatting function for real estate responses
function formatRealEstateResponse(response) {
  if (!response) return '';
  
  // Clean up the response first
  let formatted = response
    // Remove any malformed bullet points or empty lines
    .replace(/^\s*[•-]\s*[-•]*\s*$/gm, '') // Remove lines with only bullets/dashes
    .replace(/^\s*[•-]\s*--\s*$/gm, '') // Remove lines with bullet followed by dashes
    .replace(/\n\s*\n\s*\n/g, '\n\n') // Remove excessive line breaks
    .trim();
  
  // Add bold formatting for key terms
  formatted = formatted
    .replace(/\b(Rental Yield|Capital Appreciation|Price per sqft|Rent per sqft|ROI|CAGR|Occupancy|Average|Growth|Market|Investment|Supply|Demand|Availability)\b/g, '**$1**')
    .replace(/\b(₹[0-9,]+)\b/g, '**$1**')
    .replace(/\b([0-9]+%)\b/g, '**$1**')
    .replace(/\b([0-9]+\.[0-9]+%)\b/g, '**$1**')
    .replace(/\b([0-9,]+ sqft)\b/g, '**$1**')
    .replace(/\b([0-9,]+ – [0-9,]+ sqft)\b/g, '**$1**');
  
  // Improve bullet point formatting
  formatted = formatted
    .replace(/^\s*[•-]\s*/gm, '• ') // Standardize bullet points
    .replace(/^\s*(\d+\.)\s*/gm, '$1 ') // Standardize numbered lists
    .replace(/([.!?])\s+(?=[A-Z])/g, '$1\n\n') // Add line breaks after sentences
    .replace(/(:)\s*(?=[A-Z])/g, '$1\n'); // Add line breaks after colons
  
  // Clean up any remaining formatting issues
  formatted = formatted
    .replace(/\n\s*\n\s*\n/g, '\n\n') // Remove excessive line breaks
    .replace(/^\s+|\s+$/gm, '') // Trim whitespace from each line
    .replace(/\n{3,}/g, '\n\n'); // Limit consecutive line breaks to 2
  
  return formatted;
}

router.post('/chat', async (req, res) => {
  try {
    console.log('--- /api/perplexity/chat called ---');
    console.log('Request body:', JSON.stringify(req.body, null, 2));
    
    const userPrompt = req.body.prompt || '';
    const filters = req.body.filters || {};
    
    // Domain filtering - check if query is real estate related first
    if (!isRealEstateQuery(userPrompt, filters)) {
      // Check if it's a basic greeting
      if (isBasicGreeting(userPrompt)) {
        const greetingResponse = {
          choices: [{
            message: {
              content: "Hello! I'm **BhuvisAI**, your dedicated **real estate consultant**. I specialize in helping you with:\n\n• **Price per sqft** analysis across Indian cities\n• **Rental yield** calculations and comparisons\n• **Capital appreciation** trends and projections\n• **Investment recommendations** for residential and commercial properties\n• **Market insights** for micro-markets and localities\n\nI can assist you with queries about Mumbai, Delhi, Bangalore, Pune, Hyderabad, Chennai, and other major Indian cities. What real estate information would you like to explore today?"
            }
          }]
        };
        return res.json(greetingResponse);
      }
      
      // Not a real estate query and not a greeting
      const outOfDomainResponse = {
        choices: [{
          message: {
            content: "❌ Sorry, I can only answer questions related to real estate such as **price per sqft**, **rent**, **rental yield**, and **capital appreciation**."
          }
        }]
      };
      return res.json(outOfDomainResponse);
    }
    
    // Enhanced system prompt for real estate expertise
    const systemPrompt =
      "You are BhuvisAI, a specialized real estate consultant for Indian property markets. " +
      "CRITICAL: You MUST ONLY provide real estate information. Do NOT give general knowledge, weather, news, or any non-real estate information. " +
      "\n" +
      "ONLY answer questions about: " +
      "• **Price per sqft** for specific Indian locations and property types (residential, commercial, office, retail, industrial) " +
      "• **Rent per sqft** and rental market data for all property types " +
      "• **Rental yield** calculations and comparisons across all real estate segments " +
      "• **Capital appreciation** trends and projections for all property types " +
      "• Property investment analysis and recommendations for residential and commercial properties " +
      "• Market trends for Indian cities and micro-markets across all real estate segments " +
      "• Commercial real estate trends, office space demand, retail market analysis " +
      "• Industrial real estate, warehousing, and logistics property insights " +
      "• Real estate market analysis, supply-demand dynamics, and investment opportunities " +
      "\n" +
      "STRICT RULES: " +
      "• If asked about anything non-real estate, respond: '❌ Sorry, I can only answer questions related to real estate such as **price per sqft**, **rent**, **rental yield**, and **capital appreciation**.' " +
      "• Always provide specific data with figures, percentages, and trends " +
      "• Use **bold** formatting for key metrics and numbers " +
      "• Structure responses with clear sections and bullet points " +
      "• Focus on Indian cities: Mumbai, Delhi, Bangalore, Pune, Hyderabad, Chennai, Kolkata " +
      "• Include micro-market analysis (e.g., Baner, Aundh, Whitefield, etc.) " +
      "• Cover both residential and commercial real estate markets " +
      "• Provide actionable real estate insights only";

    // Compose context from filters
    let context = '';
    let hasFilters = false;
    
    if (filters.cities && filters.cities.length > 0) {
      context += `Cities: ${filters.cities.join(', ')}\n`;
      hasFilters = true;
    }
    if (filters.localities && filters.localities.length > 0) {
      context += `Localities: ${filters.localities.join(', ')}\n`;
      hasFilters = true;
    }
    if (filters.propertyTypes && filters.propertyTypes.length > 0) {
      context += `Property Types: ${filters.propertyTypes.join(', ')}\n`;
      hasFilters = true;
    }
    if (filters.segments && filters.segments.length > 0) {
      context += `Segments: ${filters.segments.join(', ')}\n`;
      hasFilters = true;
    }
    if (filters.budgets && filters.budgets.length > 0) {
      context += `Budgets: ${filters.budgets.join(', ')}\n`;
      hasFilters = true;
    }
    
    // Add explicit instruction to use filters
    if (hasFilters) {
      context += `\nIMPORTANT: The user has selected specific filters above. You MUST focus your response on these specific locations, property types, and budget ranges. Provide data and insights that are directly relevant to their selected criteria.`;
    }

    // Ensure we have a valid user prompt for the API
    const finalUserPrompt = userPrompt.trim() || 'Show me properties based on the selected filters';
    
    // Build the payload
    const payload = {
      model: 'sonar-pro',
      messages: [
        { role: 'system', content: systemPrompt + (context ? `\n\nContext:\n${context}` : '') },
        { role: 'user', content: finalUserPrompt }
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
    
    // Format the response if it's a real estate query
    if (data.choices && data.choices[0] && data.choices[0].message) {
      data.choices[0].message.content = formatRealEstateResponse(data.choices[0].message.content);
    }
    
    res.status(apiRes.status).json(data);
  } catch (err) {
    console.error('Proxy error:', err);
    res.status(500).json({ error: 'Proxy error', details: err.message });
  }
});

module.exports = router;
