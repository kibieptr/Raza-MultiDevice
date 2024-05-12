let handler = async (m, { args, usedPrefix }) => {
  let user = global.db.data.users[m.sender];
  if (user.healt >= 100)
    return m.reply(
      `Kamu Sudah Sehat
`.trim()
    );
  let buf = user.cat;
  let buff =
    buf == 0
      ? "5"
      : "" || buf == 1
      ? "10"
      : "" || buf == 2
      ? "15"
      : "" || buf == 3
      ? "20"
      : "" || buf == 4
      ? "25"
      : "" || buf == 5
      ? "30"
      : "" || buf == 6
      ? "35"
      : "" || buf == 7
      ? "40"
      : "" || buf == 8
      ? "45"
      : "" || buf == 9
      ? "50"
      : "" || buf == 10
      ? "100"
      : "" || buf == 11
      ? "100"
      : "";
  const heal = 15 + buff * 4;
  let count =
    Math.max(
      1,
      Math.min(
        Number.MAX_SAFE_INTEGER,
        (isNumber(args[0]) && parseInt(args[0])) ||
          Math.round((100 - user.healt) / heal)
      )
    ) * 1;
  if (user.potion < count)
    return m.reply(
      `
Potion Kamu Ga Ada Kak*
Ketik *${usedPrefix}buy potion ${count - user.potion}* Untuk Membelinya
`.trim()
    );
  user.potion -= count * 1;
  user.healt += heal * count;
  m.reply(
    `
Sukses Menggunakan Potion, Kamu Sehat WalAfiat Sekarang
`.trim()
  );
};

handler.help = ["heal"];
handler.tags = ["rpg"];
handler.command = /^(heal)$/i;
handler.group = true;
handler.fail = null;
handler.exp = 0;
handler.register = true;
module.exports = handler;
function isNumber(number) {
  if (!number) return number;
  number = parseInt(number);
  return typeof number == "number" && !isNaN(number);
}
