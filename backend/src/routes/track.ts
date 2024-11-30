import{ getTrackById } from "../core/spotify/track";

import TrackData from "../interface/trackData";

export const trackById = async (id: string): Promise<TrackData> => {
    return await getTrackById(id); 
}
