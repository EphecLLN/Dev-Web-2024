import seedRoutes from "./routes/seed";
import usersRoutes from "./routes/users";
import "dotenv/config";
import express, { Express, Request, Response } from "express";
import { auth } from "express-oauth2-jwt-bearer";

const jwtCheck = auth({
  audience: "http://localhost:3000/api/",
  issuerBaseURL: "https://madbrackets.eu.auth0.com/",
});

const app: Express = express();
const port = process.env.PORT || 8000;

app.get("/api/authorized", jwtCheck, (req: Request, res: Response) => {
  res.send("You are authorized!");
});

app.get("/api/easteregg", (req: Request, res: Response) => {
  res.json({ message: "Hello World!" });
});

app.use("/api/users", usersRoutes);
app.use("/api/dev/seed", seedRoutes);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
