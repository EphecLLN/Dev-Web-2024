import express, { Express, Request, Response } from "express";
import usersRoutes from "./routes/users";

const app: Express = express();
const port = process.env.PORT || 8000;

app.get("/api/easteregg", (req: Request, res: Response) => {
  res.json({ message: "Hello World!" });
});

app.use("/api/users", usersRoutes);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
