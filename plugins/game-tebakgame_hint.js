let handler = async (m, { conn }) => {
  conn.game = conn.game ? conn.game : {};
  let id = "tebakgame-" + m.chat;
  if (!(id in conn.game)) return;
  let json = conn.game[id][1];
  m.reply(
    "Clue : " +
      "```" +
      json.jawaban.replace(/[AIUEOaiueo]/gi, "_") +
      "```" +
      "\n\n_*Jangan Balas Chat Ini Tapi Balas Soalnya*_"
  );
};
handler.command = /^(hgame)$/i;
module.exports = handler;
