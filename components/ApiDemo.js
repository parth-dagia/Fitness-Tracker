import { useState, useEffect } from 'react';

export function ApiDemo() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function fetchData() {
    setLoading(true);
    setError(null);
    
    try {
      // Notice that we don't need to include the API key here
      // The API key is only used server-side in the API route
      const response = await fetch('/api/data');
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.error || 'Failed to fetch data');
      }
      
      setData(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-4 border rounded-lg">
      <h2 className="text-xl font-bold mb-4">API Demo</h2>
      
      <button 
        onClick={fetchData}
        className="bg-primary-500 text-white py-2 px-4 rounded hover:bg-primary-600 transition-colors"
        disabled={loading}
      >
        {loading ? 'Loading...' : 'Fetch Data'}
      </button>
      
      {error && (
        <div className="mt-4 p-3 bg-red-100 text-red-700 rounded">
          Error: {error}
        </div>
      )}
      
      {data && (
        <div className="mt-4">
          <h3 className="font-bold">Response:</h3>
          <pre className="bg-gray-100 p-3 rounded mt-2 overflow-auto">
            {JSON.stringify(data, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
} 