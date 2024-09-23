const fs = require('fs');
const path = require('path');

module.exports = {
  devServer: {
    https: {
      key: fs.readFileSync(path.join(__dirname, './certs/server.key')),
      cert: fs.readFileSync(path.join(__dirname, './certs/server.crt')),
    },
  },
};