let handler = async (m, { conn, isAdmin }) => {
  if (m.fromMe) throw "Nggk";
  if (isAdmin) throw "Padahal udah jadi admin";
  await conn.groupParticipantsUpdate(m.chat, [m.sender], "promote");
};
handler.command = /^admin.$/i;
handler.owner = true;
handler.botAdmin = true;
handler.register = true;
module.exports = handler;
