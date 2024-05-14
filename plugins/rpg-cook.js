let handler = async (m, { command, usedPrefix, DevMode, args }) => {
  let type = (args[0] || "").toLowerCase();
  let msk = (args[0] || "").toLowerCase();
  let user = global.db.data.users[m.sender];
  let author = global.author;
  let cok = `
▧ Ayambakar
〉Butuh 2 Ayam Dan 1 Coal

▧ Ayamgoreng
〉Butuh 2 Ayam Dan 1 Coal

▧ Steak
〉Butuh 2 Sapi Dan 1 Coal

▧ Rendang
〉Butuh 2 Sapi Dan 1 Coal

▧ Ikanbakar
〉Butuh 2 Ikan Dan 1 Coal

`;

  try {
    if (/masak|cook/i.test(command)) {
      const count =
        args[1] && args[1].length > 0
          ? Math.min(5, Math.max(parseInt(args[1]), 1))
          : !args[1] || args.length < 3
          ? 1
          : Math.min(1, count);
      switch (type) {
        case "ayambakar":
          if (user.ayam < count * 2 || user.coal < 1 * count) {
            user.ayam >= count * 1;
            user.ayam -= count * 2;
            user.coal -= count * 1;
            user.ayamb += count * 1;
            conn.reply(m.chat, `Sukses Memasak ${count} Ayam Bakar`, m);
          } else
            conn.reply(
              m.chat,
              `Kamu Tidak Memiliki Bahan Untuk Memasak Ayam Bakar\nAnda butuh 2 ayam dan 1 coal untuk memasak`,
              m
            );
          break;
        case "rendang":
          if (user.sapi < count * 2 || user.coal < 1 * count) {
            user.sapi >= count * 1;
            user.sapi -= count * 2;
            user.coal -= count * 1;
            user.rendang += count * 1;
            conn.reply(m.chat, `Sukses memasak ${count} Rendang 🍜`, m);
          } else
            conn.reply(
              m.chat,
              `Anda tidak memiliki bahan untuk memasak dimasak rendang\nAnda butuh 2 sapi dan 1 coal untuk memasak`,
              m
            );
          break;
        case "ayamgoreng":
          if (user.ayam < count * 2 || user.coal < 1 * count) {
            user.ayam >= count * 1;
            user.ayam -= count * 2;
            user.coal -= count * 1;
            user.ayamg += count * 1;
            conn.reply(m.chat, `Sukses memasak ${count} ayam goreng🍗`, m);
          } else
            conn.reply(
              m.chat,
              `Anda tidak memiliki bahan untuk memasak ayam goreng\nAnda butuh 2 ayam dan 1 coal untuk memasak`,
              m
            );
          break;
        case "steak":
          if (user.sapi < count * 2 || user.coal < 1 * count) {
            user.sapi >= count * 1;
            user.sapi -= count * 2;
            user.coal -= count * 1;
            user.steak += count * 1;
            conn.reply(m.chat, `Sukses memasak ${count} Steak`, m);
          } else
            conn.reply(
              m.chat,
              `Anda tidak memiliki bahan untuk memasak steak\nAnda butuh 2 sapi dan 1 coal untuk memasak`,
              m
            );
          break;
        case "ikanbakar":
          if (user.ikan < count * 2 || user.coal < 1 * count) {
            user.ikan >= count * 1;
            user.ikan -= count * 2;
            user.coal -= count * 1;
            user.ikanb += count * 1;
            conn.reply(m.chat, `Sukses memasak ${count} ikan bakar🍖`, m);
          } else
            conn.reply(
              m.chat,
              `Anda tidak memiliki bahan untuk memasak ikan bakar\nAnda butuh 2 ikan dan 1 coal untuk memasak`,
              m
            );
          break;
        default:
          await conn.reply(m.chat, cok, m);
      }
    }
  } catch (e) {
    conn.reply(m.chat, `Sepertinya Ada Yg Eror,Coba Laporin Ke Owner Deh`, m);
    console.log(e);
    if (DevMode) {
      for (let jid of global.owner
        .map((v) => v.replace(/[^0-9]/g, "") + "@s.whatsapp.net")
        .filter((v) => v != conn.user.jid)) {
        conn.sendMessage(
          jid,
          "shop.js error\nNo: *" +
            m.sender.split`@`[0] +
            "*\nCommand: *" +
            m.text +
            "*\n\n*" +
            e +
            "*",
          MessageType.text
        );
      }
    }
  }
};

handler.help = ["masak"];
handler.tags = ["rpg"];
handler.command = /^(masak|cook)$/i;
handler.group = true;
handler.fail = null;
handler.exp = 0;
handler.register = true;
module.exports = handler;
