const { Telegraf } = require("telegraf");
const fs = require('fs');
const bot = new Telegraf("6823072792:AAGd_72YdUJtDvU3PlHPdc-UhaCgBZVs02A");

bot.start(ctx => {
  console.log("Received /start command");
  try {
    return ctx.reply("Hi");
  } catch (e) {
    console.error("error in start action:", e);
    return ctx.reply("Error occured");
  }
});

bot.command('readjson', ctx => {
  fs.readFile('./nome_del_file.json', 'utf8', (err, data) => {
    if (err) {
      console.error('Errore nella lettura del file:', err);
      return ctx.reply('Errore nella lettura del file');
    }
    try {
      const jsonData = JSON.parse(data);
      console.log('Contenuto del file JSON:', jsonData);
      return ctx.reply(`Contenuto del file JSON: ${JSON.stringify(jsonData, null, 2)}`);
    } catch (e) {
      console.error('Errore nel parsing del JSON:', e);
      return ctx.reply('Errore nel parsing del JSON');
    }
  });
});

bot.command('markup', ctx => {
  return ctx.replyWithMarkdownV2(
    '*Ciao!* _Questo è un messaggio con markup_\n\n' +
    'Link a Telegram\n' +
    '`Codice inline`\n' +
    '```javascript\nconsole.log("Hello, world!");\n```'
  );
});

// AWS event handler syntax (https://docs.aws.amazon.com/lambda/latest/dg/nodejs-handler.html)
exports.handler = async event => {
  try {
    await bot.handleUpdate(JSON.parse(event.body));
    return { statusCode: 200, body: "" };
  } catch (e) {
    console.error("error in handler:", e);
    return { statusCode: 400, body: "This endpoint is meant for bot and telegram communication" };
  }
};
