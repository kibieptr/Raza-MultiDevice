let PhoneNumber = require("awesome-phonenumber");
let levelling = require("../lib/levelling");
const axios = require("axios");
const fetch = require("node-fetch");
let handler = async (m, { conn, text, usedPrefix, command }) => {
  let pp =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXIdvC1Q4WL7_zA6cJm3yileyBT2OsWhBb9Q&usqp=CAU";
  let who =
    m.mentionedJid && m.mentionedJid[0]
      ? m.mentionedJid[0]
      : m.fromMe
      ? conn.user.jid
      : m.sender;
  try {
    pp = await conn.profilePictureUrl(who, "image");
  } catch (e) {
  } finally {
    if (typeof db.data.users[who] == "undefined")
      throw "Pengguna tidak ada didalam data base";
    let groupMetadata = m.isGroup ? await conn.groupMetadata(m.chat) : {};
    let participants = m.isGroup ? groupMetadata.participants : [];
    let users = m.isGroup ? participants.find((u) => u.jid == who) : {};
    let user = db.data.users[who];
    let number = who.split("@")[0];
    //let pp = await conn.updateProfilePicture(who)
    let about =
      ((await conn.fetchStatus(who).catch(console.error)) || {}).status || "";
    let {
      name,
      pasangan,
      limit,
      exp,
      money,
      bank,
      lastclaim,
      premiumDate,
      premium,
      registered,
      regTime,
      age,
      level,
      role,
    } = global.db.data.users[who];
    let now = new Date() * 1;
    let { min, xp, max } = levelling.xpRange(level, global.multiplier);
    let username = conn.getName(who);
    // let buffer = await getBuffer(pp)
    let math = max - xp;
    let prem = global.prems.includes(who.split`@`[0]);
    let jodoh = `Berpacaran Dengan @${pasangan.split`@`[0]}`;
    let str = `✧───────[ *PROFILE* ]───────✧
┌ • *Name:* ${registered ? "" + name + " " : ""}
│ • *Limit:* ${limit}
│ • *Exp:* ${exp}
│ • *Money:* RP ${(user.money || 0).toLocaleString("id-ID")}
│ • *Age:* ${age}
│ • *Level:* ${level}
│ • *Status:* ${pasangan ? jodoh : "Jomblo"}
│ • *Registered:* ${registered ? "✅" : "❌"}
│ • *Premium:* ${premium ? "✅" : "❌"}
└ • *Waktu Premium:* ${(premiumDate - now) > 1 ? msToDate(premiumDate - now) : '*Tidak diatur!*'}
`.trim();
    let mentionedJid = [who];
    conn.sendFile(m.chat, pp, "pp.jpg", str, m, false, {
      contextInfo: { mentionedJid: conn.parseMention(str) },
    });
  }
};
handler.help = ["profile","me"];
handler.tags = ["info"];
handler.command = /^profile|me$/i;
handler.register = true;

module.exports = handler;

function msToDate(ms) {
  temp = ms;
  days = Math.floor(ms / (24 * 60 * 60 * 1000));
  daysms = ms % (24 * 60 * 60 * 1000);
  hours = Math.floor(daysms / (60 * 60 * 1000));
  hoursms = ms % (60 * 60 * 1000);
  minutes = Math.floor(hoursms / (60 * 1000));
  minutesms = ms % (60 * 1000);
  sec = Math.floor(minutesms / 1000);
  return days + " Hari " + hours + " Jam " + minutes + " Menit";
  // +minutes+":"+sec;
}

const getBuffer = async (url, options) => {
  try {
    options ? options : {};
    const res = await axios({
      method: "get",
      url,
      headers: {
        DNT: 1,
        "User-Agent": "GoogleBot",
        "Upgrade-Insecure-Request": 1,
      },
      ...options,
      responseType: "arraybuffer",
    });
    return res.data;
  } catch (e) {
    console.log(`Error : ${e}`);
  }
};