import {
  boolean,
  date,
  integer,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

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

export const tournaments = pgTable("tournaments", {
  id: serial("id").primaryKey(),
  //gameId: ,
  name: varchar("name", { length: 40 }),
  format: varchar("format", { enum: ["BO1", "BO3", "BO5"] }),
  public: boolean("public"),
  nbrSlot: integer("nbrSlot"),
  teamSize: integer("teamSize"),
  date: date("date", { mode: "date" }).defaultNow(),
  loserBracket: boolean("loserBracket"),
});
