const axios = require('axios');
const { MessageType } = require('@adiwajshing/baileys'); // Menambahkan import untuk MessageType

let handler = async (m, { conn }) => {
    try {
        // Mengambil data pengguna acak dari API
        const response = await axios.get('https://randomuser.me/api/');
        const userData = (await response.json()).results[0]; // Menggunakan response.json() untuk mengambil data

        // Mendapatkan informasi pengguna
        const name = `${userData.name.first} ${userData.name.last}`;
        const email = userData.email;
        const phone = userData.phone;
        const gender = userData.gender;
        const country = userData.location.country;
        const street = userData.location.street.name;

        // Membuat pesan dengan informasi pengguna
        const message = `Nama: ${name}\nEmail: ${email}\nPhone: ${phone}\nGender: ${gender}\nCountry: ${country}\nStreet: ${street}`;

        // Mengirim pesan dengan informasi pengguna
        await conn.sendMessage(m.chat, message, MessageType.text);
    } catch (e) {
        // Menangani error saat mengambil data pengguna
        throw 'Gagal mengambil data pengguna.';
    }
};

handler.command = handler.help = ['randomuser'];
handler.tags = ['tools'];
handler.exp = 0;
handler.limit = true;
handler.premium = false;
handler.register = true;

module.exports = handler;
