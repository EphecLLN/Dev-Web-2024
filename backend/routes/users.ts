import db from "../db/drizzle";
import { users } from "../db/schema";
import { eq } from "drizzle-orm";
import express, { Request, Response, Router } from "express";

const router: Router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    // Wait 500ms to simulate a slow network
    await new Promise((r) => setTimeout(r, 500));

    const usersQuery = await db.select().from(users);

    if (!usersQuery.length) {
      return res.status(404).json({ message: "No users found" });
    }

    return res.status(200).json(usersQuery);
  } catch (error: any) {
    console.error("Error fetching users:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/:userId", async (req: Request, res: Response) => {
  const userId = parseInt(req.params.userId);

  try {
    // Wait 500ms to simulate a slow network
    await new Promise((r) => setTimeout(r, 500));

    const userQuery = await db.select().from(users).where(eq(users.id, userId));

    if (!userQuery) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(userQuery);
  } catch (error: any) {
    console.error(`Error fetching user with ID ${userId}:`, error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

export default router;
