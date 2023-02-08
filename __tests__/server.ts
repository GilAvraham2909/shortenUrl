import * as request from 'supertest';
let my_server = require('../src/server');

describe("API tests", () => {
    test("encode a valid url", async () => {
        let res = await request(my_server.server).get("/encode?url=http://testlongurl.com");
        expect(res.body).toEqual({ 'shortURL:' : 'http://testshorturl.com' });
    });

    test("encode not a valid URL input", async () => {
        let res = await request(my_server.server).get("/encode?url=noturl");
        expect(res.body).toEqual({ "error:": "not a valid URL input" });
    });

    test("encode url without parameter url", async () => {
        let res = await request(my_server.server).get("/encode?novar");
        expect(res.body).toEqual({ "error:": "please add URL parameters name url. example: /encode?url=[url_to_be_shorten]" });
    });

    test("decode url without parameter url", async () => {
        let res = await request(my_server.server).get("/decode?novar");
        expect(res.body).toEqual({ "error:": "please add URL parameters name url. example: /encode?url=[given_shorten_url]" });
    });
    test("encode a valid url", async () => {
        let res = await request(my_server.server).get("/decode?url=http://testshorturl.com");
        expect(res.body).toEqual({ 'longURL:' : 'http://testlongurl.com' });
    });

    test("encode not a valid URL input", async () => {
        let res = await request(my_server.server).get("/decode?url=noturl");
        expect(res.body).toEqual({ "error:": "not a valid URL input" });
    });

    test("encode short url that is not in memory", async () => {
        let res = await request(my_server.server).get("/decode?url=http://notgoingtowork.com");
        expect(res.body).toEqual({ "longURL:": "could not find in memory" });
    });

});
// close the server
my_server.server.close();




