import db from "../db/drizzle";
import { users } from "../db/schema";
import { count, eq, ilike, or } from "drizzle-orm";
import express, { Request, Response, Router } from "express";

const router: Router = express.Router();

const NUMBER_OF_USERS_PER_PAGE = 9;

router.get("/", async (req: Request, res: Response) => {
  const { query, page = 1 } = req.query;
  const currentPage = parseInt(page as string);

  try {
    const offset = (currentPage - 1) * NUMBER_OF_USERS_PER_PAGE;

    let usersQuery;

    if (query) {
      usersQuery = await db
        .select()
        .from(users)
        .where(
          or(
            ilike(users.username, `%${query}%`),
            ilike(users.email, `%${query}%`),
          ),
        )
        .limit(NUMBER_OF_USERS_PER_PAGE)
        .offset(offset);
    } else {
      usersQuery = await db
        .select()
        .from(users)
        .limit(NUMBER_OF_USERS_PER_PAGE)
        .offset(offset);
    }

    if (!usersQuery.length) {
      return res.status(404).json({ message: "No users found" });
    }

    return res.status(200).json(usersQuery);
  } catch (error: any) {
    console.error("Error fetching users:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/count", async (req: Request, res: Response) => {
  try {
    const { query } = req.query;
    let usersQuery;

    if (query) {
      usersQuery = await db
        .select({ count: count() })
        .from(users)
        .where(
          or(
            ilike(users.username, `%${query}%`),
            ilike(users.email, `%${query}%`),
          ),
        );
    } else {
      usersQuery = await db.select({ count: count() }).from(users);
    }

    return res.status(200).json(usersQuery[0].count);
  } catch (error: any) {
    console.error("Error fetching users:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/:userId", async (req: Request, res: Response) => {
  const userId = parseInt(req.params.userId);

  try {
    const userQuery = await db.select().from(users).where(eq(users.id, userId));

    if (!userQuery.length) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(userQuery[0]);
  } catch (error: any) {
    console.error(`Error fetching user with ID ${userId}:`, error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

export default router;
