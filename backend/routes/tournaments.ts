import db from "../db/drizzle";
import { tournaments } from "../db/schema";
import { eq } from "drizzle-orm";
import express, { Request, Response, Router } from "express";

const router: Router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    // Wait 500ms to simulate a slow network
    await new Promise((r) => setTimeout(r, 500));

    const tournamentsQuery = await db.select().from(tournaments);

    if (!tournamentsQuery.length) {
      return res.status(404).json({ message: "No tournaments found" });
    }

    return res.status(200).json(tournamentsQuery);
  } catch (error: any) {
    console.error("Error fetching tournaments:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/:tournamentId", async (req: Request, res: Response) => {
  const tournamentId = parseInt(req.params.tournamentId);

  try {
    // Wait 500ms to simulate a slow network
    await new Promise((r) => setTimeout(r, 500));

    const tournamentQuery = await db
      .select()
      .from(tournaments)
      .where(eq(tournaments.id, tournamentId));

    if (!tournamentQuery) {
      return res.status(404).json({ message: "Tournament not found" });
    }

    return res.status(200).json(tournamentQuery[0]);
  } catch (error: any) {
    console.error(`Error fetching tournament with ID ${tournamentId}:`, error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

export default router;
