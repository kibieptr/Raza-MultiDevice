let handler = async (m, { conn, args }) => {
  let list = Object.entries(global.db.data.users);
  let lim = !args || !args[0] ? 30 : isNumber(args[0]) ? parseInt(args[0]) : 30;
  lim = Math.max(1, lim);
  list.map(([user, data], i) => Number((data.limit = lim)));
  conn.reply(
    m.chat,
    `*Limit berhasil direset! Setiap user mendaptkan ${lim} limit*`,
    m
  );
};
handler.help = ["limit"].map((v) => "reset" + v);
handler.tags = ["owner"];
handler.command = /^(resetlimit|risetlimit)$/i;

handler.owner = true;
handler.register = true;
module.exports = handler;

function isNumber(x = 0) {
  x = parseInt(x);
  return !isNaN(x) && typeof x == "number";
}
