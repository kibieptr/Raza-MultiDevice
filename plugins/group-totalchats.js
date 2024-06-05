let handler = async (m, { conn }) => {
  // Mendapatkan pesan-pesan dari basis data
  const messages = conn.chats[m.chat].messages;

  // Menghitung total pesan dalam grup
  const totalMessages = Object.values(messages).length;

  // Mengirim pesan dengan hasil perhitungan
  await m.reply(`Total Pesan dalam Grup: *${totalMessages}* Pesan`, null, {
    contextInfo: {
      mentionedJid: [m.sender],
    },
  });
};

handler.help = ["totalchat"];
handler.tags = ["group"];
handler.command = /^(totalchat)$/i;
handler.group = true;

module.exports = handler;
