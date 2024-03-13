import express, { Router, Request, Response } from "express";
import db from "../db/drizzle";
import { users } from "../db/schema";
import { randomInt } from "crypto";

const router: Router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const queryUsers = await db.query.users.findMany();
    if (queryUsers.length) {
      return res.redirect("/api/users");
    }

    await db.insert(users).values({
      email: "simon.fontaine@example.com",
      username: "simon",
      avatar_url: `https://cdn.discordapp.com/embed/avatars/${randomInt(4)}.png`,
    });

    await db.insert(users).values({
      email: "guillaume.ladriere@example.com",
      username: "guillaume",
      avatar_url: `https://cdn.discordapp.com/embed/avatars/${randomInt(4)}.png`,
    });

    await db.insert(users).values({
      email: "bastien.patureau@example.com",
      username: "bastien",
      avatar_url: `https://cdn.discordapp.com/embed/avatars/${randomInt(4)}.png`,
    });

    await db.insert(users).values({
      email: "timothy.truong@example.com",
      username: "timothy",
      avatar_url: `https://cdn.discordapp.com/embed/avatars/${randomInt(4)}.png`,
    });

    await db.insert(users).values({
      email: "maxime.bongartz@example.com",
      username: "maxime",
      avatar_url: `https://cdn.discordapp.com/embed/avatars/${randomInt(4)}.png`,
    });

    return res.redirect("/api/users");
  } catch (error: any) {
    console.error("Error seeding users:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

export default router;
