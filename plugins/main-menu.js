const fs = require("fs");
let handler = async (m, { conn }) => {
  let pfft = `
ʜᴀʟᴏ ᴋᴀᴋ 👋. ꜱᴀyᴀ ᴅᴀᴩᴀᴛ ᴍᴇᴍʙᴀɴᴛᴜ ᴍᴇʟᴀᴋᴜᴋᴀɴ ꜱᴇꜱᴜᴀᴛᴜ, ᴍᴇɴᴄᴀʀɪ ᴅᴀɴ ᴍᴇɴᴅᴀᴩᴛᴋᴀɴ ᴅᴀᴛᴀ ᴀᴛᴀᴜ ɪɴꜰᴏʀᴍᴀꜱɪ ᴍᴇʟᴀʟᴜɪ ᴡʜᴀᴛꜱᴀᴩᴩ.

ଓ═┅═━–═┅═━–═┅═━–๑
╏➵ Status: Online
╏➵ Library: Baileys
╏➵ Function: Assistant
┗–––––––––––––––✦
╭─────────────●
├ᴋᴇᴛɪᴋ *[ .allmenu ]*
├ᴜɴᴛᴜᴋ ᴍᴇɴᴀᴍᴘɪʟᴋᴀɴ ᴍᴇɴᴜ
╰─────────────●
`;
  let loadd = [
    "[=🚣============] 8%",
    "[==🚣===========] 16%",
    "[===🚣==========] 24%",
    "[====🚣=========] 32%",
    "[=====🚣========] 40%",
    "[======🚣=======] 48%",
    "[=======🚣======] 56%",
    "[========🚣=====] 64%",
    "[=========🚣====] 72%",
    "[==========🚣===] 80%",
    "[===========🚣==] 88%",
    "[============🚣=] 92%",
    "[=============🚣] 100%",
    "𝙻𝙾𝙰𝙳𝙸𝙽𝙶 𝙲𝙾𝙼𝙿𝙻𝙴𝚃𝙴𝙳...",
  ];

  let { key } = await conn.sendMessage(m.chat, { text: "_Loading_" }); //Pengalih isu

  for (let i = 0; i < loadd.length; i++) {
    await conn.sendMessage(m.chat, { text: loadd[i], edit: key });
  }

  conn.sendMessage(m.chat, {
    image: fs.readFileSync("./media/thumb2.jpg"),
    mimetype: "image/jpeg",
    caption: pfft,
    contextInfo: {
      forwardingScore: 2024,
      isForwarded: true,
      mentionedJid: [m.sender],
    },
  });
};


handler.help = ["menu"];
handler.tags = ["main"];
handler.command = /^(menu|help)$/i;

module.exports = handler;