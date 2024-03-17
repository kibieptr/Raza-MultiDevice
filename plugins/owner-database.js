let fs = require("fs");
let handler = async (m, { conn, text }) => {
  m.reply("Tunggu Sebentar, Proses Getting File database.json");
  let db = fs.readFileSync("./database.json");
  conn.sendFile(m.chat, db, "database.json", m);
};
handler.help = ["getdb", "getdatabase"].map((v) => v + " <teks>");
handler.tags = ["owner"];
handler.command = /^(db|getdb)$/i;
handler.rowner = true;
handler.owner = true;
handler.mods = true;
handler.premium = false;
handler.private = true;
handler.admin = true;
handler.register = true;
handler.fail = null;

module.exports = handler;
