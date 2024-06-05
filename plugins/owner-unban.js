let handler = async (m, { conn, participants }) => {
  // if (participants.map(v=>v.jid).includes(global.conn.user.jid)) {
  global.db.data.chats[m.chat].isBanned = false;
  m.reply(
    "Berhasil membanned chat, Bot tidak akan respon di chat ini. hanya via chat private"
  );
  // } else m.reply('Ada nomor host disini...')
};
handler.help = ["unmute"];
handler.tags = ["owner"];
handler.command = ["unmute"];
handler.owner = true;
handler.register = true;
module.exports = handler;
