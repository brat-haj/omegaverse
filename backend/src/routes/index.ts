import ApiVersion from '../interface/apiVersion';
import jsonPackage from '../../package.json';

/**
 * @swagger
 * /:
 *   get:
 *     tags: [API]
 *     summary: Get API version
 *     description: Returns the version of the API
 *     responses:
 *       200:
 *         description: A successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 version:
 *                   type: string
 *                 versionName:
 *                   type: string
 */
const index = async (): Promise<ApiVersion> => {
  return {
    version: jsonPackage.version,
    versionName: jsonPackage.versionName,
  };
};

export default index;