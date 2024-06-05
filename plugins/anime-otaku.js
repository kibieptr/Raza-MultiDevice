const axios = require("axios");
const cheerio = require("cheerio");

let handler = async (m, { conn, text }) => {
  if (!text) throw `Masukan Judulnyaa!!\nExample : ${usedPrefix}One Piece`;
  try {
    m.reply("Searching...");
    let res = await otakudesu(text);
    let otakuinfo = `• *Judul:* ${res.judul}
• *Romaji:* ${res.jepang}
• *Rating*: ${res.rate}
• *Produser*: ${res.produser}
• *Type*: ${res.tipe}
• *Status*: ${res.status}
• *Episode*: ${res.episode}
• *Durasi*: ${res.durasi}
• *Rilis*: ${res.rilis}
• *Studio*: ${res.studio}
• *Genre*: ${res.genre}
• *Batch*: ${res.batch}
• *Desc*: ${res.desc}`;
    conn.sendFile(m.chat, res.img, "otaku.jpeg", otakuinfo, m);
  } catch (e) {
    m.reply(`Terjadi Kesalahan, Judul Yang Kamu Cari Tidak Dapat Di Temukan`);
  }
};
handler.help = ["otakudesu"];
handler.tags = ["anime"];
handler.command = /^(otakudesu)$/i;
handler.limit = true;
handler.register = true;
module.exports = handler;

async function otakudesu(judul) {
  return new Promise(async (resolve, reject) => {
    axios
      .get("https://otakudesu.cloud/?s=" + judul + "&post_type=anime")
      .then(({ data }) => {
        const $ = cheerio.load(data);
        const result = {};
        let limk = $(
          "#venkonten > div > div.venser > div > div > ul > li:nth-child(1) > h2 > a"
        ).attr("href");
        axios.get(limk).then(({ data }) => {
          const $$ = cheerio.load(data);
          result.message = "By Razabots";
          result.img = $$("#venkonten > div.venser > div.fotoanime")
            .find("img")
            .attr("src");
          $$(
            "#venkonten > div.venser > div.fotoanime > div.infozin > div"
          ).each(function (a, b) {
            result.judul = $$(b)
              .find("p:nth-child(1)")
              .text()
              .replace("Judul: ", "");
            result.jepang = $$(b)
              .find("p:nth-child(2)")
              .text()
              .replace("Japanese: ", "");
            result.rate = $$(b)
              .find("p:nth-child(3)")
              .text()
              .replace("Skor: ", "");
            result.produser = $$(b)
              .find("p:nth-child(4)")
              .text()
              .replace("Produser: ", "");
            result.tipe = $$(b)
              .find("p:nth-child(5)")
              .text()
              .replace("Tipe: ", "");
            result.status = $$(b)
              .find("p:nth-child(6)")
              .text()
              .replace("Status: ", "");
            result.episode = $$(b)
              .find("p:nth-child(7)")
              .text()
              .replace("Total Episode: ", "");
            result.durasi = $$(b)
              .find("p:nth-child(8)")
              .text()
              .replace("Durasi: ", "");
            result.rilis = $$(b)
              .find("p:nth-child(9)")
              .text()
              .replace("Tanggal Rilis: ", "");
            result.studio = $$(b)
              .find("p:nth-child(10)")
              .text()
              .replace("Studio: ", "");
            result.genre = $$(b)
              .find("p:nth-child(11)")
              .text()
              .replace("Genre: ", "");
            result.desc =
              $$("#venkonten > div.venser > div.fotoanime > div.sinopc")
                .text()
                .replace(".", "\n") +
              $$(b).find("div.sinopc > p:nth-child(2)").text();
            result.batch = $$(
              "#venkonten > div.venser > div:nth-child(10) > ul > li > span:nth-child(1) > a"
            ).attr("href");
          });
          const lim = $$(
            "#venkonten > div.venser > div:nth-child(10) > ul > li > span:nth-child(1) > a"
          ).attr("href");
          axios.get(lim).then(({ data }) => {
            const $$$ = cheerio.load(data);
            result.batchSD = $$$(
              "#venkonten > div:nth-child(6) > ul > li:nth-child(1) > a:nth-child(3)"
            ).attr("href");
            result.batchHD = $$$(
              "#venkonten > div:nth-child(6) > ul > li:nth-child(3) > a:nth-child(3)"
            ).attr("href");
            resolve(result);
          });
        });
      })
      .catch(reject);
  });
}
