import express, { Application, Request, Response } from "express";
import applyRouting from "routing/applyRouting";
import db from "./db/notDB";

export default function createServer() {
  const app: Application = express();

  app.get("/", (req: Request, res: Response) => {
    // res.send();
  });

  
  app.use(express.json());
  applyRouting(app, db);

  return app;
}
