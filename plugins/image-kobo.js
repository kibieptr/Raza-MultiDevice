const fetch = require("node-fetch");

let handler = async (m, { conn, text }) => {
  m.reply(wait);
  let tio = await fetch(
    "https://api.lolhuman.xyz/api/pinterest2?apikey=IchanZX&query=kobo+kanaeru+icon"
  );
  let p = await tio.json();
  const imageUrl = p.result[Math.floor(Math.random() * p.result.length)];
  conn.sendFile(m.chat, imageUrl, "", "*Ini Kak 🥰*", m);
};

handler.command = handler.help = ["kobo"];
handler.tags = ["image"];
handler.limit = true;
handler.register = true;

module.exports = handler;
