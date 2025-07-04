const fs = require("fs");
const path = "./src/currency-beacon-api-key.ts";
const key = process.env.CURRENCY_BEACON_API_KEY ?? "";

if (key && !fs.existsSync(path)) {
  fs.writeFileSync(path, `export const CURRENCY_BEACON_API_KEY = '${key}';`);
}
