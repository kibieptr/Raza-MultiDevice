let handler = async (m, { conn }) => {

const p = "Minimal salam Jan PP mulu";
conn.reply(m.chat, p, m) 
}
handler.customPrefix = /^(p)$/i
handler.tags = ['main']
handler.command = new RegExp();
handler.register = true;
module.exports = handler