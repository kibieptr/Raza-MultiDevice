module.exports = {
  before: async function (m) {
    this.autosholat = this.autosholat || {};
    let who =
      m.mentionedJid && m.mentionedJid[0]
        ? m.mentionedJid[0]
        : m.fromMe
        ? this.user.jid
        : m.sender;
    let id = m.chat;
    let jadwalSholat = {
      Imsak: "04:10",
      Subuh: "04:16",
      Dhuhr: "11:40",
      Asr: "14:48",
      Maghrib: "17:45",
      Isha: "18:54",
      Tarawih: "19:00",
    };
    const date = new Date(
      new Date().toLocaleString("en-US", {
        timeZone: "Asia/Jakarta",
      })
    );
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const timeNow = `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}`;
    let isActive = Object.values(this.autosholat).includes(true);
    if (id in this.autosholat && isActive) {
      return false;
    }

    for (const [sholat, waktu] of Object.entries(jadwalSholat)) {
      if (timeNow === waktu && !(id in this.autosholat)) {
        let caption = `Hai kak @${
          m.isGroup ? +m.chat : ""
        },\nWaktu *${sholat}* telah tiba.\n\n*${waktu}*\n_untuk wilayah Malang dan sekitarnya._`;
        this.autosholat[id] = [
          this.reply(m.chat, caption, null, {
            contextInfo: {
              mentionedJid: [who],
            },
          }),
          setTimeout(() => {
            delete this.autosholat[id];
          }, 57000),
        ];
      }
    }
  },
  disabled: false,
};
