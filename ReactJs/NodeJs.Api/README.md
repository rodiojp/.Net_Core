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

To handle HTTP POST requests in Express.js version 4.16 and above, you need to install the middleware module called body-parser.

body-parser extracts the entire body portion of an incoming request stream and exposes it on req.body.

```js
// add body parser to the request
app.use(express.json());

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


