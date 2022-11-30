const fs = require('fs')
const path = `./.env`
const vars = `
 ENV_VAR_1=${process.env.ENV_VAR1}`
fs.writeFileSync(path, vars)