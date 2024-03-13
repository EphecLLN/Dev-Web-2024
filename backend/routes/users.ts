import express, { Router, Request, Response } from "express";
import db from "../db/drizzle";

const router: Router = express.Router();

// Fetch all users
router.get("/", async (req: Request, res: Response) => {
  try {
    const users = await db.query.users.findMany();

    if (!users.length) {
      return res.status(404).json({ message: "No users found" });
    }

    return res.status(200).json(users);
  } catch (error: any) {
    console.error("Error fetching users:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

// Fetch a single user by ID
router.get("/:userId", async (req: Request, res: Response) => {
  const userId = parseInt(req.params.userId);

  try {
    const user = await db.query.users.findFirst({
      where: (user, { eq }) => eq(user.id, userId),
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(user);
  } catch (error: any) {
    console.error(`Error fetching user with ID ${userId}:`, error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

export default router;
