let handler = async (m, { conn }) => {
  let user = global.db.data.users[m.sender]
  const caption = `
▧「 *B A N K  U S E R* 」
│ *Name:* ${user.registered ? user.name : conn.getName(m.sender)}
│ *Atm:* ${user.atm > 0 ? 'Level ' + user.atm : 'Tidak Punya'}
│ *Bank:* Rp.${user.fullatm ? '' + user.fullatm : '0'}
│ *Money:* ${user.money} 💲
└─────────────────────────···
`.trim()
  conn.sendMessage(m.chat, { image: { url: 'https://en.pimg.jp/071/200/649/1/71200649.jpg' }, caption: caption }, {quoted: m })
}
handler.help = ['bank']
handler.tags = ['rpg']
handler.command = /^(bank)$/i
handler.fail = null
handler.exp = 0
handler.register = true
module.exports = handler
