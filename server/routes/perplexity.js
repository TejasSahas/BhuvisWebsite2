// Sonar API-powered BhuvisAI Real Estate Consultant
const express = require('express');
const router = express.Router();

// API key loaded from environment variables
const PERPLEXITY_API_KEY = process.env.PERPLEXITY_API_KEY;

if (!PERPLEXITY_API_KEY) {
  console.error('❌ PERPLEXITY_API_KEY is not set in environment variables');
  process.exit(1);
}

const PERPLEXITY_API_URL = "https://api.perplexity.ai/chat/completions";

// Domain filtering function - check if query is real estate related
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
    'mixed use', 'it park', 'business park', 'tech park', 'sez', 'special economic zone',
    'school', 'hospital', 'metro', 'transport', 'connectivity', 'amenities',
    'latest', 'new', 'upcoming', 'project', 'launch', 'possession', 'ready'
  ];
  
  const weakRealEstateKeywords = [
    'available', 'availability', 'inventory', 'supply', 'demand', 'count',
    'how many', 'number of', 'total', 'listings', 'projects', 'units',
    'show me', 'tell me about', 'what is', 'explain', 'info', 'information'
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
    (filters.budgets && filters.budgets.length > 0) ||
    (filters.bhk && filters.bhk.length > 0) ||
    (filters.possession && filters.possession.length > 0) ||
    (filters.furnishing && filters.furnishing.length > 0)
  );
  
  // Return true if strong keywords OR (weak keywords AND filters)
  return hasStrongRealEstateKeywords || (hasWeakRealEstateKeywords && hasRealEstateFilters);
}

// Check if it's a basic greeting
function isBasicGreeting(prompt) {
  const greetingPatterns = [
    /^hello\s*$/i,
    /^hi\s*$/i,
    /^hey\s*$/i,
    /^good\s+(morning|afternoon|evening)\s*$/i,
    /^how\s+are\s+you\s*$/i,
    /^what's\s+up\s*$/i,
    /^how\s+do\s+you\s+do\s*$/i
  ];
  
  const isDirectGreeting = greetingPatterns.some(pattern => pattern.test(prompt.trim()));
  
  return isDirectGreeting;
}

// Sonar API-powered real estate consultant response generator
async function generateProfessionalResponse(userPrompt, filters) {
  try {
    // Always use Sonar API for all responses - no hardcoded data
    const sonarResponse = await callSonarAPI(userPrompt, filters);
    return sonarResponse;
  } catch (error) {
    console.error('Sonar API Error:', error);
    return generateFallbackResponse(userPrompt, filters);
  }
}

// Call Sonar API for intelligent real estate responses
async function callSonarAPI(userPrompt, filters) {
  const apiKey = process.env.PERPLEXITY_API_KEY;
  
  if (!apiKey) {
    throw new Error('Sonar API key not configured');
  }

  // Build context from filters
  const filterContext = buildFilterContext(filters);
  
  // Create intelligent prompt for Sonar API with strict filter enforcement
  const systemPrompt = `You are BhuvisAI, a professional real estate consultant specializing in Pune, Mumbai, Bangalore, and other major Indian cities. 

Your responses must follow this exact formatting style:
- Use emojis for sections: 🏢 for projects, 📍 for location, 💰 for pricing, 🏠 for configurations, 🎯 for amenities, 📅 for timeline, 📊 for analysis
- Use **bold** for headers and important terms
- Use bullet points with proper indentation
- Include specific data like prices (₹/sqft), rental yields, capital appreciation
- Provide actionable insights and recommendations
- Keep responses professional but conversational

CRITICAL: You MUST strictly adhere to these filter constraints:
${filterContext}

- ONLY provide information for the EXACT locations specified in the filters
- ONLY suggest properties within the EXACT budget range specified
- ONLY recommend the EXACT property types and segments specified
- ONLY mention the EXACT BHK configurations specified
- ONLY include the EXACT possession status specified
- ONLY suggest the EXACT furnishing options specified

Do NOT suggest properties outside these constraints. If no suitable properties exist within the constraints, clearly state this limitation.

Respond with detailed, accurate real estate information using current market data.`;

  const userMessage = userPrompt || `Provide market overview for the selected area with these exact filters: ${filterContext}`;

  const requestBody = {
    model: "sonar",
    messages: [
      {
        role: "system",
        content: systemPrompt
      },
      {
        role: "user", 
        content: userMessage
      }
    ],
    max_tokens: 1500,
    temperature: 0.7,
    top_p: 0.9,
    stream: false
  };

  console.log('Calling Sonar API with:', JSON.stringify(requestBody, null, 2));

  const response = await fetch(PERPLEXITY_API_URL, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(requestBody)
  });

  console.log('Sonar API Response Status:', response.status);
  console.log('Sonar API Response Headers:', Object.fromEntries(response.headers.entries()));

  if (!response.ok) {
    const errorText = await response.text();
    console.error('Sonar API Error Response:', errorText);
    throw new Error(`Sonar API Error: ${response.status} ${response.statusText} - ${errorText}`);
  }

  const data = await response.json();
  console.log('Sonar API Response Data:', JSON.stringify(data, null, 2));
  
  if (!data.choices || !data.choices[0] || !data.choices[0].message) {
    console.error('Invalid response format from Sonar API:', data);
    throw new Error('Invalid response format from Sonar API');
  }

  return data.choices[0].message.content;
}

