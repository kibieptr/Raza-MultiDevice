let uploadFile = require("../lib/uploadFile.js");
const { exec } = require("child_process");

let handler = async (m, { conn, usedPrefix, command, text }) => {
  let who =
    m.mentionedJid && m.mentionedJid[0]
      ? m.mentionedJid[0]
      : m.fromMe
      ? conn.user.jid
      : m.sender;
  let name = await conn.getName(who);
  let q = m.quoted ? m.quoted : m;
  let mime = (q.msg || q).mimetype || "";
  if (!mime) throw `Video nya mana kak??`;
  m.reply("Tunggu Sebentar...");
  let media = await q.download();
  let url = await uploadFile(media);

  let output = "output.mp4"; // Nama file output

  // Menggunakan ffmpeg untuk meningkatkan resolusi video
  exec(
    `ffmpeg -i ${media} -s hd720 -c:a copy ${output}`,
    (error, stdout, stderr) => {
      if (error) {
        console.error(`Error: ${error.message}`);
        return;
      }
      console.log(`stdout: ${stdout}`);
      console.error(`stderr: ${stderr}`);

      // Mengunggah video yang telah ditingkatkan resolusinya
      conn.sendFile(m.chat, output, "", `🍟 Nih Kak`, m);
    }
  );
};

handler.help = ["vhd"];
handler.tags = ["tools"];
handler.command = /^(vhd|lb)$/i;
handler.limit = 10;

module.exports = handler;
