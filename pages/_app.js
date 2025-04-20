import { useEffect, useState } from 'react';
import '../app/globals.css';

// Custom App component that handles client-side only rendering
export default function App({ Component, pageProps }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // This runs only on the client after hydration
    setIsClient(true);
  }, []);

  // During SSR or static generation, show the empty page
  if (!isClient) {
    return <div>Loading application...</div>;
  }

  // On the client, render the actual component
  return <Component {...pageProps} />;
} 