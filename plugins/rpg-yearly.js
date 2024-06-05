const free = 50;
const prem = 100;
const limitfree = 50;
const limitprem = 100;
const moneyfree = 50000;
const moneyprem = 100000;

let handler = async (m, { isPrems }) => {
  let time = global.db.data.users[m.sender].lasttahunan + 31557600000;
  if (new Date() - global.db.data.users[m.sender].lasttahunan < 31557600000)
    throw `Kamu Sudah Mengambilnya Dibulan Ini\nTunggu Selama ${msToTime(
      time - new Date()
    )} Lagi`;
  global.db.data.users[m.sender].exp += isPrems ? prem : free;
  global.db.data.users[m.sender].money += isPrems ? moneyprem : moneyfree;
  global.db.data.users[m.sender].limit += isPrems ? limitprem : limitfree;
  conn.reply(
    m.chat,
    `Selamat Kamu Mendapatkan:\n\n+${isPrems ? prem : free} Exp\n+${
      isPrems ? moneyprem : moneyfree
    } Money\n+${isPrems ? limitprem : limitfree} Limit`,
    m
  );
  global.db.data.users[m.sender].lasttahunan = new Date() * 1;
};
handler.help = ["tahunan"];
handler.tags = ["rpg"];
handler.command = /^(tahunan)$/i;
handler.group = true;
handler.fail = null;
handler.exp = 0;
handler.limit = 5;
handler.register = true;
module.exports = handler;

function msToTime(duration) {
  var milliseconds = parseInt((duration % 1000) / 100),
    seconds = Math.floor((duration / 1000) % 60),
    minutes = Math.floor((duration / (1000 * 60)) % 60),
    hours = Math.floor((duration / (1000 * 60 * 60)) % 24),
    monthly = Math.floor((duration / (1000 * 60 * 60 * 24)) % 720);

  monthly = monthly < 10 ? "0" + monthly : monthly;
  hours = hours < 10 ? "0" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;

  return monthly + " Hari " + hours + " Jam " + minutes + " Menit";
}
