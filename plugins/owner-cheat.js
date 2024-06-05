let { MessageType } = require("@adiwajshing/baileys");

let handler = async (m, { conn }) => {
  let user = global.db.data.users[m.sender];
  global.db.data.users[m.sender].exp += 50000;
  global.db.data.users[m.sender].limit += 50000;
  global.db.data.users[m.sender].money += 50000;

  conn.reply(
    m.chat,
    `*Succes Mendapatkan 5000 exp , 50000 limit & 50000 money*`,
    m
  );
};
handler.help = ["cheat"];
handler.tags = ["owner"];
handler.command = /^(cheat)$/i;
handler.premium = true;
handler.group = false;
handler.private = false;
handler.botAdmin = true;
handler.fail = null;
module.exports = handler;
