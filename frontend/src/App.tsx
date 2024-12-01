import { useEffect, useState } from "react";

function App() {
  const [accessToken, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const response = await fetch("/api/auth/spotify/token", {
          credentials: "include",
        });
        if (response.ok) {
          const data = await response.json();
          setAccessToken(data.accessToken);
        } else {
          console.error("Failed to fetch access token");
        }
      } catch (error) {
        console.error("Error fetching access token:", error);
      }
    };

    fetchToken();
  }, []);

  return (
    <div className="h-screen w-screen max-h-screen max-w-screen">
      {accessToken ? (
        <div className="h-full w-full bg-blueBase p-5">
          <div className="h-10 rounded-full w-full flex items-center justify-center bg-blueDark shadow-2xl drop-shadow-2xl">
            <div className="bg-white rounded-full h-9 w-9"></div>
            <div className="w-full text-center">Title - Name</div>
          </div>

          <div className="mt-10 h-full w-full bg-blueDark rounded-2xl p-8 flex flex-col items-center shadow-2xl drop-shadow-2xl">
            <div className="w-full h-1/2 bg-white rounded-md shadow-2xl drop-shadow-2xl"></div>
            <div className="w-full text-center text-2xl my-5">Title - Name</div>

            <div className="relative w-full h-1 rounded-full bg-gray-400">
              <div className="absolute w-full h-full">
                <div className="w-1/2 bg-white h-full relative flex items-center">
                  <div className="w-1.5 h-1.5 absolute -right-1 bg-white rounded-full"></div>
                </div>
              </div>
            </div>

            <button className="h-20 w-20 flex items-center justify-center mt-10 rounded-full bg-white text-black">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-9">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 5.25v13.5m-7.5-13.5v13.5"
                />
              </svg>
            </button>

            <div>
              <div></div>
            </div>
          </div>
        </div>
      ) : (
        <>
          <p>Not authenticated</p>
          <button
            onClick={() =>
              (window.location.href =
                "http://localhost:5000/auth/spotify/login")
            }>
            Login with Spotify
          </button>
        </>
      )}
    </div>
  );
}

export default App;
