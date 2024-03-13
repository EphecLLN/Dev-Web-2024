import { pgTable, serial, text, varchar, timestamp } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 256 }).unique(),
  username: varchar("username", { length: 256 }).unique(),
  avatar_url: text("avatar_url").default(
    `https://cdn.discordapp.com/embed/avatars/0}.png`,
  ),
  created_at: timestamp("created_at", { mode: "date" }).defaultNow(),
  updated_at: timestamp("updated_at", { mode: "date" }).defaultNow(),
});
