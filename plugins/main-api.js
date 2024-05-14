let fetch = require("node-fetch");
let handler = async (m, { text }) => {
  if (!text) throw `Masukan Apikey!`;
  try {
    let api = await fetch(
      `https://api.botcahx.eu.org/api/checkkey?apikey=${text}`
    );
    let body = await api.text();
    m.reply(body);
  } catch (e) {
    console.log(e);
    m.reply("Apikey tidak terdaftar!");
  }
};
handler.command = handler.help = ["checkapi"];
handler.tags = ["main"];
handler.private = true;
handler.register = true;
module.exports = handler;
