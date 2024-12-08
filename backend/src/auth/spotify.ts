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

router.get("/logout", (req: Request, res: Response, next: NextFunction) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

router.get("/token", (req: any, res: Response) => {
  if (req.session.accessToken) {
    res.json({ accessToken: req.session.accessToken });
  } else {
    res.status(401).json({ error: "Not authenticated" });
  }
});

router.get("/me", (req: any, res: Response) => {  
  if (req.isAuthenticated()) {
    res.json({ user: req.user.id });
  } else {
    res.status(401).json({ error: "Not authenticated" });
  }
});

export default router;