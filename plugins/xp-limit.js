let handler = async (m) => {
  let who;
  if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.sender;
  else who = m.sender;
  fdoc = {
    key: {
      remoteJid: "status@broadcast",
      participant: "0@s.whatsapp.net",
    },
    message: {
      documentMessage: {
        title: wm,
      },
    },
  };
  m.reply(`Limit Kamu Tersisa ${global.db.data.users[who].limit} ಥ_ಥ`);
};
handler.help = ["limit [@user]"];
handler.tags = ["xp"];
handler.command = /^(limit)$/i;
handler.register = true;
module.exports = handler;
