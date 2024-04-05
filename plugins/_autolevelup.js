const db = require('../lib/database.js');
const { canLevelUp } = require('../lib/levelling.js');
const can = require('knights-canvas');

async function before(m) {
    let user = global.db.data.users[m.sender];
    if (!user.autolevelup)
        return !0;
    let before = user.level * 1;
    while (canLevelUp(user.level, user.exp, global.multiplier))
        user.level++;

    if (user.level <= 2) {
        user.role = 'Newbie ㋡';
    } else if (user.level <= 4) {
        user.role = 'Beginner Grade 1 ⚊¹';
    } else if (user.level <= 6) {
        user.role = 'Beginner Grade 2 ⚊²';
    } else if (user.level <= 8) {
        user.role = 'Beginner Grade 3 ⚊³';
    } else if (user.level <= 10) {
        user.role = 'Beginner Grade 4 ⚊⁴';
    } // and so on for all role conditions

    if (before !== user.level) {
        let ini_txt = `Selamat, Kamu Telah Naik Level!\n\n• Level Up : *${before}* -> *${user.level}*`.trim();
        try {
            let image, data, pp;
            try {
                pp = await this.profilePictureUrl(m.sender, 'image');
            } catch {
                pp = 'https://i.ibb.co/m53WF9N/avatar-contact.png';
            }
            image = await new can.Up().setAvatar(pp).toAttachment();
            data = image.toBuffer();
            await this.sendMessage(m.chat, { image: data, caption: ini_txt }, { quoted: m });
        } catch {
            await m.reply(ini_txt);
        }
    }
}

module.exports = { before, disabled: false };
