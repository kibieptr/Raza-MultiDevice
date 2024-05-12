async function before(m, { isAdmin, isBotAdmin }) {
  let chat = global.db.data.chats[m.chat];
  if (chat.antiBot) {
    if (m.isBaileys === true) {
      if (m.fromMe || !isBotAdmin) {
      } else {
        conn.reply(
          m.chat,
          `*[ 🔴 ANOTHER BOT DETECTED ]*\n_Maaf @${
            m.sender.split("@")[0]
          }, kamu akan segera di kick_`,
          null
        );
        conn.groupParticipantsUpdate(m.chat, [m.sender], "remove");
      }
    }
  }
  return;
}

module.exports = { before };
