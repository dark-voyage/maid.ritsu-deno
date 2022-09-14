import { Composer, Context } from "../deps.ts";

const composer = new Composer();

export const message = `<b>Welcome to our Car Finder</b>` +
  `\n` +
  `\n` +
  `This bot helps you to find car owner's info that parked after your's.` +
  `If you're just getting started, get started by registering!` +
  `\n` +
  `\n` +
  `<code>/register</code>`;

composer.command("start", async (ctx: Context): Promise<void> => {
  await ctx.reply(message, {
    parse_mode: "HTML",
  });
});

export default composer;
