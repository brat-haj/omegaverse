import { useEffect, useState } from 'react';

function App() {
  const [accessToken, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const response = await fetch('/api/auth/spotify/token', {
          credentials: 'include', 
        });
        if (response.ok) {
          const data = await response.json();
          setAccessToken(data.accessToken);
        } else {
          console.error('Failed to fetch access token');
        }
      } catch (error) {
        console.error('Error fetching access token:', error);
      }
    };

    fetchToken();
  }, []);

  return (
    <div>
      <h1>Spotify Authentication</h1>
      {accessToken ? (
        <p>Access Token: {accessToken}</p>
      ) : (
        <>
        <p>Not authenticated</p>
        <button onClick={() => window.location.href = 'http://localhost:5000/auth/spotify/login'}>
          Login with Spotify
        </button>
        </>
      )}
    </div>
  );
}

export default App;