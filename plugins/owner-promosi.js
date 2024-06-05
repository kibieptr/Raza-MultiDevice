let handler = async (m, { conn, text, usedPrefix, command }) => {
  let panel = `*==> 📮 RAZA STORE BY RAZABOTS 📮 <===*\n
*RAZA STORE* Menyediakan berbagai kebutuhan digital murah dah berkualitas  ✅\n
*===> LIST <===*
📮 _RDP & VPS_
📮 _Panel Digital Ocean_
📮 _Panel Linode_
📮 _Panel Vultr_
📮 _Domain_
📮 _Youtube Premium_
📮 _Spotify_
📮 _Netflix_
📮 _Disney Hotstar_
📮 _Premium Lainnya_
📮 _Nitro Discord_
📮 _Dev Badge_
📮 _Booster Server_
📮 _Activity Costum_
📮 _Product Lainnya_

*===> CONTACT PERSON <===*
info lebih lanjut bisa hubungi nomor ini:
wa.me/6281529762099`;
  conn.reply(m.chat, panel, null);
};
handler.customPrefix = /^promosi$/i;
handler.command = new RegExp();
handler.owner = true;
module.exports = handler;
