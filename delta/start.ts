import { Composer, Context } from "../deps.ts";

const composer = new Composer();

export const message = `<b>Kitoblardan qidirishni boshlaymizmi?)</b>` +
  `\n` +
  `\n` +
  `Qidirishni boshlash uchun, iltimos quyidaghi keltirilgan misol tartibida ` +
  `qidirmoqchi bo'lgan kitob nomi yoki shunga yaqin kalit so'zlarini yozing:` +
  `\n` +
  `\n` +
  `<code>/book bash</code>`;

const regex = /book(.*)/ig;

composer.hears(regex, async (ctx: Context): Promise<void> => {
  const result = regex.exec(<string> ctx.match!)![1].trim();

  if (!result) {
    await ctx.reply(message, {
      parse_mode: "HTML",
    });
  }

  // search hook on API
  const _search = await fetch(`https://some.api.uz/search/${result}`);

  // TODO: Implement the book API explorer
});

export default composer;
