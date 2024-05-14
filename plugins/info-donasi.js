let fetch = require("node-fetch");

let handler = async (m, { conn, command }) => {
  let buffer = await fetch(
    `https://telegra.ph/file/6350e0b24bc2335704e88.jpg`
  ).then((res) => res.buffer());
  conn.sendFile(
    m.chat,
    buffer,
    "hasil.jpg",
    `*Scan QR diatas untuk donasi*
*Untuk Via Ewallet/Bank Bisa Chat Owner*`,
    m
  );
};

handler.help = handler.command = ["donasi"];
handler.tags = ["main"];
handler.register = true;
module.exports = handler;
