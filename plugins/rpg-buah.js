let handler = async (m, { conn, usedPrefix, text }) => {
  let user = global.db.data.users[m.sender];
  let ini_txt = `[ *GUDANG BUAH KAMU* ]\n\n`;
  ini_txt += `${user.pisang} Pisang\n`;
  ini_txt += `${user.anggur} Anggur\n`;
  ini_txt += `${user.mangga} Mangga\n`;
  ini_txt += `${user.jeruk} Jeruk\n`;
  ini_txt += `${user.apel} Apel\n\n`;
  ini_txt += `Ketik *${usedPrefix}pasar jual [barang yang ingin di jual]* Untuk Menjual.`;
  m.reply(ini_txt);
};

handler.menufun = ["buah"];
handler.tagsfun = ["rpg"];
handler.command = /^(buah|fruits)$/i;
handler.group = true;
handler.fail = null;
handler.register = true;
handler.exp = 0;

module.exports = handler;
