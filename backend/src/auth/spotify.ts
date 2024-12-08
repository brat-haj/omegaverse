import passport from "passport";
import { Strategy as SpotifyStrategy } from "passport-spotify";
import express, { Request, Response, NextFunction } from "express";

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj as Express.User);
});

passport.use(
  new SpotifyStrategy(
    {
      clientID: process.env.SPOTIFY_CLIENT_ID!,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET!,
      callbackURL: "http://localhost:5000/auth/spotify/callback",
    },
    (accessToken, refreshToken, expires_in, profile, done) => {
      return done(null, { profile, accessToken, refreshToken });
    }
  )
);

/**
 * @swagger
 * tags:
 *   name: SpotifyAuth
 *   description: Endpoints for Spotify authentication
 */

/**
 * Express router to handle Spotify authentication routes.
 * @module auth/spotify
 */
const router = express.Router();

router.get(
  "/login",
  passport.authenticate("spotify", {
    scope: [
      "user-read-email",
      "user-read-private",
      "user-library-modify",
      "user-library-read",
      "user-top-read",
      "playlist-modify-public",
      "playlist-modify-private"
    ],
  })
);

router.get(
  "/callback",
  passport.authenticate("spotify", { failureRedirect: "/" }),
  (req: any, res: Response) => {
    // Store the access token in the session
    req.session.accessToken = req.user.accessToken;
    res.redirect("http://localhost:5173"); // Redirect to your Vite front end
  }
);

/**
 * @swagger
 * /auth/spotify/logout:
 *   get:
 *     summary: Log out the user
 *     tags: [SpotifyAuth]
 *     responses:
 *       200:
 *         description: User logged out
 *       401:
 *         description: Not authenticated
 *       500:
 *         description: Internal server error
 */
router.get("/logout", (req: Request, res: Response, next: NextFunction) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

/**
 * @swagger
 * /auth/spotify/token:
 *   get:
 *     summary: Get the access token
 *     tags: [SpotifyAuth]
 *     responses:
 *       200:
 *         description: Access token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *       401:
 *         description: Not authenticated
 */
router.get("/token", (req: any, res: Response) => {
  if (req.session.accessToken) {
    res.json({ accessToken: req.session.accessToken });
  } else {
    res.status(401).json({ error: "Not authenticated" });
  }
});

/**
 * @swagger
 * /auth/spotify/me:
 *   get:
 *     summary: Get the user's profile
 *     tags: [SpotifyAuth]
 *     responses:
 *       200:
 *         description: User profile's ID
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: string
 *       401:
 *         description: Not authenticated
 */
router.get("/me", (req: any, res: Response) => {  
  if (req.isAuthenticated()) {
    res.json({ user: req.user.id });
  } else {
    res.status(401).json({ error: "Not authenticated" });
  }
});

export default router;