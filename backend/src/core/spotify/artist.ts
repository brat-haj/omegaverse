import axios from "axios";
import ArtistData from "../../interface/artistData";

export const getFavoriteArtist = async (accessToken: string): Promise<ArtistData> => {
    const response = await axios.get("https://api.spotify.com/v1/me/top/artists", {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
    const artist = response.data.items[0];

    return {
        id: artist.id,
        name: artist.name,
    };
}