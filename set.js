const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTUhBYTd6RkhNUnBMcnBCTmFiTGppVWI3QjYzRFVkeC9HbXNkMlQzbmJFWT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ3N2dUNVWGMvbUk5SG5pelJKNmtFNEV3NTMzQnMrcC9wZUJIT2JJb3RnOD0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIwSGY1QytBK2VjdkhrcHIzVkFQdk5zMFNOVWxZa0JaeHk4M1dQR3dETlVJPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJQa0ZXUDNXUWlGbTg1OE0zUWx0RnNnczUxa0lPeDJGVVNjSTRFRm1MVVUwPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjRGMTBJd1owUEV4b2VoU3ozZXRjMDJ1R2dBODBxSVA2QktINEp4dG02Rms9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImN5WHI4cFVUTkhibytvZ1U2emlqL3FUYUpGMGNVNmJPUnRSVEhjSnp4M3M9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiR0daU1BBdzg2eHNrcXd0bm1HRWliV01XVGlFTVNTejBsVzFRUkhUUm4zMD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUGpVUCtKN3F1TDdOMFNvcjJrN2dLOVdFSHU4TFpMdlpRRXVmQkh4RVVYZz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlYyUUc5bEpHSk1QaUc3QllVTlYrdW5xL2ZyRnRXb09KQ3ZsWEpVUUg5NURUNmxGdE9EMHQvZXhnOEtTY2ZGWXdDcW8yREpHYUxZVWNXY2FlaDJuc0JBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTc2LCJhZHZTZWNyZXRLZXkiOiJybTBtYVF3cWxxYzAvaVdSUmZldXNvaWRpbW5namM5ekE2cDFmUDFxd25BPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjI2MzcxMDc4MTc5NUBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiJEQkU4NTM5OTRFOThDQUExMzY5RjU5QjkwN0I0MjRGNCJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzQ1MjkxNjIxfSx7ImtleSI6eyJyZW1vdGVKaWQiOiIyNjM3MTA3ODE3OTVAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiRTZDQjdEODc1NEQxQUE5QjYzREU2NTUwRUIzMTRGRUMifSwibWVzc2FnZVRpbWVzdGFtcCI6MTc0NTI5MTYyMX0seyJrZXkiOnsicmVtb3RlSmlkIjoiMjYzNzEwNzgxNzk1QHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IjU2Mzg3MjNDNENFODdFN0I1NTVFNzFEODZDNkM4MzU5In0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3NDUyOTE2MzR9LHsia2V5Ijp7InJlbW90ZUppZCI6IjI2MzcxMDc4MTc5NUBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiI4RTg1M0JDMUY0RUZDOTk3N0VGN0ZFNUQxM0NCMzBDOSJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzQ1MjkxNjM2fV0sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjoxLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJNa1gwV21EUFR0Q2RpYTBCM1p4UFVnIiwicGhvbmVJZCI6IjU4MGEyMDhhLWRhZjgtNDZkMC05Yzk2LWU3ZmQwOTI1MTFmOCIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJkSmR4MTh2YTNUbVZLSGJ5V3M4Qi9SaGpuTk09In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiOW1ZK3RtazVuc1BIOHNFU2xZUHdXV29TWDZvPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IlFORVRETEJUIiwibWUiOnsiaWQiOiIyNjM3MTA3ODE3OTU6NDlAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoi8J2Qt/CdlIXwnZGMIn0sImFjY291bnQiOnsiZGV0YWlscyI6IkNOL08vUllRMUpLY3dBWVlCU0FBS0FBPSIsImFjY291bnRTaWduYXR1cmVLZXkiOiI3ZjgwVE9FaXI5enBBbHpKWHAxUldoTUowSmpBdSttQjU5YlpNc3F1M2hrPSIsImFjY291bnRTaWduYXR1cmUiOiJLMmd3Z3c2cEs2a0FqN1N1WjloUHArYjRESmlXN240RVVMRjRoc1Y4TDhXbGM4N05MRFlaWkNCT21aMTV2MTE1RWNCWkRwTnNOaklGQytSbGRPUWpBZz09IiwiZGV2aWNlU2lnbmF0dXJlIjoiUE9PRUt2VkQ4eFFIVVlsb3dxVzd0M1p6OWRHdm92MjBwTjIrMjRQM2JrYW5ya1FYa21reU92WFRnNTFTbVZUU2xxOXVKVDZDbUljNHI1eFk3a0l4RFE9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyNjM3MTA3ODE3OTU6NDlAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCZTMvTkV6aElxL2M2UUpjeVY2ZFVWb1RDZENZd0x2cGdlZlcyVExLcnQ0WiJ9fV0sInBsYXRmb3JtIjoic21iYSIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTc0NTI5MTYxOCwibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFPS24ifQ==',
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

