import axios from "axios";
import PlaylistData from "../../interface/playlistData";

export const addToPlaylist = async (accessToken: string, playlistId: string, trackId: string): Promise<any> => {
    const response = await axios.post(
        `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
        {
            uris: [`spotify:track:${trackId}`],
        },
        {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
        }
    );
    return response;
};


export const createPlaylist = async (accessToken: string, userId: string, playlistName: string): Promise<PlaylistData> => {
    
    const existingPlaylistsResponse = await axios.get(
        `https://api.spotify.com/v1/users/${userId}/playlists`,
        {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
        }
    );

    const existingPlaylist = existingPlaylistsResponse.data.items.find(
        (playlist: any) => playlist.name === playlistName
    );

    if (existingPlaylist) {
        return {
            id: existingPlaylist.id,
            name: existingPlaylist.name,
        };
    }
    
    const response = await axios.post(
        `https://api.spotify.com/v1/users/${userId}/playlists`,
        {
            name: playlistName,
            public: false,
            description: "Created by the OmegaVerse",
        },
        {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
        }
    );
    return {
        id: response.data.id,
        name: response.data.name,
    };  
}