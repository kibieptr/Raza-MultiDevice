const util = require("util");
const path = require("path");

let handler = async (m, { conn }) => {
  conn.sendFile(
    m.chat,
    "https://bucin-livid.vercel.app/audio/sc1.mp3",
    "sc.mp3",
    null,
    m,
    true,
    {
      type: "audioMessage",
      ptt: true,
    }
  );
};
handler.help = ["sc", "sourcecode", "script"];
handler.tags = ["info", "main"];
handler.command = /^(sc|sourcecode|script)$/i;
handler.register = true;
module.exports = handler;
