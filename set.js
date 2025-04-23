const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSURKWVFwTlRNYS9acDN0Sk9GWU1kcTN4eWtlUUlIQ2djRmtnOHRIRnNtST0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiK1l6WThFdUZQQS9PMUtNWk1GOWFkNy9zNk5Nb3psa3hNS0NOSG9XUmVHQT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJJR1BIWWZ5YjB0RHVHalB2SXZkRE5CR3lvcjZndWRoS0ZhTEMra3J1ZFhBPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJHdUxTYzluTnBtVkJqV3ZWRW1rQXl0OU0vclBQdVczWmYzLzBKNmx6cUQ0PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InFHYzB4QU1HK0dJcWlPOGs5Q1pLS3RsamJ1dFAraWQ4MlJVeEFXd012M1k9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImlwcnZrWkFITDVnNEJXM1RmdUY3RTBjSTR4bEdFKzNCSzhUMG44SUlTMlk9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMlBaTXAwUytLVWJwRVlyVytNRHdLb3hZeHNRU2IxMkRScW1ycEhRM21FWT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoieTJxQUo0RnR3eWwrVFRwYzlsNEdDZzVuZm02MGFIazJ0R3luUTdsUFFDRT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InlZSDdMdXhpNGtHVGJReWFHVERnMDVKQ3h1UU04bHh1Qk9jaVYrRU4rbktUc25jS2dESVU3blBJSHBvRlZXVW5aeGYzSUZFblg1OUp0Zk9ZQmpBNmdBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjEzLCJhZHZTZWNyZXRLZXkiOiJidGRPSU56djR4MjlUaFNCdU1KdTFQTVpSL0J3Zk9UU0g1MHdhU0lRZ0Y0PSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjI2Mzc4MjA5MzM4NEBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiIwMzMwRjlCM0FENUQzRUU0QzQ0NTUwNTJCMUU4NUM3RCJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzQ1MzgzNjkzfSx7ImtleSI6eyJyZW1vdGVKaWQiOiIyNjM3ODIwOTMzODRAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiMjBFQjI1NTQ2RUE3OTQ4Mjc2NkJGNUI2NUQzODJDM0QifSwibWVzc2FnZVRpbWVzdGFtcCI6MTc0NTM4MzY5M31dLCJuZXh0UHJlS2V5SWQiOjMxLCJmaXJzdFVudXBsb2FkZWRQcmVLZXlJZCI6MzEsImFjY291bnRTeW5jQ291bnRlciI6MSwiYWNjb3VudFNldHRpbmdzIjp7InVuYXJjaGl2ZUNoYXRzIjpmYWxzZX0sImRldmljZUlkIjoiZ3FUNk1YMFlSVjI1cGtCUEY5aDNoQSIsInBob25lSWQiOiI3ZDQzOTUxZi00YjFlLTRmNjEtOGEyZC1kYjM0NmNlOGZhYzMiLCJpZGVudGl0eUlkIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUG5MWU51alYxQVhna1Z3bi85REFscjdYOWZNPSJ9LCJyZWdpc3RlcmVkIjp0cnVlLCJiYWNrdXBUb2tlbiI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InFCemM4N1Z4VTI0U2I3aXJzR3FVZDZWcTFrUT0ifSwicmVnaXN0cmF0aW9uIjp7fSwicGFpcmluZ0NvZGUiOiJSNUVSRFlFUiIsIm1lIjp7ImlkIjoiMjYzNzgyMDkzMzg0OjQzQHMud2hhdHNhcHAubmV0IiwibmFtZSI6IlNhbGFkaWMgZ2FuZ3N0YSJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDTHZnL2RJSEVQamhvY0FHR0FJZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiRUh2bnZwS1N4aTBtQnp6cFMwREJ5SU4zZ0Nzc1RqalNKWDl6eFUwRHJYaz0iLCJhY2NvdW50U2lnbmF0dXJlIjoiSWY1WStsMzNGOHNUYlVaeGk3YUFremNtemN5bFFpOFhuN29PTzhlR2tUam5tMno3OFR6VlA1eHVnMHdnZGE1aGsvUEhyUFpiWklMMUtFZFdiUy9mRFE9PSIsImRldmljZVNpZ25hdHVyZSI6ImlDdGpHQkJMbXZUK0lRalpOc3ZhczdCZDBKU3lJL05UU1doVGdDVTlZbWZ2ckZlSmZGdTArUTlYVVAzMUx5RkF3TEdielJTZ2pLYVBuYTJsSDV5TWlBPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjYzNzgyMDkzMzg0OjQzQHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQlJCNzU3NlNrc1l0SmdjODZVdEF3Y2lEZDRBckxFNDQwaVYvYzhWTkE2MTUifX1dLCJwbGF0Zm9ybSI6InNtYmEiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3NDUzODM2ODYsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBSUF2In0=',
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

