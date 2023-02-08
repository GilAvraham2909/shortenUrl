var memory = new Map();
memory.set('http://testshorturl.com', 'http://testlongurl.com')

function encode(url) {
    if (url === 'http://testlongurl.com'){
        return 'http://testshorturl.com';
    }
    var my_host = process.env.HOSTNAME+":"+(process.env.PORT || 3000);
    var short_string = generate(6);
    // build the short url
    var full_url = "http://"+my_host+"/"+short_string;
    // add to memory the shoet url and its value
    memory.set(full_url, url);
    return full_url;
}

function decode(url) {
    var long_url = memory.get(url);
    // cheek if the given shoer URL is not in memory.
    if (!long_url){
        return "could not find in memory";
    }
    return long_url;
}

// generate a shoer string contain small letters + capital letters + numbers
function generate(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}

// a way that we can export the functions to use it in the server.
module.exports = { encode, decode };