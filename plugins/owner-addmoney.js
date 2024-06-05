const { MessageType } = require("@adiwajshing/baileys");

let handler = async (m, { conn, text }) => {
  if (!text) {
    throw "Masukkan jumlah Money yang ingin ditambahkan pada pengguna. Contoh: .addmoney @user 10";
  }

  conn.chatRead(m.chat);
  conn.sendMessage(m.chat, {
    react: {
      text: "🕒",
      key: m.key,
    },
  });

  let mentionedJid = m.mentionedJid[0];
  if (!mentionedJid) {
    throw "Tag pengguna yang ingin ditambahkan Moneynya. Contoh: .addmoney @user 10";
  }

  let pointsToAdd = parseInt(text.split(" ")[1]);
  if (isNaN(pointsToAdd)) {
    throw "Jumlah Money yang dimasukkan harus berupa angka. Contoh: .addlimit @user 10";
  }

  let users = global.db.data.users;
  if (!users[mentionedJid]) {
    users[mentionedJid] = {
      money: 0,
      exp: 0,
      lastclaim: 0,
    };
  }

  users[mentionedJid].money += pointsToAdd;

  conn.reply(
    m.chat,
    `Berhasil menambahkan ${pointsToAdd} Money untuk @${
      mentionedJid.split("@")[0]
    }.`,
    m,
    {
      mentions: [mentionedJid],
    }
  );
};

handler.help = ["addmoney @user <jumlah>"];
handler.tags = ["xp"];
handler.command = /^addmoney/i;
handler.owner = true;
handler.register = true;
module.exports = handler;
