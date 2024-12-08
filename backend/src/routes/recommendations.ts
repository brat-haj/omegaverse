import { getRecommendations } from "../core/spotify/recommendations";
import RecommendationsData from "../interface/recommendationsData";

/**
 * @swagger
 * /recommendations:
 *   get:
 *     tags: [ContentAccess]
 *     summary: Retrieve recommendations
 *     description: Fetches recommendations based on the provided access token.
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         required: true
 *         description: Bearer token for authorization
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A list of recommendations
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 tracks:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       name:
 *                         type: string
 *                       artists:
 *                         type: array
 *                         items:
 *                           type: string
 *                       album:
 *                         type: string
 *                       cover:
 *                         type: string
 *       401:
 *         description: Unauthorized access
 *       500:
 *         description: Internal server error
 */
const recommendations = async (accessToken: string): Promise<RecommendationsData> => {
    return getRecommendations(accessToken);
}
export default recommendations;