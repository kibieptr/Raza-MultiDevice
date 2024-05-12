let handler = async (m, { conn }) => {
  conn.game = conn.game ? conn.game : {};
  let id = "tebakchara-" + m.chat;
  if (!(id in conn.game)) return;
  let json = conn.game[id][1];
  m.reply(
    "Clue : " +
      "```" +
      json.name.replace(/[AIUEOaiueo]/gi, "_") +
      "```" +
      "\n\n_*Jangan Balas Chat Ini Tapi Balas Soalnya*_"
  );
};
handler.command = /^hcha$/i;
module.exports = handler;
