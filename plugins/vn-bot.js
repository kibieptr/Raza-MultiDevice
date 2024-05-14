const util = require("util");
const path = require("path");

Array.prototype.getRandom = function () {
    return this[Math.floor(Math.random() * this.length)];
};

let handler = async (m, { conn }) => {
    conn.sendFile(m.chat, audio.getRandom(), "oy.mp3", null, m, true, {
        type: "audioMessage",
        ptt: true,
    });
};
handler.customPrefix = /^(raza|razabot|bot|p)$/i;
handler.command = new RegExp();

module.exports = handler;

const audio = [
    "https://bucin-livid.vercel.app/audio/adaapa.mp3",
];
