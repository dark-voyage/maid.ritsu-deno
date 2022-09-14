import { Bot } from "../deps.ts";
import help from "./help.ts";
import start from "./start.ts";
import inline from "./inline.ts";
import lookup from "./lookup.ts";
import register from "./register.ts";

export default async (bot: Bot) => {
  await bot.use(inline);
  await bot.use(start);
  await bot.use(help);
  await bot.use(lookup);
  await bot.use(register);
};
