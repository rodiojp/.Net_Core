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

### Request body parser

<!--[What does body-parser do with express?](https://stackoverflow.com/questions/38306569/what-does-body-parser-do-with-express#answer-43626891)-->

To handle HTTP POST requests in Express.js version 4.16 and above, you need to install the middleware module called body-parser.

body-parser extracts the entire body portion of an incoming request stream and exposes it on req.body.

```js
// add body parser to the request
app.use(express.json());

```
