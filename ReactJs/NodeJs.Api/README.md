# WebApp.NodeJs

`npm init -y`

`npm install --save express`

`md src` or `mkdir scr`  windows

Create a file: src\server.js

`npm install --save-dev @babel/core` Babel compiler core

`npm install --save-dev @babel/node` Babel command line

`npm install --save-dev @babel/preset-env` A Babel preset for each environment.

Create a file: .babelrc
```json
{
    "presets":["@babel/preset-env"]
}
```
Run the application:

`npx babel-node src/server.js`

http://localhost:8000/hello
### Express

Now install Express in the myapp directory and save it in the dependencies list. For example:

`npm install express --save`

If you wish to install Express temporarily and not add it to the dependencies list:

`npm install express --no-save`

See [Expresss](https://expressjs.com/en/starter/hello-world.html) Hello world example

```js
const express = require('express')
const app = express()
const port = 1337

// add body parser to the request
app.use(express.json());

app.get('/api/articles', (req, res) => {
    res.send('Hello World from the get!')
})

app.post('/api/articles', (req, res) => {
    var body = req.body;
    console.log(body);
    res.send(`Hello World from the post, ${body.name}!!!`)
})

app.get('/hello/:name', (req, res) => {
    res.send(`Hello World from the get, ${req.params.name}!`)
})

app.use(function (req, res, next) {
    res.status(404).send("404: Sorry can't find that!")
})


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
```

#### Using Async/await with a request handler with MongoDB
[Using Async/await in Express](https://zellwk.com/blog/async-await-express/), you need to use the `async` keyword when you define a request handler. (Note: These request handlers are known as called "controllers". I prefer calling them request handlers because request handlers are more explicit).
```js
app.get('/api/articles/:name', async (req, res) => {
    try {
        // Use connect method to connect to the server
        await client.connect()
            .catch(err => { console.log(err); });
        if (!client) {
            return;
        }
        console.log('Connected successfully to server');
        const db = client.db(dbName);
        const collection = db.collection('articles');
        //let query = { name: req.params.name  }
        var article = await collection.findOne({ name: req.params.name });
        console.log('Found article =>', article);
        //const article = articles.find(article => article.name === req.params.name);
        if (!article)
            res.status(404).send(`404: Sorry can't find the article '${req.params.name}'`)

        res.status(200).json(article)
        client.close()
    } catch (e) {
        console.error(e)
        res.status(500).json({message: 'An error has occurred:', e})
    }
})
```


### Request body parser

<!--[What does body-parser do with express?](https://stackoverflow.com/questions/38306569/what-does-body-parser-do-with-express#answer-43626891)-->

To handle HTTP POST requests in Express.js version 4.16 and above, you **do not** need to install the middleware module called `body-parser`.

just add the folling line in a header of server.js file:
```js
// add body parser to the request
app.use(express.json());
```
This will allow you to extract `body` sent in request:
```js
const { name, title, content } = req.body;
```


### Nodemon

Nodemon is a tool that helps develop node.js based applications by automatically restarting the node application when file changes in the directory are detected.

`npm install --save-dev nodemon`

`npm start`

```json
  "scripts": {
    "build": "babel src -d dist --source-maps",
    "start": "npx nodemon --exec npx babel-node src/server.js"
  }
```

### CORS
[CORS for Express server](http://expressjs.com/en/resources/middleware/cors.html#enabling-cors-pre-flight)

CORS is a [node.js package](https://www.npmjs.com/package/cors) for providing a Connect/Express middleware that can be used to enable CORS with various options.
- `npm install cors`

add the following client `origin: 'https://localhost:44320'` to the server.js header (origin mast be  without last `/`)
```jsx
var cors = require('cors')
var corsOptions = {
    origin: 'https://localhost:44320', //origin: 'http://example.com',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
```
and `cors(corsOptions)` shoiuld be included in every CRUD request:

app.get('/api/articles'`, cors(corsOptions)`, async (req, res) => {
#### Fetch: Cross-Origin Request
https://javascript.info/fetch-crossorigin

When we try to make a unsafe request ['PUT',['DELETE']] from the any browser, the browser sends a special **`preflight`** request that asks the server – does it agree to accept such cross-origin requests, or not in this section of our `server.js` application
```js
// This should be the last route function
app.use(cors(corsOptions), function (req, res, next) {
    res.status(404).send("404: Sorry can't find that!")
})
```

And, unless the server explicitly confirms that with headers, an unsafe request is not sent.

#### CORS for safe requests
If a request is cross-origin, the browser always adds the Origin header to it.

For instance, if we request http://localhost:1337/api/articles/learn-react/voute from https://localhost:44320 the headers will look like:

The General part of the **`preflight`** request will be:
```json
Request URL: http://localhost:1337/api/articles/learn-react/voute
Request Method: OPTIONS
Status Code: 200 OK
Remote Address: [::1]:1337
Referrer Policy: strict-origin-when-cross-origin
```
The **Request Headers** of the **`preflight`** request will be:
```json
Accept: */*
Accept-Encoding: gzip, deflate, br
Accept-Language: en-US,en;q=0.9
Access-Control-Request-Method: PUT
Cache-Control: no-cache
Connection: keep-alive
Host: localhost:1337
Origin: https://localhost:44320
Pragma: no-cache
Sec-Fetch-Dest: empty
Sec-Fetch-Mode: cors
Sec-Fetch-Site: cross-site
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko)
```

This special **`preflight`** request goes here: !!! not in PUT method of the `express` linbrary 
and therfore `cors(corsOptions)`, should be added as aparamter of the function call.  
```js
app.use(cors(corsOptions), function (req, res, next) {
    res.status(404).send("404: Sorry can't find that!")
})
```


The **Respons Headers** will be:
```json
Access-Control-Allow-Methods: GET,HEAD,PUT,PATCH,POST,DELETE
Access-Control-Allow-Origin: https://localhost:44320
Connection: keep-alive
Content-Length: 0
Date: *** GMT
Keep-Alive: timeout=5
Vary: Origin, Access-Control-Request-Headers
X-Powered-By: Express
```

#### Extract request http headers

Set a breakpoint on `res.status(404).send("404: Sorry can't find that!")` line to get req data
```js
app.use(cors(corsOptions), function (req, res, next) {
    res.status(404).send("404: Sorry can't find that!")
})
```
Inspect the req variable in `Immediate Window` or `Watch`
```js
req.get('access-control-request-method')
"PUT"
```
or
```
req.headers['access-control-request-method']
"PUT"
```


#### Making HTTP Requests in Node.js with node-fetch
https://stackabuse.com/making-http-requests-in-node-js-with-node-fetch/

### Set up Your MongoDb in NodeJs Project

[Set up Your NodeJs Project](https://docs.mongodb.com/drivers/node/current/quick-start/)
```js
// Connection URL to MongoDb
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);
```
