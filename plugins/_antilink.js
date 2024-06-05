let handler = (m) => m;

let linkRegex = /chat.whatsapp.com\/([0-9A-Za-z]{20,24})/i;
handler.before = async function (m, { user, isBotAdmin, isAdmin }) {
  if ((m.isBaileys && m.fromMe) || m.fromMe || !m.isGroup) return true;
  let chat = global.db.data.chats[m.chat];
  let isGroupLink = linkRegex.exec(m.text);

  if (chat.antiLink && isGroupLink) {
    await m.reply(
      `*「 ANTI LINK 」*\n\nDetected *${await conn.getName(
        m.sender
      )}* Anda telah mengirimkan tautan grup!\n\nMaaf, Anda akan dikeluarkan dari grup ini byee!`
    );
    if (isAdmin)
      return m.reply("*Eh maaf anda admin, Anda tidak akan ditendang.*");
    if (!isBotAdmin)
      return m.reply(
        "*Bot bukan admin, bagaimana mereka bisa menendang orang -_-*"
      );
    let linkGC =
      "https://chat.whatsapp.com/" + (await conn.groupInviteCode(m.chat));
    let isLinkconnGc = new RegExp(linkGC, "i");
    let isgclink = isLinkconnGc.test(m.text);
    if (isgclink)
      return m.reply(
        "*「 ANTI LINK 」*\n\nPesanan ditolak, bot tidak akan menendang Anda.\nKarena tautan grup itu sendiri"
      );
    await conn.sendMessage(m.chat, { delete: m.key });
    await conn.groupParticipantsUpdate(m.chat, [m.sender], "remove");
  }
  return true;
};

module.exports = handler;
