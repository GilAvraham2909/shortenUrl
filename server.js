const express = require('express')
const app = express()
const port = 3000

app.get('/encode', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ "shortenURL": "short_url" }));
})

app.get('/decode', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ "longURL": "long_url" }));
  })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})