const handler = async (m, { conn, usedPrefix, args }) => {
const groups = Object.keys(conn.chats)
  .filter(key => key.endsWith('@g.us'))
  .map(key => conn.chats[key]);
const list = groups.map((group, index) => `│ ◦ *${index + 1}.* ${group.subject}`).join('\n');

  if (args.length === 0) {
    conn.reply(m.chat, `┌  ◦ *Enter Number for Type Group:*\n${list}\n└——`, m);
  } else if (args.length === 1 && /^\d+$/.test(args[0])) {
    const index = parseInt(args[0]) - 1;
    if (index >= 0 && index < groups.length) {
      const group = groups[index];
      const superAdminCount = group.participants.filter(p => p.admin === 'superadmin').length;
      const adminCount = group.participants.filter(p => p.admin === 'admin').length;
      const adminList = group.participants.filter(p => p.admin === 'admin').map(a => `- ${a.id.replace(/(\d+)@.+/, '@$1')}`).join('\n');
      const superAdminList = group.participants.filter(p => p.admin === 'superadmin').map(a => `- ${a.id.replace(/(\d+)@.+/, '@$1')}`).join('\n');
      const info = `┌  ◦ *Order Group Information ${index + 1}*\n` +
 `│ ◦ *ID:* ${group.id}\n` +
 `│ ◦ *Subject:* ${group.subject}\n` +
 `│ ◦ *Subject Owner:* ${group.subjectOwner}\n` +
 `│ ◦ *Subject Time Changed:* ${formatTime(group.subjectTime)}\n` +
 `│ ◦ *Time Created:* ${formatTime(group.creation)}\n` +
 `│ ◦ *Group Owner:* ${group.owner.replace(/(\d+)@.+/, '@$1')}\n` +
 `│ ◦ *Description:* ${group.desc}\n` +
 `│ ◦ *Description ID:* ${group.descId}\n` +
 `│ ◦ *Restrictions:* ${group.restrict ? 'Yes' : 'No'}\n` +
 `│ ◦ *Announcement:* ${group.announce ? 'Yes' : 'No'}\n` +
 `│ ◦ *Total Participants:* ${group.participants.length}\n` +
 `│ ◦ *Number of Superadmins:* ${superAdminCount}\n` +
 `│ ◦ *Superadmin List:*\n${superAdminList}\n` +
 `│ ◦ *Admin Count:* ${adminCount}\n` +
 `│ ◦ *Admin List:*\n${adminList}\n` +
 `│ ◦ **Ephemeral Message Duration:* ${formatDuration(group.ephemeralDuration)}\n` +
 `└——`;
      await m.reply(
        info,
        null,
        {
            contextInfo: {
                mentionedJid: group.participants.map((v) => v.id)
            }
        }
    );
    } else {
      conn.reply(m.chat, `┌  ◦ *Enter Number for Type Group:*\n${list}\n└——`, m);
    }
  } else {
    conn.reply(m.chat, `*• Example:* ${usedPrefix + command} *[number]*`, m);
  }
};

handler.help = ['gcl','grouplist'].map(a => a + ' *[get list & info group]*');
handler.tags = ['info'];
handler.command = /^(gcl|grouplist)$/i;

module.exports = handler;

function formatTime(timestamp) {
  const date = new Date(timestamp * 1000);
  return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
}

function formatDuration(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const formatted = [];
  if (hours > 0) formatted.push(`${hours} jam`);
  if (minutes > 0) formatted.push(`${minutes} menit`);
  return formatted.join(' ');
}