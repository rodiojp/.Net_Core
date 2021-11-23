const express = require('express')
const app = express()
const port = 1337

// add body parser to the request
app.use(express.json());

app.get('/api/articles', (req, res) => {
    res.send(articles)
})

app.post('/api/articles', (req, res) => {
    var body = req.body;
    console.log(body);
    res.send(`post from /api/articles body:{ "name":"${body.name}" }`)
})

app.get('/api/articles/:name', (req, res) => {
    const article = articles.find(article => article.name === req.params.name);
    if (!article)
        res.status(404).send(`404: Sorry can't find the article '${req.params.name}'`)

    res.status(200).send(article)
})

app.post('/api/articles/:name', (req, res) => {
    const article = articles.find(article => article.name === req.params.name);
    if (!article)
        res.status(404).send(`404: Sorry can't find the article '${req.params.name}'`)

    res.status(200).send(article)
})

app.put('/api/articles/:name/voute', (req, res) => {
    const article = articleVoutes.find(article => article.name === req.params.name);
    if (!article)
        res.status(404).send(`404: Sorry can't find the article '${req.params.name}'`)
    article.voutes += 1
    res.status(200).send(article)
})


app.use(function (req, res, next) {
    res.status(404).send("404: Sorry can't find that!")
})


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

const articles = [
    {
        name: 'learn-react',
        title: 'The Fastest Way to Learn React',
        content: [
            `Welcome! Today we're going to be talking about the fastest way to
            learn React. We'll be discussing some topics such as proin congue
            ligula id risus posuere, vel eleifend ex egestas. Sed in turpis leo. 
            Aliquam malesuada in massa tincidunt egestas. Nam consectetur varius turpis, 
            non porta arcu porttitor non. In tincidunt vulputate nulla quis egestas. Ut 
            eleifend ut ipsum non fringilla. Praesent imperdiet nulla nec est luctus, at 
            sodales purus euismod.`,
            `Donec vel mauris lectus. Etiam nec lectus urna. Sed sodales ultrices dapibus. 
            Nam blandit tristique risus, eget accumsan nisl interdum eu. Aenean ac accumsan 
            nisi. Nunc vel pulvinar diam. Nam eleifend egestas viverra. Donec finibus lectus 
            sed lorem ultricies, eget ornare leo luctus. Morbi vehicula, nulla eu tempor 
            interdum, nibh elit congue tellus, ac vulputate urna lorem nec nisi. Morbi id 
            consequat quam. Vivamus accumsan dui in facilisis aliquet.`,
            `Etiam nec lectus urna. Sed sodales ultrices dapibus. 
            Nam blandit tristique risus, eget accumsan nisl interdum eu. Aenean ac accumsan 
            nisi. Nunc vel pulvinar diam. Nam eleifend egestas viverra. Donec finibus lectus 
            sed lorem ultricies, eget ornare leo luctus. Morbi vehicula, nulla eu tempor 
            interdum, nibh elit congue tellus, ac vulputate urna lorem nec nisi. Morbi id 
            consequat quam. Vivamus accumsan dui in facilisis aliquet.`,
        ]
    }, {
        name: 'learn-node',
        title: 'How to Build a Node Server in 10 Minutes',
        content: [
            `In this article, we're going to be talking looking at a very quick way
            to set up a Node.js server. We'll be discussing some topics such as proin congue
            ligula id risus posuere, vel eleifend ex egestas. Sed in turpis leo. 
            Aliquam malesuada in massa tincidunt egestas. Nam consectetur varius turpis, 
            non porta arcu porttitor non. In tincidunt vulputate nulla quis egestas. Ut 
            eleifend ut ipsum non fringilla. Praesent imperdiet nulla nec est luctus, at 
            sodales purus euismod.`,
            `Donec vel mauris lectus. Etiam nec lectus urna. Sed sodales ultrices dapibus. 
            Nam blandit tristique risus, eget accumsan nisl interdum eu. Aenean ac accumsan 
            nisi. Nunc vel pulvinar diam. Nam eleifend egestas viverra. Donec finibus lectus 
            sed lorem ultricies, eget ornare leo luctus. Morbi vehicula, nulla eu tempor 
            interdum, nibh elit congue tellus, ac vulputate urna lorem nec nisi. Morbi id 
            consequat quam. Vivamus accumsan dui in facilisis aliquet.`,
            `Etiam nec lectus urna. Sed sodales ultrices dapibus. 
            Nam blandit tristique risus, eget accumsan nisl interdum eu. Aenean ac accumsan 
            nisi. Nunc vel pulvinar diam. Nam eleifend egestas viverra. Donec finibus lectus 
            sed lorem ultricies, eget ornare leo luctus. Morbi vehicula, nulla eu tempor 
            interdum, nibh elit congue tellus, ac vulputate urna lorem nec nisi. Morbi id 
            consequat quam. Vivamus accumsan dui in facilisis aliquet.`,
        ]
    }, {
        name: 'my-thoughts-on-resumes',
        title: 'My Thoughts on Resumes',
        content: [
            `Today is the day I talk about something which scares most people: resumes.
            In reality, I'm not sure why people have such a hard time with proin congue
            ligula id risus posuere, vel eleifend ex egestas. Sed in turpis leo. 
            Aliquam malesuada in massa tincidunt egestas. Nam consectetur varius turpis, 
            non porta arcu porttitor non. In tincidunt vulputate nulla quis egestas. Ut 
            eleifend ut ipsum non fringilla. Praesent imperdiet nulla nec est luctus, at 
            sodales purus euismod.`,
            `Donec vel mauris lectus. Etiam nec lectus urna. Sed sodales ultrices dapibus. 
            Nam blandit tristique risus, eget accumsan nisl interdum eu. Aenean ac accumsan 
            nisi. Nunc vel pulvinar diam. Nam eleifend egestas viverra. Donec finibus lectus 
            sed lorem ultricies, eget ornare leo luctus. Morbi vehicula, nulla eu tempor 
            interdum, nibh elit congue tellus, ac vulputate urna lorem nec nisi. Morbi id 
            consequat quam. Vivamus accumsan dui in facilisis aliquet.`,
            `Etiam nec lectus urna. Sed sodales ultrices dapibus. 
            Nam blandit tristique risus, eget accumsan nisl interdum eu. Aenean ac accumsan 
            nisi. Nunc vel pulvinar diam. Nam eleifend egestas viverra. Donec finibus lectus 
            sed lorem ultricies, eget ornare leo luctus. Morbi vehicula, nulla eu tempor 
            interdum, nibh elit congue tellus, ac vulputate urna lorem nec nisi. Morbi id 
            consequat quam. Vivamus accumsan dui in facilisis aliquet.`,
        ]
    },
];

const articleVoutes = [
    {
        name: 'learn-react',
        voutes: 0
    }, {
        name: 'learn-node',
        voutes: 0
    }, {
        name: 'my-thoughts-on-resumes',
        voutes: 0
    }
];

