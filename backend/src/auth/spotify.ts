import passport from "passport";
import { Strategy as SpotifyStrategy } from "passport-spotify";
import express, { Request, Response, NextFunction } from "express";

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj:any, done) => {
  done(null, obj);
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
    scope: ["user-read-email", "user-read-private"],
  })
);

router.get(
  "/callback",
  passport.authenticate("spotify", { failureRedirect: "/" }),
  (req: Request, res: Response) => {
    res.redirect("/"); // Redirect to the frontend after successful login
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

export default router;