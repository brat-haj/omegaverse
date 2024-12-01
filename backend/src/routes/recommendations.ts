import { getRecommendations } from "../core/spotify/recommendations";

/**
 * Get recommendations
 * @returns {Promise<object>} - Returns the recommendations
 */
const recommendations = async (accessToken: string): Promise<object> => {
    return getRecommendations(accessToken);
}

export default recommendations;