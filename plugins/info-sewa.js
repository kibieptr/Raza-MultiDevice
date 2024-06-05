let handler = async (m, { conn }) => {
  let sewa = `
❏──「 *Sewa Bot* 」
│ • *1 Bulan:* 5K
│ • *3 Bulan:* 10K
│ • *6 Bulan:* 20K
| • *Permanent:* 50K
┠──「   *Pembayaran*    」
│ Ovo - Gopay - Dana - BRI - JAGO
❏──────────────๑
`;
  conn.reply(m.chat, sewa, m);
};
handler.help = ["sewa"];
handler.tags = ["main"];
handler.command = /^(sewa)$/i;
handler.fail = null;
handler.exp = 0;
handler.register = true;
module.exports = handler;
