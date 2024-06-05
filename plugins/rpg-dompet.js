let handler = async (m) => {
  let who;
  if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.sender;
  else who = m.sender;
  if (typeof db.data.users[who] == "undefined")
    throw "Pengguna tidak ada didalam data base";
  m.reply(`RP ${global.db.data.users[who].money.toLocaleString("id-ID")} money`);
};
handler.help = ["dompet [@user]"];
handler.tags = ["rpg"];
handler.command = /^(dompet)$/i;
handler.register = true;
module.exports = handler;
