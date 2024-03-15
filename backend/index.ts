import seedRoutes from "./routes/seed";
import usersRoutes from "./routes/users";
import "dotenv/config";
import express, { Express, Request, Response } from "express";

const app: Express = express();
const port = process.env.PORT || 8000;

app.get("/api/easteregg", (req: Request, res: Response) => {
  res.json({ message: "Hello World!" });
});

app.use("/api/users", usersRoutes);
app.use("/api/dev/seed", seedRoutes);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
