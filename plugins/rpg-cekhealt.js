let handler = async (m, { conn }) => {
  let user = global.db.data.users[m.sender];
  const caption = `
│ *Name:* ${user.registered ? user.name : conn.getName(m.sender)}
│ *Nyawa:* ${user.healt}
  `.trim();
  conn.sendMessage(
    m.chat,
    {
      image: {
        url: "https://i.natgeofe.com/k/7bfcf2d2-542e-44f0-962a-c36f2efa98a5/heart_3x2.jpg",
      },
      caption: caption,
    },
    { quoted: m }
  );
};
handler.help = ["ceknyawa"];
handler.tags = ["rpg"];
handler.command = /^(ceknyawa)$/i;
handler.fail = null;
handler.exp = 0;
handler.register = true;
module.exports = handler;
