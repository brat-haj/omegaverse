import axios from "axios";

/**
 * Get the access token from Spotify
 * @returns {string} - Returns the access token
 */
export const getAccessToken = async (): Promise<string> => {
    const clientId = process.env.SPOTIFY_CLIENT_ID!;
    const clientSecret = process.env.SPOTIFY_CLIENT_SECRET!;
    const authString = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");

    const response = await axios.post(
        "https://accounts.spotify.com/api/token",
        "grant_type=client_credentials", 
        {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                Authorization: `Basic ${authString}`,
            },
        }
    );

    return response.data.access_token;
};
