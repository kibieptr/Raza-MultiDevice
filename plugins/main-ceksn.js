const { createHash } = require('crypto')
let Reg = /\|?(.*)([.|] *?)([0-9]*)$/i
let handler = async function (m, { conn, text, usedPrefix }) {
  let sn = createHash('md5').update(m.sender).digest('hex')

m.reply(`*Serial Nomor:* ${sn}\nUntuk Unreg Ketik .unreg NoSNkamu`)
}

handler.help = ['ceksn']
handler.tags = ['main']
handler.command = /^(ceksn)$/i
handler.register = true
module.exports = handler