import axios from "axios";
import { getAccessToken } from "./client"
import TrackData from "../../interface/trackData";

/**
 * Get the track by id
 * @param {string} id - The id of the track
 * @returns {Promise<TrackData>} - Returns the track
 */
export const getTrackById = async (id: string): Promise<TrackData> => {
    const response = await axios.get(`https://api.spotify.com/v1/tracks/${id}`, {
        headers: {
            Authorization: `Bearer ${await getAccessToken()}`   
        }
    });

    const track = response.data;
    return {
        id: track.id,
        name: track.name,
        artists: track.artists.map((artist: any) => artist.name),
        album: track.album.name,
        cover: track.album.images[0].url,
    };
}

export const getFavoriteTrack = async (accessToken: string): Promise<TrackData> => {
    const response = await axios.get("https://api.spotify.com/v1/me/top/tracks", {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        }
    });
    const track = response.data.items[0];
    return {
        id: track.id,
        name: track.name,
        artists: track.artists.map((artist: any) => artist.name),
        album: track.album.name,
        cover: track.album.images[0].url,
    };
}