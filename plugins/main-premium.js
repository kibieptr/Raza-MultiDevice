let handler = async (m, { conn, usedPrefix, command }) => {
  let pre = `*≡ UPGRADE REMIUM*\n
▢ Premium User
  *10K* = 30 Hari
  *25K* = Permanen
Keutungan : _Membuka semua perintah premium & Limit Unlimitied_

▢ Premium + Sewa Bot Ke Grup 1 Bulan *25K*
Keutungan : _Kamu mendapatkan premium dan bot bergabung dengan sebuah grup_`;
  let img = "https://telegra.ph/file/3a34bfa58714bdef500d9.jpg";
  //conn.sendButton(m.chat, pre, msg.ig(), img, [['✆ Owner', `${usedPrefix}fgowner`]],m)
  conn.sendFile(m.chat, img, "img.jpg", pre, m, null);
};
handler.help = ["premium"];
handler.tags = ["main"];
handler.command = ["premium"];

module.exports = handler;
