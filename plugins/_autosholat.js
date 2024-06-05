const axios = require("axios");
const Jimp = require("jimp");
const fs = require("fs");

const groupChatId = "120363030802045036@g.us";

async function sendBroadcast() {
  let lokasi = "malang";
  let jdwl = await jadwalsholat(lokasi);

  const date = new Date(
    new Date().toLocaleString("en-US", { timeZone: "Asia/Jakarta" })
  );
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const timeNow = `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}`;

  for (const [sholat, waktu] of Object.entries(jdwl)) {
    if (timeNow === waktu) {
      await image(
        jdwl.shubuh,
        jdwl.dhuhur,
        jdwl.ashar,
        jdwl.maghrib,
        jdwl.isya,
        lokasi
      );
      await conn.sendMessage(groupChatId, {
        audio: { url: "https://media.vocaroo.com/mp3/1ofLT2YUJAjQ" },
        mimetype: "audio/mp4",
        ptt: true,
        contextInfo: {
          externalAdReply: {
            showAdAttribution: true,
            mediaType: 1,
            mediaUrl: "",
            title: `Selamat menunaikan Ibadah Sholat ${sholat}`,
            body: `🕑 ${waktu}`,
            sourceUrl: "",
            thumbnail: await fs.promises.readFile("./src/jdw.png"),
            renderLargerThumbnail: true,
          },
        },
      });
      fs.promises.unlink("./src/jdw.png");
      break;
    }
  }
}

async function jadwalsholat(kota) {
  try {
    const { data } = await axios.get(
      `https://api.aladhan.com/v1/timingsByCity?city=${kota}&country=Indonesia&method=8`
    );
    const result = {
      shubuh: data.data.timings.Fajr,
      dhuhur: data.data.timings.Dhuhr,
      ashar: data.data.timings.Asr,
      maghrib: data.data.timings.Maghrib,
      isya: data.data.timings.Isha,
    };
    return result;
  } catch (e) {
    console.error("Error fetching prayer times:", e);
    return {};
  }
}

async function image(sh, dh, as, ma, is, lok) {
  try {
    const image = await Jimp.read(
      "https://telegra.ph/file/5126583c980ec585aa2ef.png"
    );
    const font = await Jimp.loadFont(Jimp.FONT_SANS_64_WHITE);
    const wil = await Jimp.loadFont(Jimp.FONT_SANS_64_BLACK);

    image.print(font, 550, 223, sh);
    image.print(font, 550, 321, dh);
    image.print(font, 550, 392, as);
    image.print(font, 550, 481, ma);
    image.print(font, 550, 571, is);
    image.print(wil, 870, 391, lok);

    await image.writeAsync("./src/jdw.png");
  } catch (e) {
    console.error("Error generating image:", e);
  }
}

// Set interval to check every hour (3600000 ms)
setInterval(sendBroadcast, 3600000);

module.exports = { sendBroadcast, disabled: false };
