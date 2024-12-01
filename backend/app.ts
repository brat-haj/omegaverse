import express, { Request, Response, Express } from "express";
import session from "express-session";
import passport from "passport";
import index from "./src/routes";
import track from "./src/routes/track";
import recommendations from "./src/routes/recommendations";
import spotifyAuth from "./src/auth/spotify";

const app: Express = express();
const port: number = 5000;

app.use(session({ secret: "your_secret_key", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

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

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});