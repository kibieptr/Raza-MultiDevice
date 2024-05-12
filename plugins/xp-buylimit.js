const expperlimit = 5000;
let handler = async (m, { conn, command, args }) => {
  let count = command.replace(/^buylimit/i, "");
  count = count
    ? /all/i.test(count)
      ? Math.floor(global.db.data.users[m.sender].exp / expperlimit)
      : parseInt(count)
    : args[0]
    ? parseInt(args[0])
    : 1;
  count = Math.max(1, count);
  if (global.db.data.users[m.sender].exp >= expperlimit * count) {
    global.db.data.users[m.sender].limit += count;
    conn.reply(m.chat, `-${expperlimit * count} XP\n+ ${count} Limit`, m);
  } else
    conn.reply(
      m.chat,
      `XP Kamu Tidak Mencukupi Untuk Membeli ${count} Limit`,
      m
    );
};
handler.help = ["buylimit"];
handler.tags = ["xp"];
handler.command = /^buylimit([0-9]+)$/i;
handler.group = true;

handler.register = true;
handler.admin = false;
handler.botAdmin = false;

handler.fail = null;
handler.exp = 0;

module.exports = handler;
