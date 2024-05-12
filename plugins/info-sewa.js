let handler = async (m, { conn }) => {
    let sewa = `
    ❏──「 *Sewa* 」
    │ • *1 Minggu:* 5K
    │ • *1 Bulan:* 10K
    │ • *Permanen:* 30K
    ┠──「   *Pembayaran*    」
    │ •  Ovo - Gopay - Dana
    ❏──────────────๑
    `
    conn.reply(m.chat, sewa, m)
    }
    handler.help = ['sewa']
    handler.tags = ['main']
    handler.command = /^(donasi|sewa|prem|premium)$/i
    handler.fail = null
    handler.exp = 0
    handler.register = true
    module.exports = handler
    