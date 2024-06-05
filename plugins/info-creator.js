var name = global.nameowner;
var numberowner1 = global.numberowner1;
var numberowner2 = global.numberowner2;
var gmail = global.mail;
const {
  default: makeWASocket,
  BufferJSON,
  WA_DEFAULT_EPHEMERAL,
  generateWAMessageFromContent,
  downloadContentFromMessage,
  downloadHistory,
  proto,
  getMessage,
  generateWAMessageContent,
  prepareWAMessageMedia,
} = require("@adiwajshing/baileys");

var handler = async (m, { conn }) => {
  try {
    const vcard1 = `
BEGIN:VCARD
VERSION:3.0
FN:${name}
ORG:Developer Bot
TEL;type=CELL;type=VOICE;waid=${numberowner1}:${numberowner1}@s.whatsapp.net
EMAIL:${gmail}
ADR:;;🇮🇩 Indonesia
URL:${instagram}
LABEL:TURU
END:VCARD
`;

    const vcard2 = `
BEGIN:VCARD
VERSION:3.0
FN:Azzah
ORG:Creator Bot
TEL;type=CELL;type=VOICE;waid=${numberowner2}:${numberowner2}@s.whatsapp.net
EMAIL:Privated
ADR:;;🇮🇩 Indonesia
URL:Privated
LABEL:TURU
END:VCARD
`;

    const sentMsg1 = await conn.sendMessage(m.chat, {
      contacts: {
        displayName: "CN",
        contacts: [{ vcard: vcard1 }],
      },
    });

    const sentMsg2 = await conn.sendMessage(m.chat, {
      contacts: {
        displayName: "CN",
        contacts: [{ vcard: vcard2 }],
      },
    });

    await conn.reply(
      m.chat,
      "Ini adalah nomor Creator Bot, Tolong Jangan Call / Spam."
    );
  } catch (error) {
    console.error(error);
  }
};

handler.command = handler.help = ["owner", "creator"];
handler.tags = ["info"];
handler.register = true;
module.exports = handler;