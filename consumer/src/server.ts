// src/index.ts
import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import RabbitMQServer from "./consumer/rabbitmq.server";

dotenv.config();

const server: Express = express();
server.use(express.json())

server.get("/", async (req: Request, res: Response) => {
  res.status(200).json({ message: "Express + TypeScript Server"});
});

export default server