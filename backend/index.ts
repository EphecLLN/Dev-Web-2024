import seedRoutes from "./routes/seed";
import tournamentsRoutes from "./routes/tournaments";
import usersRoutes from "./routes/users";
import cors from "cors";
import "dotenv/config";
import express, { Express, Request, Response } from "express";
import { auth } from "express-oauth2-jwt-bearer";

const jwtCheck = auth({
  audience: process.env.AUTH0_AUDIENCE!,
  issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL!,
});

const app: Express = express();
const port = process.env.PORT || 8000;

app.use(
  cors({
    origin: [process.env.CORS_ORIGIN!, process.env.AUTH0_ISSUER_BASE_URL!],
    credentials: true,
  }),
);

app.get("/api/authorized", jwtCheck, (req: Request, res: Response) => {
  res.send("You are authorized!");
});

app.use("/api/users", usersRoutes);
app.use("/api/tournaments", tournamentsRoutes);
app.use("/api/dev/seed", seedRoutes);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
