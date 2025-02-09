// src/index.ts
import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

const server: Express = express();
server.use(express.json())

server.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

export default server