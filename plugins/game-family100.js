let fetch = require("node-fetch");
const winScore = 4999;
async function handler(m) {
  let imgr =
    "https://www6.flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=sketch-name&doScale=true&scaleWidth=800&scaleHeight=500&fontsize=100&fillTextType=1&fillTextPattern=Warning!&text=";

  this.familygame = this.familygame ? this.familygame : {};
  let id = "family100_" + m.chat;
  if (id in this.familygame) {
    this.reply(
      m.chat,
      "Masih ada kuis yang belum terjawab di chat ini",
      this.familygame[id].msg
    );
    throw false;
  }
  const json = await family100();
  let caption = `
*Soal:* ${json.soal}
Terdapat *${json.jawaban.length}* jawaban${
    json.jawaban.find((v) => v.includes(" "))
      ? `
(beberapa jawaban terdapat spasi)
`
      : ""
  }
+${winScore} XP tiap jawaban benar
    `.trim();
  this.familygame[id] = {
    id,
    msg: await this.sendFile(m.chat, imgr + "Family100", "", caption, m),
    ...json,
    terjawab: Array.from(json.jawaban, () => false),
    winScore,
  };
}
handler.help = ["family100"];
handler.tags = ["game"];
handler.command = /^family100$/i;
handler.group = true;
handler.register = true;
module.exports = handler;
