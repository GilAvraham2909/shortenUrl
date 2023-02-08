const express = require('express');
const generator = require('./generator.ts')
require('dotenv').config();

const app = express();
// get envirement variable from .env file
const port = process.env.PORT || 3000;

function isValidHttpUrl(string) {
  let url;
  try {
    url = new URL(string);
  } catch (error) {
    return false;
  }
  return url.protocol === "http:" || url.protocol === "https:";
}

app.get('/', (req, res) => {
  try{
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ "URL shortening service:": [
      "To get short url for your url do: /encode?url=[url_to_be_shorten]",
      "To get the long URL you have shorten do: /decode?url=[given_shorten_url]"
    ] }));
  } catch (error){
    return res.code(error.code).end(JSON.stringify(error));
  } 
})

app.get('/encode', (req, res) => {
  try{
      let long_url = req.query.url;
      // if we could not get url parameter.
      if (!long_url){
        res.setHeader('Content-Type', 'application/json');
        return res.status(400).end(JSON.stringify({ "error:": "please add URL parameters name url. example: /encode?url=[url_to_be_shorten]" }));
      }
      // see if its a valid URL
      if (!isValidHttpUrl(long_url)){
        res.setHeader('Content-Type', 'application/json');
        return res.status(400).end(JSON.stringify({ "error:": "not a valid URL input" }));
      }
      // generate a short url and sore it im memory.
      let shorted_url = generator.encode(long_url);
      res.setHeader('Content-Type', 'application/json');
      return res.status(200).end(JSON.stringify({ "shortURL:": shorted_url }));
  } catch (error){
    return res.code(error.code).end(JSON.stringify(error));
  }    
})

app.get('/decode', (req, res) => {
  try{
      let shorted_url = req.query.url;
      // if we could not get url parameter.
      if (!shorted_url){
        res.setHeader('Content-Type', 'application/json');
        return res.status(400).end(JSON.stringify({ "error:": "please add URL parameters name url. example: /encode?url=[given_shorten_url]" }));
        return;
      }
      // see if its a valid URL
      if (!isValidHttpUrl(shorted_url)){
        res.setHeader('Content-Type', 'application/json');
        return res.status(400).end(JSON.stringify({ "error:": "not a valid URL input" }));
      }
      // get the long url that we stored.
      let long_url = generator.decode(shorted_url);
      res.setHeader('Content-Type', 'application/json');
      return res.end(JSON.stringify({ "longURL:": long_url }));
  } catch (error){
    return res.code(error.code).end(JSON.stringify(error));
  } 
})

var server = app.listen(port, () => {
  console.log(`URL shortening service app listening on port ${port}`)
})

module.exports = { server };
