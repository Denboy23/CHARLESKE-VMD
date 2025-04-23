const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiaUM1TkFzNVMrQXp2Ulh1V2EzbzJvOTM3TERZaHdqVkVZaWVpbmUxWmNuWT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUVF0OWcrWFovUlVFc0hkaXphMGVUQXZHSjBVek1QcktWTHU4aHpQNEF5OD0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJpRDZrUlBabkxJV1haUXVOQnl1cG02dFVCQ2pVUGpVeG9xNEgwZTdTdVZNPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJHSU1mR2lhSk1xeTY0OHZMNUVLb0FhNDhnaVB6bFNmelU1eE1hd3BlT3hzPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ik9DSzB0aW51MDNkbDlYVWMzMlVEeVNVK2x4OEtuTmhCenZlT3pIc0t1WEk9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlM2OW5iS0toNGtmQ3BQTWljbXp6VGZOcERnejczUFRjTnlkeDdSaGIwVnc9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibUVESUVLT2prUmVNblB1NUFLU0VGYzlTeTZvZFF2NnFzcU02SWtvSXhIND0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiWFhnT1U0UkZkOTh4MXJCODRlQ0p6L1dsVUUvZVlqVnNPQmhVOFRDOFlWMD0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImpERjFRdlQzQmVNYzlNQmduVDJ4ekZEbTM3cjh5Z0RKMG11TTdOUERaUlhiSGVZcE05MExjU1NnSU5xMmlyc3dVVm83Q2ZRWUpCVXVQbzNCNDc4Q2hRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjA1LCJhZHZTZWNyZXRLZXkiOiJKb3owVktNSElZajdtbFFNUiswOERMR0czZUhQZUt1YTJkRnUzbnFpU0VvPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjI2Mzc4MjA5MzM4NEBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiI5RTY0MUIzNEZCQ0QzMzhBMEZDNjY4MEE3RURDQjlBMSJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzQ1Mzc1OTEzfSx7ImtleSI6eyJyZW1vdGVKaWQiOiIyNjM3ODIwOTMzODRAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiRkU5MEMyRjRDNDBCQ0FCMTRDRjEzQkIzMTE5QTBDRUMifSwibWVzc2FnZVRpbWVzdGFtcCI6MTc0NTM3NTkxM31dLCJuZXh0UHJlS2V5SWQiOjMxLCJmaXJzdFVudXBsb2FkZWRQcmVLZXlJZCI6MzEsImFjY291bnRTeW5jQ291bnRlciI6MSwiYWNjb3VudFNldHRpbmdzIjp7InVuYXJjaGl2ZUNoYXRzIjpmYWxzZX0sImRldmljZUlkIjoiMEdTZEtXTEpTN21uR1hjR3JQSmotZyIsInBob25lSWQiOiJiNmU4ZmI4MC00NTdhLTQzYzEtOTg3ZS1iNjU3MDg3MWMzNDkiLCJpZGVudGl0eUlkIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoib2JDNkU2QmJheW5hcHlJME92Z1h0aWNjOU1ZPSJ9LCJyZWdpc3RlcmVkIjp0cnVlLCJiYWNrdXBUb2tlbiI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IisyQUlFSHZKUkNYL2N6ekh4SWpETERPbzcwTT0ifSwicmVnaXN0cmF0aW9uIjp7fSwicGFpcmluZ0NvZGUiOiJCUTNCOERQNiIsIm1lIjp7ImlkIjoiMjYzNzgyMDkzMzg0OjQwQHMud2hhdHNhcHAubmV0IiwibmFtZSI6IlNhbGFkaWMgZ2FuZ3N0YSJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDTG5nL2RJSEVKV2xvY0FHR0FFZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiRUh2bnZwS1N4aTBtQnp6cFMwREJ5SU4zZ0Nzc1RqalNKWDl6eFUwRHJYaz0iLCJhY2NvdW50U2lnbmF0dXJlIjoidTV4NVFYaWNNeDdVbEg5K09UdEl3WEVjSUU1L0haM3BiT29YZG9OaTdyWjJWUmJJckNyTzB2Vm54b2x6ZUY4TDVTb3ZDTzc3UXFEQUhkYXFMWG5UQXc9PSIsImRldmljZVNpZ25hdHVyZSI6IlZJeElSNkgwdzVnR3gvdnVPdnZ3OGpCNk9RZEZDUzhuelp2MTFsbXFLMnlCWnRGVHJCaXNRWmFPcyt0V0h1YTF0eUV6VEVVa0w1cy96ejZ1K3pSeWdBPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjYzNzgyMDkzMzg0OjQwQHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQlJCNzU3NlNrc1l0SmdjODZVdEF3Y2lEZDRBckxFNDQwaVYvYzhWTkE2MTUifX1dLCJwbGF0Zm9ybSI6InNtYmEiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3NDUzNzU5MDcsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBSUFxIn0=',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "SALADICGANGSTER",
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

