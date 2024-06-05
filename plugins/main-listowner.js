

let handler = async (m, { conn }) => {
  let owner = global.owner.map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').filter(v => v != conn.user.jid)
  conn.reply(m.chat, `「 List Owner 」` + `\n` + owner.map(v => '- @' + v.replace(/@.+/, '')).join`\n`, m, { contextInfo: { mentionedJid: owner } })
}
handler.help = ['listowner']
handler.tags = ['main']
handler.command = /^(listowner)$/i
handler.register = true

module.exports = handler