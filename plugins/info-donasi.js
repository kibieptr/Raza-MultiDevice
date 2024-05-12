let fetch = require("node-fetch");

let handler = async (m, { conn, command }) => {
  let buffer = await fetch(
    `https://telegra.ph/file/664a48587a051671db042.jpg`
  ).then((res) => res.buffer());
  conn.sendFile(
    m.chat,
    buffer,
    "hasil.jpg",
    `*Jika telah melakukan pembayaran silahkan kirimkan bukti pembayaran ke WhatsApp Owner.*`,
    m
  );
};

handler.help = handler.command = ["donasi"];
handler.tags = ["main"];
handler.register = true;
module.exports = handler;
