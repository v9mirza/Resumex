const fs = require('fs');
// Very naive check for syntax errors that might slip through
require('@babel/core').transformFileSync('./src/pages/PrivacyPolicy.jsx', { presets: ['@babel/preset-react'] }, function(err, result) {
  if (err) console.error("PrivacyPolicy Error:", err.message);
  else console.log("PrivacyPolicy parsed OK");
});
require('@babel/core').transformFileSync('./src/pages/Home.jsx', { presets: ['@babel/preset-react'] }, function(err, result) {
  if (err) console.error("Home Error:", err.message);
  else console.log("Home parsed OK");
});
