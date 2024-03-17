global.owner = ["6287739924485"];
global.creator = ["6285733355537"];
global.mods = ["6287739924485", "6285733355537"];
global.prems = ["6287739924485", "6285733355537"];
global.nameowner = "Kibieptr";
global.numberowner = "6287739924485";
global.numberowner1 = "6287739924485";
global.numberowner2 = "6285733355537";
global.mail = "kibieptrid@gmail.com";
global.gc = "https://chat.whatsapp.com/LKjTYbeY1vf5iOhimpfp3x";
global.instagram = "https://instagram.com/kibieptr_";
global.wm = "© Raza";
global.wait = "_*Tunggu sedang di proses...*_";
global.eror = "_*Server Error*_";
global.stiker_wait = "*⫹⫺ Stiker sedang dibuat...*";
global.packname = "Made With";
global.author = "© Raza";
global.autobio = false; // Set true untuk mengaktifkan autobio
global.maxwarn = "3"; // Peringatan maksimum

//INI WAJIB DI ISI!//
global.btc = "APIKEYMU";
//Daftar terlebih dahulu https://api.botcahx.eu.org

//INI OPTIONAL BOLEH DI ISI BOLEH JUGA ENGGA//
global.lann = "YOUR_APIKEY_HERE";
//Daftar https://api.betabotz.eu.org

global.APIs = {
  btc: "https://api.botcahx.eu.org",
};
global.APIKeys = {
  "https://api.botcahx.eu.org": "APIKEYMU",
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
