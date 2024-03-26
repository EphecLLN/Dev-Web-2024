import db from "../db/drizzle";
import { tournaments, users } from "../db/schema";
import axios from "axios";
import { randomInt } from "crypto";
import express, { Request, Response, Router } from "express";

type userQueryType = {
  id: string;
  email: string;
  username: string;
  avatar_url: string;
  created_at: Date;
  updated_at: Date;
};

type tournamentFormat = "BO1" | "BO3" | "BO5";

type tournamentQueryType = {
  id: string;
  name: string;
  public: boolean;
  nbrSlot: number;
  teamSize: number;
  date: Date;
  format: tournamentFormat;
  loserBracket: boolean;
};

function createRandomFormat(): tournamentFormat {
  const formats = ["BO1", "BO3", "BO5"];
  const randomIndex = randomInt(0, formats.length - 1);

  return formats[randomIndex] as tournamentFormat;
}

const router: Router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    await db.delete(users);

    const usersData = await axios
      .get<
        userQueryType[]
      >("https://65eec680ead08fa78a4ee04c.mockapi.io/api/users")
      .then((res) =>
        res.data.map((user) => ({ ...user, id: Number(user.id) })),
      );

    usersData.forEach((user) => {
      user.created_at = new Date(user.created_at);
      user.updated_at = new Date(user.updated_at);
    });

    await db.insert(users).values(usersData);

    await db.delete(tournaments);

    const tournamentsData = await axios
      .get<
        tournamentQueryType[]
      >("https://65eec680ead08fa78a4ee04c.mockapi.io/api/tournaments")
      .then((res) =>
        res.data.map((tournament) => ({
          ...tournament,
          id: Number(tournament.id),
        })),
      );

    tournamentsData.forEach((tournament) => {
      tournament.format = createRandomFormat();
      tournament.date = new Date(tournament.date);
    });

    await db.insert(tournaments).values(tournamentsData);

    return res
      .status(200)
      .json({ message: "The database has been seeded successfully." });
  } catch (error: any) {
    console.error("Error while seeding the database:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
