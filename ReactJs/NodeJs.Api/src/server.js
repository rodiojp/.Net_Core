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
