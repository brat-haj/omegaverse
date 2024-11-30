import express, { Request, Response, Express } from "express";
import index from "./src/routes";

const app: Express = express();
const port: number = 5000;

app.get("/", (req: Request, res: Response) => {
  res.send(index());
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
