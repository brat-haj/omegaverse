import{ getTrackById } from "../core/spotify/track";

import TrackData from "../interface/trackData";

/**
 * @swagger
 * /track/{id}:
 *   get:
 *     tags: [ContentAccess]
 *     summary: Retrieve track by ID
 *     description: Fetches a track based on the provided track ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the track to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A track object
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 artists:
 *                   type: array
 *                   items:
 *                     type: string
 *                 album:
 *                   type: string
 *                 cover:
 *                   type: string
 *       404:
 *         description: Track not found
 *       500:
 *         description: Internal server error
 */
const track = async (id: string): Promise<TrackData> => {
    return await getTrackById(id); 
}

export default track;
