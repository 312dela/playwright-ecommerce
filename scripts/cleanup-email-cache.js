const fs = require('fs');
const path = require('path');

const tempFile = path.resolve(__dirname, '../utils/auth/email-temp.json');
console.log('Cleanup running. Target file:', tempFile)

if (fs.existsSync(tempFile)) {
  fs.unlinkSync(tempFile);
  console.log('Email cache deleted.');
} else {
  console.log('Email cache not found.');
}
