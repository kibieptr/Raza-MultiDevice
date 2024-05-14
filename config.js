global.owner = ["6281529762099"];
global.creator = ["6281529762099"];
global.mods = ["6281529762099"];
global.prems = ["6281529762099"];
global.nameowner = "Kibieptr";
global.numberowner = "6281529762099";
global.numberowner1 = "6281529762099";
global.numberowner2 = "6285733355537";
global.mail = "kibieptrid@gmail.com";
global.version = "8.5.0";
global.gc = "https://chat.whatsapp.com/LKjTYbeY1vf5iOhimpfp3x";
global.instagram = "https://instagram.com/kibieptr_";
global.botchannel = "https://whatsapp.com/channel/0029VaVBuaxDp2Q8rF40N532";
global.wm = "© RazaBots";
global.wait = "_*Tunggu sedang di proses...*_";
global.eror = "_*Server Error*_";
global.stiker_wait = "*⫹⫺ Stiker sedang dibuat...*";
global.packname = "Made With";
global.author = "© RazaBots";
global.namebot = "RazaBots";
global.autobio = false; // Set true untuk mengaktifkan autobio
global.maxwarn = "3"; // Peringatan maksimum

//INI WAJIB DI ISI!//
global.btc = "ISI APIKEY MU";
//Daftar terlebih dahulu https://api.botcahx.eu.org

//INI OPTIONAL BOLEH DI ISI BOLEH JUGA ENGGA//
global.lann = "YOUR_APIKEY_HERE";
//Daftar https://api.betabotz.eu.org

global.APIs = {
  btc: "https://api.botcahx.eu.org",
};
global.APIKeys = {
  "https://api.botcahx.eu.org": "ISI APIKEY MU",
};

let fs = require("fs");
let chalk = require("chalk");
let file = require.resolve(__filename);
fs.watchFile(file, () => {
  fs.unwatchFile(file);
  console.log(chalk.redBright("Update 'config.js'"));
  delete require.cache[file];
  require(file);
});
