// Thanks To Kasan

let didyoumean = require("didyoumean");
let similarity = require("similarity");

let handler = (m) => m;

handler.before = function (m, { match, usedPrefix, text, args }) {
  if ((usedPrefix = (match[0] || "")[0])) {
    let noPrefix = m.text.replace(usedPrefix, "").trim();
    let args = noPrefix.trim().split` `.slice(1);
    let alias = Object.values(global.plugins)
      .filter((v) => v.help && !v.disabled)
      .map((v) => v.help)
      .flat(1);
    if (alias.includes(noPrefix)) return;
    let mean = didyoumean(noPrefix, alias);
    let sim = similarity(noPrefix, mean);
    let som = sim * 100;
    let tio = `• Halo Kak @${
      m.sender.split`@`[0]
    }  Apakah Anda sedang mencari ${usedPrefix + mean} ? 

 ◦ Nama menu: *${usedPrefix + mean}* 
 ◦ Kempiripan: *${parseInt(som)}%*`;
    if (mean) {
      conn.sendMessage(m.chat, {
        video: {
          url: "https://ik.imagekit.io/lui/2024-01-06_04_08_36__0000_UTC",
        },
        gifPlayback: true,
        caption: tio,
        contextInfo: {
          externalAdReply: {
            title: global.namebot,
            body: global.author,
            thumbnailUrl:
              "https://ik.imagekit.io/lui/2024-01-06_04_01_36__0000_UTC",
            sourceUrl: `https://whatsapp.com/channel/0029VaVBuaxDp2Q8rF40N532`,
            mediaType: 1,
            renderLargerThumbnail: true,
          },
        },
      });
    }
  }
};

module.exports = handler;
