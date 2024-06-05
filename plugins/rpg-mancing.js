let handler = async (m, { conn }) => {
  global.db.data.users[m.sender].lastmemancing = global.db.data.users[m.sender].lastmemancing || 0;
  let randomaku = `${Math.floor(Math.random() * 101)}`.trim();
  let randomkamu = `${Math.floor(Math.random() * 81)}`.trim(); // hehe Biar Susah Menang :v
  let Aku = randomaku * 1;
  let Kamu = randomkamu * 1;
  let kbansos = "https://telegra.ph/file/afcf9a7f4e713591080b5.jpg";
  let mbansos = "https://telegra.ph/file/d31fcc46b09ce7bf236a7.jpg";
  let botol = global.wm;
  // let name = conn.getName(m.sender); // Corrected property access
  let __timers = new Date() - global.db.data.users[m.sender].lastmemancing;
  let _timers = 300000 - __timers;
  let timers = clockString(_timers);
  let user = global.db.data.users[m.sender];
  if (global.db.data.users[m.sender].fishingrod > 0) {
    if (new Date() - global.db.data.users[m.sender].lastmemancing > 300000) {
      let randomakuArray = Array.from({ length: 12 }, () => Math.floor(Math.random() * 10));
      let [rbrb1, rbrb2, rbrb3, rbrb4, rbrb5, rbrb6, rbrb7, rbrb8, rbrb9, rbrb10, rbrb11, rbrb12] = randomakuArray;

      let hsl = `
🎣 Hasil Mancing 🎣

 *Paus: ${rbrb1}*            
 *Kepiting: ${rbrb7}*
 *Gurita: ${rbrb2}*             
 *Cumi: ${rbrb3}*            
 *Buntal: ${rbrb9}*
 *Lumba: ${rbrb4}*             
 *Lobster: ${rbrb8}*
 *Hiu: ${rbrb6}*             
 *Udang: ${rbrb12}* 
 *Ikan: ${rbrb10}*
 *Orca: ${rbrb5}*             

Cek Kolam Ikan Mu Di .kolam
`;

      global.db.data.users[m.sender].paus += rbrb1;
      global.db.data.users[m.sender].kepiting += rbrb7;
      global.db.data.users[m.sender].gurita += rbrb2;
      global.db.data.users[m.sender].cumi += rbrb3;
      global.db.data.users[m.sender].buntal += rbrb9;
      global.db.data.users[m.sender].lumba += rbrb4;
      global.db.data.users[m.sender].lobster += rbrb8;
      global.db.data.users[m.sender].hiu += rbrb6;
      global.db.data.users[m.sender].udang += rbrb12;
      global.db.data.users[m.sender].ikan += rbrb10;
      global.db.data.users[m.sender].orca += rbrb5;

      setTimeout(() => {
        m.reply(`${hsl}`);
      }, 20000);

      setTimeout(() => {
        m.reply("Mendapatkan target!");
      }, 14000);

      setTimeout(() => {
        m.reply("Sedang memancing...");
      }, 0);
      global.db.data.users[m.sender].lastmemancing = new Date() * 1;
    } else {
      conn.reply(
        m.chat,
        `\n*Sepertinya Anda Sudah Kecapekan*\n*Silahkan Istirahat dulu sekitar ${timers}*\n*Untuk bisa melanjutkan memancing*\n`,
        m
      );
    }
  } else {
    m.reply("*[❗] Pastingan kamu mempunyai pancingan & umpan🎣*");
  }
};

handler.help = ["mancing"];
handler.tags = ["rpg"];
handler.command = /^(mancing|memancing|fishing)$/i;
handler.register = true
module.exports = handler;

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)];
}

function clockString(ms) {
  let h = Math.floor(ms / 3600000);
  let m = Math.floor(ms / 60000) % 60;
  let s = Math.floor(ms / 1000) % 60;
  return [h, m, s].map((v) => v.toString().padStart(2, 0)).join(":");
}
