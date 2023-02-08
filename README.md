# shortenUrl
This is an API URL shortening service using Node and typescript.

## Dependencies:
1. Install node on your computer:
	* for ubuntu users: `sudo apt install nodejs`
	* for fedora / centos / redhat 8 : `dnf module install nodejs:18/common`
2. Install modules:
	* run in terminal: `npm install express dotenv`
3. for API unit test install:
	* run in terminal: `yarn install`
	* run in terminal: `yarn add -D typescript jest @types/jest ts-jest supertest @types/supertest`
  
 ## How to run:
1. Install all dependencies.
2. Run the Express server:
	* run in terminal: `node server.ts`
3. Run API unit test:
	* run in terminal: `yarn test:unit`
 
 ## Environment variable
 The environment variable are in `.env` file.</br>
 There is a PORT variable that used to be the port that the express server is running on.

## How to use the API:
Now you're shorten API URL service is up and running on localhost!
you can use the following endpoints:
1. To get short url for your url do: http://localhost:3000/encode?url=[url_to_be_shorten]
2. To get the long URL you have shorten do: http://localhost:3000/decode?url=[given_shorten_url]

## Languages: 
* Node
* Typescript