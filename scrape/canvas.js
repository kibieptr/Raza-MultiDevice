const { createCanvas, loadImage, registerFont } = require('canvas');
const fs = require('fs');

async function runtime() {
  const canvasWidth = 2560;
  const canvasHeight = 1440;

  const canvas = createCanvas(canvasWidth, canvasHeight);
  const ctx = canvas.getContext('2d');
  
  const backgroundImage = await loadImage('https://telegra.ph/file/576228a285991419b6076.png');
  ctx.drawImage(backgroundImage, 0, 0, canvasWidth, canvasHeight);

  ctx.font = 'bold 150px Arial';
  ctx.fillStyle = '#fff';
  ctx.textAlign = 'left'; 
  ctx.textBaseline = 'middle';
  
  const textX = 100;
  const textY = (canvasHeight / 2)  + 80; 
  ctx.strokeStyle = '#000';
  ctx.lineWidth = 3;
  ctx.strokeText(conn.msToDate(process.uptime() * 1000), textX, textY);

  ctx.fillText(conn.msToDate(process.uptime() * 1000), textX, textY);

  return canvas.toBuffer();
}
module.exports = { 
  runtime
};

let chalk = require('chalk');
let file = require.resolve(__filename);
fs.watchFile(file, () => {
  fs.unwatchFile(file);
  console.log(chalk.redBright("Update 'config.js'"));
  delete require.cache[file];
  require(file);
});