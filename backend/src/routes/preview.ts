import getPreviewUrl from "../core/deezer/preview";

/**
 * @swagger
 * /preview/{trackName}/{artistName}:
 *   get:
 *     tags: [ContentAccess]
 *     summary: Get a preview of a track
 *     description: Returns a preview of a track
 *     parameters:
 *       - in: path
 *         name: trackName
 *         required: true
 *         schema:
 *           type: string
 *         description: The name of the track
 *       - in: path
 *         name: artistName
 *         required: true
 *         schema:
 *           type: string
 *         description: The name of the artist
 *     responses:
 *       200:
 *         description: A successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 preview:
 *                   type: string
 *                   description: The URL of the preview
 */
const preview = (trackName: string, artistName: string): Promise<string> => {
  return getPreviewUrl(trackName, artistName);
};

export default preview;
