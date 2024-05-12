let handler = async (m, { conn }) => {
  let __timers = new Date() - global.db.data.users[m.sender].lastnguli;
  let _timers = 86400000 - __timers;
  let timers = clockString(_timers);
  if (new Date() - global.db.data.users[m.sender].lastnguli > 86400000) {
    global.db.data.users[m.sender].limit += 5;
    m.reply("_Selamat Kamu Mendapatkan +5 Limit_");
    global.db.data.users[m.sender].lastnguli = new Date() * 1;
  } else
    m.reply(
      `Kamu Sudah Mengklaim Upah Nguli Hari Ini\nSilakan Tunggu ${timers} Lagi`
    );
};
handler.help = ["nguli"];
handler.tags = ["rpg"];
handler.command = /^(nguli)$/i;
handler.group = true;
handler.fail = null;
handler.exp = 0;
handler.register = true;
module.exports = handler;

function clockString(ms) {
  let d = isNaN(ms) ? "--" : Math.floor(ms / 86400000);
  let h = isNaN(ms) ? "--" : Math.floor(ms / 3600000) % 24;
  let m = isNaN(ms) ? "--" : Math.floor(ms / 60000) % 60;
  let s = isNaN(ms) ? "--" : Math.floor(ms / 1000) % 60;
  return [
    "\n" + d,
    " *Hari*\n ",
    h,
    " *Jam*\n ",
    m,
    " *Menit*\n ",
    s,
    " *Detik* ",
  ]
    .map((v) => v.toString().padStart(2, 0))
    .join("");
}
