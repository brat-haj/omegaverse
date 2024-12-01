import{ getTrackById } from "../core/spotify/track";

import TrackData from "../interface/trackData";

const track = async (id: string): Promise<TrackData> => {
    return await getTrackById(id); 
}

export default track;
