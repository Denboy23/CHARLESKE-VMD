const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMEJhWnhUbEc1MGt5eE9VR2tDc1lQdG00MXJGM3hkb25ERitncmZQOUpFWT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoieUhlN1BZemI5bmVadGpTeWZQaWRqWHJwMi9mNWc5elN6U1hHNW1vMnp4az0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJjQjQwVXZPdTFoQXZ5MHdzU3FWZVBHSzN5NDljTHVhQ3pQcVV4dG1qemxRPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJuOTBKbTBEeVoyTVpZOU00MGY5WUxjdDl4cEZtYVo3eDJ4WGdCelp3TGg4PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkFOM2pCTXpibjhONmdQcU90NlFCOTc5TWV6UWpCUkp5Q3VxR3grVHM5bVk9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlpXNGVkMGtia0RCTVJqQ2o2QnFwbm8zYzl2NjFkSjU2bC9Nc0JyTHBVQVk9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiOE5McUxpc2RHVHJPQysyZDFCV3h6emthSExHWDVBRURHemduZTVQQWdFUT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoicjd4U3oxdmFOdjRZcHRTUnlQRDBhUUptdDNBQkpMQW5ISFhqNlQ5d2J3az0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InRpQTZXdEtNckduaXZaT3RZUmpuWUZ5bVVpakNLSkRaengrSDdTOFBDSWlUaEtkYlFPWGQvUjJBcmRacGFEY2ZMSkZXdHJQcExTTnNOT296cU9raUNnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6NjUsImFkdlNlY3JldEtleSI6IkdreGtRWDFxSEMwWkt1RVo3bzluOWxrNkZIRDhvb2Fka3pwM0JRN21DL1k9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbeyJrZXkiOnsicmVtb3RlSmlkIjoiMjYzNzEwNzgxNzk1QHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6Ijk4QjY2MjRGNjczNkNBMTIxNzQ4MjY2RjE2Qjc4N0M3In0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3NDUyNDgxNDh9LHsia2V5Ijp7InJlbW90ZUppZCI6IjI2MzcxMDc4MTc5NUBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiI1MTU5MDM2QUNDMTA0MDkwQjQ1RUY1RjU2OTkzQjlGNyJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzQ1MjQ4MTgwfV0sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjoxLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJtalhSbG50NVJweVJrMVVoekttU3FnIiwicGhvbmVJZCI6IjNmNDU4NDZkLTNmYWEtNGRjNS1iYmJhLTk3ZjVkYjg4OWJhYyIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJSTWN5VmV2QWw1cVVJV0UvM1pHUFBvZjRmM1U9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSzQycE43ZXhRWnFCTTA0dXA1Q1ZaTlFXNFNVPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IllMOFhRRTMxIiwibWUiOnsiaWQiOiIyNjM3MTA3ODE3OTU6NDdAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoi8J2Qt/CdlIXwnZGMIn0sImFjY291bnQiOnsiZGV0YWlscyI6IkNOL08vUllRK2I2WndBWVlBeUFBS0FBPSIsImFjY291bnRTaWduYXR1cmVLZXkiOiI3ZjgwVE9FaXI5enBBbHpKWHAxUldoTUowSmpBdSttQjU5YlpNc3F1M2hrPSIsImFjY291bnRTaWduYXR1cmUiOiJNVzNLai9iUHdOY04wUkZJVE9RRWYrTjJ1Qm5ZcWhDTDBPMDg4Wlc0RW1zYlJ1bVN4NmFRclBMNEN0SDZndjBVSnQrUjFTTDd5Q3NQenlTS1N1czFDdz09IiwiZGV2aWNlU2lnbmF0dXJlIjoiNnJDcjNWcGdEc25qbytCT1NsaEQ4VXdlTGtaVzhmRW5RYlNmRlhYdkFGcnl4RWM5TGNobmFSNVhyaXg0S2t5NVg4emlxY2JrdCt0emhPYWZRU3RJQmc9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyNjM3MTA3ODE3OTU6NDdAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCZTMvTkV6aElxL2M2UUpjeVY2ZFVWb1RDZENZd0x2cGdlZlcyVExLcnQ0WiJ9fV0sInBsYXRmb3JtIjoic21iYSIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTc0NTI0ODEzNiwibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFPS2EifQ==',
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
    AUTO_READ : process.env.AUTO_READ || 'yes',
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

