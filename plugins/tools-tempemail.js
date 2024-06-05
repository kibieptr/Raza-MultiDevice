const axios = require('axios');

let handler = async (m, { conn, text, usedPrefix }) => {
    try {
        // Mendapatkan email sementara dari API 1secmail
        const response = await axios.get('https://www.1secmail.com/api/v1/?action=genRandomMailbox&count=1');
        const tempEmail = response.data[0];

        // Mengirim pesan dengan email sementara
        await conn.sendMessage(m.chat, { text: `Here is your temporary email: ${tempEmail}` }, { quoted: m });
    } catch (e) {
        throw 'Error fetching temporary email';
    }
}

handler.command = handler.help = ['tempemail'];
handler.tags = ['tools'];
handler.exp = 0;
handler.limit = true;
handler.premium = false;
handler.register = true;

module.exports = handler;
