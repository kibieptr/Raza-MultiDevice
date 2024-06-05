let handler = async (m, { conn }) => {
	let vn = "./vn/dosa.mp3";
	conn.sendFile(m.chat, vn, "dosa.mp3", null, m, true, {
		type: "audioMessage",
		ptt: true,
	});
};
handler.customPrefix = /^(bokep|hentai|coli|colmek)$/i;
handler.command = new RegExp();

module.exports = handler;
