const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNkdhUzhZeVcxSWNOZ2dDVmlJY096N2c2UkNBQ3BqdGNtci9xZFNZQ0pWQT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiU09Xb0w2ZVZsMjAxTkV3UGgySEp2VmFIa1VNWCtFSzV0SHFSWHlleWNrTT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJpTGtpUnZxbUxWcDc0UWc4a2VIdlJ5bzNCeWcwdTBHMUpKZ0tKVlIzbjNrPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJsVFNNKzd2cWdVQXExZUFxSnJycEhMNlVzTml5aGFXelRmcW1GSEJVdzIwPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IklJVVNHVnZmS1BCTDJRdy9wbXJuWVlHNnZBUHllU1kzSkphV3EyVTV1Mlk9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlRFdTdIeGVFTDhPR3BBb0lSM2wyTTZSOERsZ1ltOHZIcndDWFBFR3dzM1U9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNkxVS0RYbHBvNStBMlhwMjlSVDFOZXpGZHFqb1VtSFNqTTNpZnZuTnFGQT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibUZFT0kzVnRXemJHL3VpbmFiRlljR1dERnB5ck0waVFYT0FJT3dXQ2dCZz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjhPempFRmcwM3NzRU1seDdJWm1valprc2F4LzJZZTNUSGdTY2EzTTVhVjVPREtlT3FIVVFjVXY2Ym5oUnBoRW84a2dzYlZjZzUxOGxadjlMb0p3ZGlBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTkxLCJhZHZTZWNyZXRLZXkiOiJIVlhuZlhUclh2QjhkUUcwazhUam13dUFlRCtYc2MzT25mMWhMN3VpNUdrPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjI2MzcxMDc4MTc5NUBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiIzODY0QUM1MUQ0QkU0NEZFQTJDNjVERDk0NTgwRTVDMCJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzQ1MjY0NjA5fSx7ImtleSI6eyJyZW1vdGVKaWQiOiIyNjM3MTA3ODE3OTVAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiMEMwNjQyNTY1NzhBRjk0MTBBMDM2Qzc5MzdDOUI0QzcifSwibWVzc2FnZVRpbWVzdGFtcCI6MTc0NTI2NDYxOH0seyJrZXkiOnsicmVtb3RlSmlkIjoiMjYzNzEwNzgxNzk1QHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6Ijk1MjA5MjFCRjVGQjYzQ0Y3Qjg5NDQwNDMyMTMzRjlGIn0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3NDUyNjQ2Mjh9XSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjEsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6IjRHX2FsN1JrU1plenFhVGhxZzdoaEEiLCJwaG9uZUlkIjoiYzViMDE1MzctMTkyMi00Y2YxLWFiYzgtOTA5NmFmYjMzYzYxIiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkFiR0g2M3AydWJEbWtqMVhTOFlPd3kvYTg5ST0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI3WWhGZkNnZmd0S0ZHMXFmM1VRRU1LYVl6bmc9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiV0VFTUc1MkgiLCJtZSI6eyJpZCI6IjI2MzcxMDc4MTc5NTo0OEBzLndoYXRzYXBwLm5ldCIsIm5hbWUiOiLwnZC38J2UhfCdkYwifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ04vTy9SWVF5TCthd0FZWUJDQUFLQUE9IiwiYWNjb3VudFNpZ25hdHVyZUtleSI6IjdmODBUT0Vpcjl6cEFsekpYcDFSV2hNSjBKakF1K21CNTliWk1zcXUzaGs9IiwiYWNjb3VudFNpZ25hdHVyZSI6IkNsVUlQbUxlWnF1UDExMWJ3K1hEamd3RnMveXVtV0J2TVlNRjZMYm83OWNwRDJoVDJweUw1RzlkQ0RCRXQrNG55RHBWU2pmNGZIMzlDaS91MFh4QUN3PT0iLCJkZXZpY2VTaWduYXR1cmUiOiJGdGw2TjRkN0wwalZjLzNZejJDOVlnRnVQV2dxNkpVdlJnYVFRdzVTbjNycXJFQktRKzJ5TjlLcFBPNkU3RUdqTXgrNmFGdGs4R2NqM3BaRmdvUmppQT09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjI2MzcxMDc4MTc5NTo0OEBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJlMy9ORXpoSXEvYzZRSmN5VjZkVVZvVENkQ1l3THZwZ2VmVzJUTEtydDRaIn19XSwicGxhdGZvcm0iOiJzbWJhIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzQ1MjY0NTk3LCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQU9LbSJ9',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "𝐷𝐸ℕ𝐵𝙊𝑌☆",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "𝐷𝐸ℕ𝐵𝙊𝑌☆",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'BMW_MD',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/17c83719a1b40e02971e4.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '3',
    ANTICALL : process.env.ANTICALL || 'yes',   
    AUTO_BIO : process.env.AUTO_BIO || 'no',               
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ANTIDELETE1 : process.env.ANTI_DELETE_MESSAGE || 'yes',
    AUTO_REACT : process.env.AUTO_REACT || 'no',
    AUTO_REACT : process.env.AUTO_REACT || 'no',              
    AUTO_REACT_STATUS : process.env.AUTO_REACT_STATUS || 'yes',
    AUTO_READ : process.env.AUTO_READ || 'no',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});

