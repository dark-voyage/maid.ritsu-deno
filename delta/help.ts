import { Composer, Context } from "../deps.ts";

const composer = new Composer();

export const message = `<b>List of available commands:</b>` +
  `\n` +
  `\n` +
  `/register - <code>register yoursefl and your car to our database</code>` +
  `\n` +
  `/lookup &lt;car plate&gt; - <code>lookup for car plate</code>`;

composer.command("help", async (ctx: Context): Promise<void> => {
  await ctx.reply(message, {
    parse_mode: "HTML",
    // reply_markup: keyboard,
  });
});

export default composer;
