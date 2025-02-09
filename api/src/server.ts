// src/index.ts
import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";

import router from "./routes";
dotenv.config();

const server: Express = express();
server.use(express.json())

server.use('/api', router)

server.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});



export default server