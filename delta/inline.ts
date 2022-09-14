import { Composer, Context, InlineKeyboard } from "../deps.ts";
import { searchCarV2, User } from "../middleware.ts";
const composer = new Composer();

composer.inlineQuery(/(.*)/ig, async (ctx: Context): Promise<any> => {
  if (ctx.inlineQuery?.query) {
    const query = ctx.inlineQuery?.query;
    const search = (await searchCarV2(query)).slice(0, 49);
    return await ctx.answerInlineQuery(search.map((item: User) => ({
      type: "article",
      id: crypto.randomUUID(),
      title: item.car,
      description: "",
      reply_markup: new InlineKeyboard().url(
        `Start Chatting`,
        `https://t.me/${item.username}`,
      ),
      input_message_content: {
        message_text: `<b>📃 Found result...</b>` +
          `\n` +
          `\n` +
          `✨ <b>Owner:</b> ${item.username}` +
          `\n` +
          `🧑‍💻 <b>Plate:</b> ${item.car}`,
        parse_mode: "HTML",
      },
    })));
  }

  if (!ctx.inlineQuery?.query) {
    return await ctx.answerInlineQuery([{
      type: "article",
      id: "404",
      title: "Start searching!",
      description: "Start typing the car plate here!",
      reply_markup: new InlineKeyboard().switchInlineCurrent(
        "Maybe we should try again?",
        "",
      ),
      input_message_content: {
        message_text: `<b>Hello Wiuterian!</b>` +
          `\n` +
          `\n` +
          `You just activated inline mode of our bot. With the help of this feature, ` +
          `you may start searching for cars instantly without any hustle.` +
          `\n` +
          `\n` +
          `<code>@wiutcarsbot &lt;car plate&gt;</code>`,
        parse_mode: "HTML",
      },
    }]);
  }
});

export default composer;
