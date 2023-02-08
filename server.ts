const express = require('express');
const generator = require('./generator.ts')
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

function isValidHttpUrl(string) {
  let url;
  try {
    url = new URL(string);
  } catch (_) {
    return false;
  }
  return url.protocol === "http:" || url.protocol === "https:";
}

app.get('/encode', (req, res) => {
    var long_url = req.query.url;
    // see if its a valid URL
    if (!isValidHttpUrl(long_url)){
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ "error:": "not a valid URL" }));
    }
    // generate a short url and sore it im memory.
    var shorted_url = generator.encode(long_url);
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ "shortURL:": shorted_url }));
    
})

app.get('/decode', (req, res) => {
    var shorted_url = req.query.url;
    // get the long url that we stored.
    var long_url = generator.decode(shorted_url);
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ "longURL": long_url }));
  })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})



