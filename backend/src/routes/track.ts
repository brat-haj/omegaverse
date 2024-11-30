import Track, { getTrackById } from "../core/spotify/track";

export const trackById = async (id: string): Promise<Track> => {
    return await getTrackById(id); 
}
