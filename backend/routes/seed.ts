import db from "../db/drizzle";
import { users } from "../db/schema";
import axios from "axios";
import express, { Request, Response, Router } from "express";

type queryType = {
  id: string;
  email: string;
  username: string;
  avatar_url: string;
};

const router: Router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    await db.delete(users);

    const usersData = await axios
      .get<queryType[]>("https://65eec680ead08fa78a4ee04c.mockapi.io/api/users")
      .then((res) =>
        res.data.map((user) => ({ ...user, id: Number(user.id) })),
      );

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
