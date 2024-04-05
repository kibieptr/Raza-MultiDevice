let handler = async (m, { conn }) => {
    if (new Date - global.db.data.users[m.sender].lastclaim > 86400000) {
      conn.reply(m.chat, 'Selamat Kak, Kamu Mendapatkan: Rp.50000 Dari Admin', m)  
      global.db.data.users[m.sender].money += 50000
      global.db.data.users[m.sender].lastclaim = new Date * 1
    } else conn.reply(m.chat, 'Bilang Apa Hayoo??', m)
  }
handler.help = ['hadiah']
handler.tags = ['rpg']
handler.command = /^(hadiah)$/i
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = true
handler.private = false
handler.admin = false
handler.botAdmin = false
handler.limit = true
handler.fail = null
handler.exp = 0
handler.register = true
module.exports = handler