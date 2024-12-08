import express, { Request, Response, Express } from "express";
import session from "express-session";
import passport from "passport";
import index from "./src/routes";
import track from "./src/routes/track";
import recommendations from "./src/routes/recommendations";
import spotifyAuth from "./src/auth/spotify";
import preview from "./src/routes/preview";
import { createPlaylist, addToPlaylist} from "./src/core/spotify/playlist";
import { setupSwagger } from "./src/swagger";

const app: Express = express();
const port: number = 5000;

app.use(session({ secret: "your_secret_key", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());


app.use("/auth/spotify", spotifyAuth);

app.get("/", async (req: Request, res: Response) => {
  try {
    const result = await index();
    res.send(result);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
});

app.get("/track/:id", async (req: Request, res: Response) => {
  try {
    const result = await track(req.params.id);
    res.send(result);
  } catch (error: any) {
    console.log(error);
    res.status(500).send(error.message);
  }
});

app.get("/recommendations/:token", async (req: Request, res: Response) => {
  try {
    const result = await recommendations(req.params.token);
    res.send(result);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
});

app.get("/preview/:trackName/:artistName", async (req: Request, res: Response) => {
  try {
    console.log(req.body);
    const result = await preview(req.params.trackName, req.params.artistName);
    res.send(result);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
});

/**
 * @swagger
 * /playlist:
 *   post:
 *     summary: Create a new playlist
 *     tags: [Playlist]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               accessToken:
 *                 type: string
 *               userId:
 *                 type: string
 *               playlistName:
 *                 type: string
 *     responses:
 *       200:
 *         description: Playlist created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 playlistId:
 *                   type: string
 *       401:
 *         description: Not authenticated
 *       500:
 *         description: Internal server error
 */
app.post("/playlist", async (req: Request, res: Response) => {
  try {
    const result = await createPlaylist(req.body.accessToken, req.body.userId, req.body.playlistName);
    res.send(result);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
});

/**
 * @swagger
 * /playlist/{playlistId}/{trackId}:
 *   post:
 *     summary: Add a track to a playlist
 *     tags: [Playlist]
 *     parameters:
 *       - in: path
 *         name: playlistId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the playlist
 *       - in: path
 *         name: trackId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the track
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               accessToken:
 *                 type: string
 *                 description: The access token
 *     responses:
 *       200:
 *         description: Track added to playlist
 *       401:
 *         description: Not authenticated
 *       500:
 *         description: Internal server error
 */
app.post("/playlist/:playlistId/:trackId", async (req: Request, res: Response) => {
  try {
    const result = await addToPlaylist(req.body.accessToken, req.params.playlistId, req.params.trackId);
    res.send(result);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
});

setupSwagger(app);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});