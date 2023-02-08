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

app.get('/', (req, res) => {
  try{
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ "URL shortening service:": [
      "To get short url for your url do: /encode?url=[url_to_be_shorten]",
      "To get the long URL you have shorten do: /encode?url=[given_shorten_url]"
    ] }));
  } catch (error){
    console.log(error);
  } 
})

app.get('/encode', (req, res) => {
  try{
      var long_url = req.query.url;
      // if we could not get url parameter.
      if (!long_url){
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ "error:": "please add URL parameters name url. example: /encode?url=[url_to_be_shorten]" }));
        return;
      }
      // see if its a valid URL
      if (!isValidHttpUrl(long_url)){
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ "error:": "not a valid URL" }));
        return;
      }
      // generate a short url and sore it im memory.
      var shorted_url = generator.encode(long_url);
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ "shortURL:": shorted_url }));
  } catch (error){
    console.log(error);
  }    
})

app.get('/decode', (req, res) => {
  try{
      var shorted_url = req.query.url;
      // if we could not get url parameter.
      if (!long_url){
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ "error:": "please add URL parameters name url. example: /encode?url=[given_shorten_url]" }));
        return;
      }
      // get the long url that we stored.
      var long_url = generator.decode(shorted_url);
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ "longURL": long_url }));
  } catch (error){
    console.log(error);
  } 
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})



