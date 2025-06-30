'use client';

import { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';

// A simple function to check the API health without fetching large data.
const checkApiStatus = async (): Promise<boolean> => {
  try {
    // We use the categories endpoint as it's typically lightweight.
    const response = await fetch('http://127.0.0.1:8000/api/catalog/categories/', {
        cache: 'no-store',
        signal: AbortSignal.timeout(3000) // Abort after 3 seconds to avoid long waits
    });
    return response.ok;
  } catch (error) {
    // This will catch network errors (e.g., ECONNREFUSED)
    return false;
  }
};

export default function ApiStatusIndicator() {
  const [isApiConnected, setIsApiConnected] = useState<boolean | null>(null);

  useEffect(() => {
    // Only run this component in the development environment
    if (process.env.NODE_ENV !== 'development') {
      return;
    }

    const verifyConnection = async () => {
      const status = await checkApiStatus();
      setIsApiConnected(status);
    };

    // Check connection on component mount
    verifyConnection();
    
    // And check periodically
    const interval = setInterval(verifyConnection, 30000); // Check every 30 seconds

    return () => clearInterval(interval);
  }, []);

  // Don't render anything in production or before the first check is complete
  if (process.env.NODE_ENV !== 'development' || isApiConnected === null) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isApiConnected ? (
        <Badge variant="default" className="bg-green-600 hover:bg-green-700 text-white shadow-lg">
          <span className="relative flex h-2 w-2 mr-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
          </span>
          API: متصل
        </Badge>
      ) : (
        <Badge variant="destructive" className="shadow-lg">
          <span className="relative flex h-2 w-2 mr-2">
            <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
          </span>
          API: قطع است
        </Badge>
      )}
    </div>
  );
}
