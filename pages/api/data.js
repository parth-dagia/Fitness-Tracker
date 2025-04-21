// This is a sample API endpoint that demonstrates securely accessing API keys
export default async function handler(req, res) {
  // Access the API key from environment variables
  const apiKey = process.env.MY_API_KEY;
  
  // Check if the API key exists
  if (!apiKey) {
    return res.status(500).json({ error: 'API key not configured' });
  }
  
  try {
    // This is where you would use the API key to make requests to external services
    // For demonstration, we're just returning a success message
    
    // Example of how you would use the API key in a real request:
    // const response = await fetch('https://api.example.com/data', {
    //   headers: {
    //     'Authorization': `Bearer ${apiKey}`,
    //   },
    // });
    // const data = await response.json();
    
    // Return a response
    return res.status(200).json({ 
      message: 'API call successful',
      // Include additional data from your actual API call here
    });
  } catch (error) {
    console.error('API call failed:', error);
    return res.status(500).json({ error: 'Failed to fetch data from API' });
  }
} 