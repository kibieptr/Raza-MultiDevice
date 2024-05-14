let handler = async (m, { conn, text, usedPrefix, command }) => {
  m.reply(wait);
  let cerpen = await Scraper.Random.randomCerpen();
  let { status, judul, penulis, sumber, cerita } = cerpen;
  if (status !== true) throw `*cerpen not found*`;
  let hasil = `*± R A N D O M   C E R P E N*
================================
*°Title:* ${judul}
*°Source:* ${sumber}
*°Author:* ${penulis}
================================
${cerita}
`;
  conn.reply(m.chat, hasil, m);
};
handler.limit = true;
handler.help = ["cerpen"].map((a) => a + " *[random cerpen]*");
handler.tags = ["internet"];
handler.command = ["cerpen"];
handler.register = true;
module.exports = handler;
module.exports = handler;
