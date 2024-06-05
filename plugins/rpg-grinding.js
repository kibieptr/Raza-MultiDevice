let handler = async (m, { conn, usedPrefix }) => {
  let user = global.db.data.users[m.sender];
  let __timers = new Date() - user.lastngewe;
  let _timers = 7200000 - __timers;
  let timers = clockString(_timers);
  let name = await conn.getName(m.sender);

  if (user.stamina < 30)
    return m.reply(
      `Stamina Kamu Tidak Cukup\nHarap Isi Stamina Kamu Dengan *${usedPrefix}eat`
    );
  if (user.lastngewe > 7200000)
    throw m.reply(`Kamu Masih Kelelahan\nHarap Tunggu ${timers} Lagi`);

  let rndm1 = `${Math.floor(Math.random() * 5)}`;
  let rndm2 = `${Math.floor(Math.random() * 10)}`;
  let rndm3 = `${Math.floor(Math.random() * 7)}`;
  let rndm4 = `${Math.floor(Math.random() * 4)}`;
  let rndm5 = `${Math.floor(Math.random() * 200)}`;
  let rndm6 = `${Math.floor(Math.random() * 200)}`;
  let rndm7 = `${Math.floor(Math.random() * 20)}`;
  let rndm8 = `${Math.floor(Math.random() * 100)}`;
  let rndm9 = `${Math.floor(Math.random() * 100)}`.trim();

  let ran1 = rndm1 * 10;
  let ran2 = rndm2 * 10;
  let ran3 = rndm3 * 10;
  let ran4 = rndm4 * 10;
  let ran5 = rndm5 * 10;
  let ran6 = rndm6 * 10;
  let ran7 = rndm7 * 10;
  let ran8 = rndm8 * 10;
  let ran9 = rndm9 * 10;
  let ran10 = rndm2 * 30;

  let hmsil1 = `${ran1}`;
  let hmsil2 = `${ran2}`;
  let hmsil3 = `${ran3}`;
  let hmsil4 = `${ran4}`;
  let hmsil5 = `${ran5}`;
  let hmsil6 = `${ran6}`;
  let hmsil7 = `${ran7}`;
  let hmsil8 = `${ran8}`;
  let hmsil9 = `${ran9}`;
  let hmsi20 = `${ran10}`

  let jln = `
      
      ${name} 
      Mohon Tunggu....
      `;

  let jln2 = `
      
      ${name} 
      Menemukan Area Grinding ....
      `;

  let jln3 = `
      
      ${name} 
      Mulai Grinding......
      `;

  let jln4 = `
      
      ${name}
      Menerima Hasil....
      `;

  let hsl = `
  *Hasil Dari Grinding ${name}*
  
  *➲️   ️ 💎 = [ ${hmsil1} ] DIAMOND*
  *➲   ️ 🧇 = [ ${hmsil2} ] IRON*
  *➲   ️ 💥 = [ ${hmsil9} ] EXP*
  *➲   ️ 💲 = [ ${hmsi20} ] MONEY*
    
  Stamina Kamu Berkurang -20
  `;

  user.diamond += hmsil1;
  user.iron += hmsil2;
  user.exp += hmsil9;
  user.money += hmsi20;
  user.stamina -= 30;

  setTimeout(() => {
    conn.reply(m.chat, hsl, m);
  }, 27000);

  setTimeout(() => {
    conn.reply(m.chat, jln4, m);
  }, 25000);

  setTimeout(() => {
    conn.reply(m.chat, jln3, m);
  }, 20000);

  setTimeout(() => {
    conn.reply(m.chat, jln2, m);
  }, 15000);

  setTimeout(() => {
    conn.reply(m.chat, jln, m);
  }, 10000);

  setTimeout(() => {
    conn.reply(m.chat, `${name} Mencari Area Grinding.....`, m);
  }, 0);
  user.lastgrab = new Date() * 1;
};
handler.help = ["grinding"];
handler.tags = ["rpg"];
handler.command = /^(grinding)$/i;
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