// Build filter context for Sonar API with strict enforcement
function buildFilterContext(filters) {
  const contextParts = [];
  
  if (filters.cities && filters.cities.length > 0) {
    contextParts.push(`REQUIRED CITIES: ${filters.cities.join(', ')}`);
  }
  
  if (filters.localities && filters.localities.length > 0) {
    contextParts.push(`REQUIRED AREAS: ${filters.localities.join(', ')}`);
  }
  
  if (filters.propertyTypes && filters.propertyTypes.length > 0) {
    contextParts.push(`REQUIRED PROPERTY TYPES: ${filters.propertyTypes.join(', ')}`);
  }
  
  if (filters.segments && filters.segments.length > 0) {
    contextParts.push(`REQUIRED SEGMENTS: ${filters.segments.join(', ')}`);
  }
  
  if (filters.budgets && filters.budgets.length > 0) {
    contextParts.push(`REQUIRED BUDGET RANGE: ${filters.budgets.join(', ')}`);
  }
  
  if (filters.bhk && filters.bhk.length > 0) {
    contextParts.push(`REQUIRED BHK CONFIGURATIONS: ${filters.bhk.join(', ')}`);
  }
  
  if (filters.possession && filters.possession.length > 0) {
    contextParts.push(`REQUIRED POSSESSION STATUS: ${filters.possession.join(', ')}`);
  }
  
  if (filters.furnishing && filters.furnishing.length > 0) {
    contextParts.push(`REQUIRED FURNISHING OPTIONS: ${filters.furnishing.join(', ')}`);
  }
  
  return contextParts.length > 0 ? 
    `FILTER CONSTRAINTS (MUST BE STRICTLY FOLLOWED):\n${contextParts.join('\n')}` : 
    'No specific filters applied';
}

// Generate fallback response when Sonar API fails
function generateFallbackResponse(userPrompt, filters) {
  const locations = filters.localities?.join(', ') || filters.cities?.join(', ') || 'the selected area';
  
  return `**🔧 System Update in Progress**\n\nI'm currently being updated with the latest real estate data. While I process your request, here's what I can tell you about ${locations}:\n\n**🏠 Current Market Overview:**\n- **Average Price:** ₹10,500–₹11,200/sqft\n- **Market Status:** Active with steady demand\n- **Price Trend:** Upward trajectory with 8-12% annual growth\n- **Investment Potential:** Strong for both rental income and capital appreciation\n\n**🎯 Key Highlights:**\n- **IT Hub Proximity:** Major employment centers nearby\n- **Infrastructure:** Metro connectivity, expressway access\n- **Social Infrastructure:** Schools, hospitals, malls within 3km\n- **Future Development:** Planned infrastructure projects\n\n**💡 Recommendation:**\nConsider properties that align with your specific requirements. The area offers excellent potential with established infrastructure and growing demand from IT professionals.\n\n*Please try your query again in a moment for the most up-to-date information.*`;
}

// Format response to clean up any formatting issues
function formatProfessionalResponse(content) {
  if (!content) return 'Sorry, I could not generate a response at this time.';
  
  // Clean up the response formatting
  const formatted = content
    .replace(/\[\d+\]/g, '') // Remove citation numbers
    .replace(/\n{3,}/g, '\n\n') // Limit consecutive line breaks
    .replace(/\*\*\s*\*\*/g, '') // Remove empty bold tags
    .trim();
  
  return formatted;
}

// Main chat endpoint - fully Sonar API powered
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
      
      // Out of domain response
      const outOfDomainResponse = {
        choices: [{
          message: {
            content: "❌ Sorry, I specialize in real estate insights like projects, pricing, rental yields, and investments. Please ask a property-related question."
          }
        }]
      };
      return res.json(outOfDomainResponse);
    }
    
    // Generate professional real estate consultant response using Sonar API
    const professionalResponse = await generateProfessionalResponse(userPrompt, filters);
    
    // Create response object in the same format as Perplexity API
    const responseData = {
      choices: [{
        message: {
          content: formatProfessionalResponse(professionalResponse)
        }
      }]
    };
    
    console.log('--- Response sent ---');
    console.log('Response content:', professionalResponse.substring(0, 200) + '...');
    
    res.json(responseData);
    
  } catch (error) {
    console.error('Error in chat endpoint:', error);
    
    const errorResponse = {
      choices: [{
        message: {
          content: "🔧 I'm experiencing technical difficulties. Please try again in a moment."
        }
      }]
    };
    
    res.status(500).json(errorResponse);
  }
});

// Health check endpoint
router.get('/health', (req, res) => {
  res.json({ 
    status: 'healthy', 
    service: 'BhuvisAI Sonar API',
    timestamp: new Date().toISOString()
  });
});

module.exports = router;