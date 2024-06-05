const axios = require("axios");
const cheerio = require("cheerio");

let handler = async (m, { conn, text }) => {
  if (!text) throw `Judulnya?`;
  try {
    let res = await komiku(text);
    let otakuinfo = `• *Title:* ${res.title}
• *Indo:* ${res.indo}
• *Update*: ${res.update}
• *Chapter Awal*: ${res.chapter_awal}
• *Chapter Akhir*: ${res.chapter_akhir}
• *Link*: ${res.link}
• *Desc*: ${res.desc}`;
    conn.sendFile(m.chat, res.image, "otaku.jpeg", otakuinfo, m);
  } catch (e) {
    m.reply(`Terjadi Kesalahan, Judul Yang Kamu Cari Tidak Dapat Di Temukan`);
  }
};
handler.help = ["komiku"];
handler.tags = ["anime"];
handler.command = /^(komiku)$/i;
handler.limit = true;
handler.register = true;
module.exports = handler;

async function komiku(judul) {
  return new Promise(async (resolve, reject) => {
    axios
      .get(
        "https://data.komiku.id/cari/?post_type=manga&s=" +
          encodeURIComponent(judul)
      )
      .then(({ data }) => {
        const $ = cheerio.load(data);
        const img = [];
        const or = [];
        const ind = [];
        const up = [];
        const des = [];
        const li = [];
        const ch = [];
        const ch1 = [];
        $("div.daftar").each(function (a, b) {
          img.push($(b).find("img").attr("data-src"));
          $("div.kan").each(function (c, d) {
            or.push($(d).find("h3").text().trim());
            ind.push($(d).find("span.judul2").text());
            li.push("https://komiku.id" + $(d).find("a").attr("href"));
            up.push($(d).find("p").text().trim().split(". ")[0]);
            des.push($(d).find("p").text().trim().split(". ")[1]);
            ch1.push($(d).find("div:nth-child(5) > a").attr("title"));
            $("div.new1").each(function (e, f) {
              ch.push($(f).find("a").attr("title"));
            });
          });
        });
        for (let i = 0; i < img.length; i++) {
          resolve({
            image: img[i],
            title: or[i],
            indo: ind[i],
            update: up[i],
            desc: des[i],
            chapter_awal: ch[i],
            chapter_akhir: ch1[i],
            link: li[i],
          });
        }
      })
      .catch(reject);
  });
}
