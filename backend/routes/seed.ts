import express, { Router, Request, Response } from "express";
import db from "../db/drizzle";
import { users } from "../db/schema";
import { randomInt } from "crypto";

const router: Router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  const { confirm, reset } = req.query;

  try {
    if (confirm !== "true") {
      return res.status(400).json({
        confirmation: "http://localhost:3000/api/dev/seed?confirm=true",
        confirmationAndReset:
          "http://localhost:3000/api/dev/seed?confirm=true&reset=true",
      });
    }

    if (reset === "true") {
      await db.delete(users);
    }

    const queryUsers = await db.select().from(users);
    if (queryUsers.length > 0) {
      return res.status(400).json({
        message: "The database is already seeded. No action taken.",
      });
    }

    const usersData = [
      {
        email: "simon.fontaine@example.com",
        username: "simon",
        avatar_url: `https://cdn.discordapp.com/embed/avatars/${randomInt(4)}.png`,
      },
      {
        email: "guillaume.ladriere@example.com",
        username: "guillaume",
        avatar_url: `https://cdn.discordapp.com/embed/avatars/${randomInt(4)}.png`,
      },
      {
        email: "bastien.patureau@example.com",
        username: "bastien",
        avatar_url: `https://cdn.discordapp.com/embed/avatars/${randomInt(4)}.png`,
      },
      {
        email: "timothy.truong@example.com",
        username: "timothy",
        avatar_url: `https://cdn.discordapp.com/embed/avatars/${randomInt(4)}.png`,
      },
      {
        email: "maxime.bongartz@example.com",
        username: "maxime",
        avatar_url: `https://cdn.discordapp.com/embed/avatars/${randomInt(4)}.png`,
      },
    ];

    await db.insert(users).values(usersData);

    return res
      .status(200)
      .json({ message: "The database has been seeded successfully." });
  } catch (error: any) {
    console.error("Error while seeding the database:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

export default router;