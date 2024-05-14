let handler = async (m, { conn }) => {
  if (new Date() - global.db.data.users[m.sender].lastclaim > 86400000) {
    conn.reply(
      m.chat,
      "Selamat Kak, Kamu Mendapatkan Money: Rp.35000 & Limit: 5 Limit Dari Admin",
      m
    );
    global.db.data.users[m.sender].money += 35000;
    global.db.data.user[m.sender].limit += 5;
    global.db.data.users[m.sender].lastclaim = new Date() * 1;
  } else conn.reply(m.chat, "Bilang Apa Hayoo??", m);
};
handler.help = ["hadiah"];
handler.tags = ["rpg"];
handler.command = /^(hadiah)$/i;
handler.owner = false;
handler.mods = false;
handler.premium = false;
handler.group = true;
handler.private = false;
handler.admin = false;
handler.botAdmin = false;
handler.limit = true;
handler.fail = null;
handler.exp = 0;
handler.register = true;
module.exports = handler;
