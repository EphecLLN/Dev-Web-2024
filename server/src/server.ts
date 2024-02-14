import express, { Express, Request, Response } from "express";
import prisma from "./lib/prisma";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(cors());

app.get("/api/home", (req: Request, res: Response) => {
  res.json({ message: "Hello World!" });
});

app.get("/api/users", async (req: Request, res: Response) => {
  try {
    const user = await prisma.user.findMany();

    if (!user) {
      return res.status(404).json({ message: "No user found" });
    }

    return res.status(200).json(user);
  } catch (error: any) {
    console.error("Error fetching users:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
