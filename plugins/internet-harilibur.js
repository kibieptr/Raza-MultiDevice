let handler = async (m, { conn, text, usedPrefix, command }) => {
  m.reply(wait);
  let molor = await scraper.HariLibur();

  let list = molor.libnas_content
    .map((a, index) => `*${index + 1}* ${a.summary}\nTanggal: ${a.dateMonth}`)
    .join("\n\n");
  const hasil = `*H A R I   L I B U R*
*Hari libur mendatang:* ${molor.nextLibur}

*LIST HARI LIBUR ${new Date().getFullYear()}*

${list}`;
  m.reply(hasil);
};
handler.help = ["harilibur"].map((a) => a + " *[get hari libur]*");
handler.tags = ["internet", "main"];
handler.command = ["harilibur"];
module.exports = handler;
