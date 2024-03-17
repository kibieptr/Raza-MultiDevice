let handler = async (m, { conn, text, usedPrefix, command }) => {
  let panel = `*==> 📮 OPEN PANEL PETRODATYL <===*
*RAZA STORE* Menyediakan Panel hosting bot WhatsApp murah dah berkualitas  ✅

*INFO PANEL:*
https://chat.whatsapp.com/JH9qs0DTDpF24c8w4kYqzp

*===> RAM LIST <===*
📮 _RAM 1GB/CPU 30%= 1K_
📮 _RAM 2GB/CPU 60%=2K_
📮 _RAM 3GB/CPU 80%=3K_
📮 _RAM 4GB/CPU 110%=4K_
📮 _RAM 5GB/CPU 140%=5K_
📮 _RAM 6GB/CPU 170%=6K_
📮 _RAM 7GB/CPU 185%=7K_
📮 _RAM 8GB/CPU 190%=8K_
📮 _RAM UNLI/CPU UNLI=15K_

*_SEMUA LIST BERLAKU 1 BULAN_*
*_( Replace 1x Garansi 5 hari )_*

*===> KEUNTUNGAN  <===*
*• ✅ MEMBUAT RUNTIME BOT MENJADI AWET*
*• ✅ ANTI LEMOT*
*• ✅ MUDAH UNTUK DIGUNAKAN*

*===> CONTACT PERSON <===*
info lebih lanjut bisa hubungi nomor ini:
wa.me/6287739924485`;
  conn.reply(m.chat, panel, null);
};
handler.customPrefix = /^promosi$/i;
handler.command = new RegExp();
handler.owner = true;
module.exports = handler;
