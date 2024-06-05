let handler = async (m, { conn, text }) => {
  if (!text) throw "Siapa ?";
  let who;
  if (m.isGroup) who = m.mentionedJid[0];
  else who = m.chat;
  if (!who) throw "Tag??";
  let users = global.db.data.users;
  users[who].premium = false;
  users[who].premiumTime = 0;
  conn.reply(m.chat, "Sukses dihapus dari premium!", m);
};
handler.help = ["delprem [@user]"];
handler.tags = ["owner"];
handler.command = /^(remove|hapus|-|del)prem$/i;
handler.register = true;
handler.owner = true;
handler.rowner = true;
module.exports = handler;
