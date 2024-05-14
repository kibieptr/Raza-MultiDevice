let fetch = require("node-fetch");
let handler = async (m, { conn }) => {
  try {
    let text = `
🛡️ *RULES PENGGUNA BOT* 🤖

• Jangan spam bot jika bot tidak merespons *(Ban 1 hari hingga permanen)*
• Jangan panggil bot *(Auto Blokir)*

🔹 *ATURAN DI GRUP* 🔹
• Jangan spam dan memakai fitur tag sembarangan *(Sanksi peringatan 1)*
• Dilarang mengirimkan tautan ke grup lain *(Sanksi kick)*
• Bot akan keluar secara otomatis jika masa sewa berakhir/pengguna sewa tidak berada di grup

🔸 *ATURAN UNTUK PREMIUM* 🔸
- Pengguna Premium hanya dapat menambahkan bot ke maksimal 2 grup
- Pengguna Premium hanya dapat menggunakan Premlimit/premexp maksimal 5 kali/hari (menghindari keterlambatan/ke lambanan pada bot)

🔻 *ATURAN UNTUK MODERATOR* 🔻
- Pengguna Moderator hanya dapat menambahkan bot ke maksimal 5 grup
- Pengguna Moderator hanya dapat menggunakan addlimit/addxp maksimal 5 kali/hari (menghindari keterlambatan/ke lambanan pada bot)
- Pengguna Moderator dilarang mengeluarkan larangan terhadap pengguna kecuali ada izin/alasan yang jelas

📜 Aturan di atas bersifat Opsional dan bisa saja diganti dengan kebijakan owner sendiri.
`.trim();

    conn.reply(m.chat, text, m);
  } catch (error) {
    console.error(error);
    throw error; // Biar tau kenapa error
  }
};

handler.tags = ["main"];
handler.command = /^(rules|rule)$/i;
handler.help = ["rules"];
module.exports = handler;
