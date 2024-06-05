const axios = require("axios");
const cheerio = require("cheerio");

let handler = async (m, { conn, text }) => {
  if (!text)
    throw `Masukan Nama Manganya!!\nExample : ${usedPrefix}manga One Piece`;
  try {
    m.reply("Searching...");
    let res = await Manga(text);
    res = res.map(
      (v) =>
        `*Title:* ${v.title}\n*Type:* ${v.type}\n*Volum:* ${v.vol}\n*Score:* ${v.score}\n*Thumbnail:* ${v.thumbnail}\n*Link:* ${v.link}`
    ).join`\n\n°°°°°°°°°°°°°°°°°°°°°°°°°°°°°\n\n`;
    conn.reply(m.chat, res, m);
  } catch (e) {
    conn.sendFile(m.chat, eror, "anu.mp3", null, m, true, {
      type: "audioMessage",
      ptt: true,
    });
  }
};

handler.help = ["manga"];
handler.tags = ["anime"];
handler.command = /^(manga)$/i;
handler.limit = true;
handler.register = true;
module.exports = handler;

async function Manga(manga) {
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await axios.get(
        "https://myanimelist.net/manga.php?q=" + manga + "&cat=manga"
      );
      let results = [];
      var $ = cheerio.load(data);
      $("div.js-categories-seasonal > table").each((i, u) => {
        for (let i = 1; i < 10; i++) {
          let b = $(u).find("td.borderClass:nth-child(2)")[i];
          let c = $(u).find("td.borderClass:nth-child(3)")[i];
          let d = $(u).find("td.borderClass:nth-child(4)")[i];
          let e = $(u).find("td.borderClass:nth-child(5)")[i];
          let f = $(u).find("td.borderClass:nth-child(1)")[i];
          let link = $(b).find("a:nth-child(2)").attr("href");
          if (typeof link === "undefined") return;
          results.push({
            title: $(b).find("a.hoverinfo_trigger > strong").text(),
            type: $(c).text().trim(),
            vol: $(d).text().trim(),
            score: $(e).text().trim(),
            link: link,
            thumbnail: $(f).find("a.hoverinfo_trigger > img").attr("data-src"),
          });
        }
      });
      if (results.every((x) => x === undefined))
        return { mess: "No result found" };
      resolve(results);
    } catch (error) {
      console.error(error.toString());
    }
  });
}
