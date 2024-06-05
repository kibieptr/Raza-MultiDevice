const axios = require("axios");
const uploadImage = require("../lib/uploadImage");

let handler = async (m, { conn, usedPrefix, command, text }) => {
  conn.toanime = conn.toanime ? conn.toanime : {};
  if (m.chat in conn.toanime) {
    return m.reply(
      "_Mohon Tunggu Sebentar, Masih Ada Proses Yang Belum Selesai Di Foto Sebelumnya_"
    );
  }
  let q = m.quoted ? m.quoted : m;
  let mime = (q.msg || q).mimetype || "";
  if (!mime) throw "Send Foto Dengan Caption .toanime";
  m.reply(wait);
  let media = await q.download();
  let url = await uploadImage(media);
  conn["toanime"][m.chat] = true;
  try {
    const openAIResponse = await processImageAndUpload(media);

    if (openAIResponse) {
      const result = openAIResponse;
      const tag = `@${m.sender.split("@")[0]}`;

      await conn.sendMessage(
        m.chat,
        {
          image: {
            url: result,
          },
          caption: `_Succes To Anime Style_`,
          mentions: [m.sender],
        },
        {
          quoted: m,
        }
      );
    } else {
      console.log("Tidak ada respons dari OpenAI atau terjadi kesalahan.");
    }
  } catch (e) {
    conn.sendFile(m.chat, eror, "anu.mp3", null, m, true, {
      type: "audioMessage",
      ptt: true,
    });
  }
  delete conn.toanime[m.chat];
};
handler.command = /^(toanime2|jadianime2)$/i;
handler.help = ["toanime2"];
handler.tags = ["maker"];
handler.premium = false;
handler.limit = true;
handler.register = true;
module.exports = handler;

async function processImageAndUpload(buffer) {
  try {
    const base64String = Buffer.from(buffer, "binary").toString("base64");

    const apiResponse = await axios.post(
      "https://www.drawever.com/api/photo-to-anime",
      {
        data: `data:image/png;base64,${base64String}`,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return (
      "https://www.drawever.com" + apiResponse.data.urls[1] ||
      "https://www.drawever.com" + apiResponse.data.urls[0]
    );
  } catch (error) {
    throw error;
  }
}
