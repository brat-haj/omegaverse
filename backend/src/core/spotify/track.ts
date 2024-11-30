import axios from "axios";
import { getAccessToken } from "./client"

export default interface Track {
    id: string;
    name: string;
    artists: string[];
    album: string;
    cover: string;
}

export const getTrackById = async (id: string): Promise<Track> => {
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
        cover: track.album.images[0].url
    };
}