const express = require('express')
const app = express()
const cors = require('cors')
const corsOptions = {
    origin: 'https://localhost:44320', //origin: 'http://example.com',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

// or as an es module:
// import { MongoClient } from 'mongodb'
const { MongoClient } = require('mongodb');

// Connection URL for MongoDb
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);
// Database Name
const dbName = 'my-blog';

// add body parser to the request
app.use(express.json());

// Application localhost port:
const port = 1337


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

const withDb = async (collectionName, operation) => {
    try {
        if (!client) {
            console.log('DB client is not identified!');
            return;
        }
        // Use connect method to connect to the server
        await client.connect()
        //.catch(err => { console.log(err); });
        console.log('Connected successfully to server');
        const db = client.db(dbName);
        const collection = db.collection(collectionName);

        await operation(collection)
        console.log(`withDb - done!`);
    } catch (e) {
        console.error(e)
        res.status(500).json({ message: 'An error has occurred:', e })
    }
    finally {
        client.close();
    }
}

app.get('/api/articles', cors(corsOptions), async (req, res) => {
    const collectionName = 'articles'
    await withDb(collectionName, async (collection) => {

        const query = {};
        const projection = { _id: 0, name: 1, title: 1, content: 1 };
        const articles = await collection.find(query).project(projection)
            .sort({ name: 1 })
            .toArray();
        if (!articles) {
            res.status(404).send(`404: Sorry can't find any article `)
        }
        else {
            res.status(200).json(articles)
        }
    })
    console.log(`get '/api/articles/' - done!`);
})

app.post('/api/articles/', cors(corsOptions), async (req, res) => {
    const collectionName = 'articles'
    await withDb(collectionName, async (collection) => {
        const { name, title, content } = req.body;
        if (!name || !title || !content)
            res.status(422).send()

        let query = { name: name }
        let articleFound = await collection.findOne(query);
        console.log('Found article =>', articleFound);

        if (articleFound) {
            res.status(404).send(`404: The article '${articleFound.name}' is already exists!`)
        } else {
            let insertQuery = { name: name, title: title, content: content }
            await collection.insert(insertQuery);
            let articleIserted = await collection.findOne(query);
            console.log('Inserted article =>', articleIserted);
            res.status(200).json(articleIserted)
        }
    })
    console.log(`post '/api/articles/:name' - done!`);
})

app.get('/api/articles/:name', cors(corsOptions), async (req, res) => {
    console.log(`Start get '/api/articles/${req.params.name}' - done!`);

    const collectionName = 'articles'
    await withDb(collectionName, async (collection) => {
        const query = { name: req.params.name };
        const projection = { _id: 0, name: 1, title: 1, content: 1 };
        const article = await collection.findOne(query, projection);
        if (!article) {
            const errorMessage = `404: Sorry can't find the article '${req.params.name}'`
            console.log(errorMessage);
            res.status(404).send(errorMessage)
        }
        else {
            res.status(200).json(article)
        }
    })
    console.log(`End get '/api/articles/${req.params.name}'`);
})

app.put('/api/articles/:name/voute', cors(corsOptions), async (req, res) => {
    const collectionName = 'articleVoutes'
    try {
        if (!client) {
            return;
        }
        // Use connect method to connect to the server
        await client.connect()
            .catch(err => { console.log(err); });
        console.log('Connected successfully to server');
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        // ---  
        //let query = { name: req.params.name  }
        let article = await collection.findOne({ name: req.params.name });
        console.log('Found article =>', article);
        // ---
        if (!article)
            res.status(404).send(`404: Sorry can't find the article '${req.params.name}'`)

        article.voutes += 1;
        await collection.update({ _id: article._id }, { $set: { voutes: article.voutes } })

        let updatedArticle = await collection.findOne({ name: req.params.name })
        console.log('Updated article =>', updatedArticle);

        res.status(200).json(updatedArticle)
        client.close()
    } catch (e) {
        console.error(e)
        res.status(500).json({ message: 'An error has occurred:', e })
    }
})

app.get('/api/articles/:name/voute', cors(corsOptions), async (req, res) => {
    const collectionName = 'articleVoutes'
    await withDb(collectionName, async (collection) => {
        if (!collection)
            console.log('Collection is not defined');

        let articleVoute = await collection.findOne({ name: req.params.name });
        console.log('Found articleVoute =>', articleVoute);
        if (!articleVoute) {
            res.status(404).send(`404: Sorry can't find the articleVoute '${req.params.name}'`)
        } else {
            res.status(200).json(articleVoute)
        }
    })
    console.log(`get '/api/articles/:name/voute' - done!`);
})

app.put('/api/articles/:name/addcomment', cors(corsOptions), async (req, res) => {
    const { username, comment } = req.body;
    if (!username || !comment)
        res.status(422).send()

    const collectionName = 'articleVoutes'
    try {
        if (!client) {
            return;
        }
        // Use connect method to connect to the server
        await client.connect()
        //    .catch(err => { console.log(err); });
        console.log('Connected successfully to server');
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        // ---  
        //let query = { name: req.params.name  }
        let article = await collection.findOne({ name: req.params.name })
        console.log('Found article =>', article);
        // ---
        if (!article)
            res.status(404).send(`404: Sorry can't find the article '${req.params.name}'`)

        article.comments.push({ username: username, comment: comment })

        await collection.update({ _id: article._id }, { $set: { comments: article.comments } })

        let updatedArticle = await collection.findOne({ name: req.params.name })
        console.log('Updated article =>', updatedArticle);

        res.status(200).json(updatedArticle)

        client.close()
    } catch (e) {
        console.error(e)
        res.status(500).json({ message: 'An error has occurred:', e })
    }
})

// This should be the last route function
app.use(cors(corsOptions), function (req, res, next) {
    res.status(404).send("404: Sorry can't find that!")
})



//const articles = [
//    {
//        name: 'learn-react',
//        title: 'The Fastest Way to Learn React',
//        content: [
//            `Welcome! Today we're going to be talking about the fastest way to
//            learn React. We'll be discussing some topics such as proin congue
//            ligula id risus posuere, vel eleifend ex egestas. Sed in turpis leo. 
//            Aliquam malesuada in massa tincidunt egestas. Nam consectetur varius turpis, 
//            non porta arcu porttitor non. In tincidunt vulputate nulla quis egestas. Ut 
//            eleifend ut ipsum non fringilla. Praesent imperdiet nulla nec est luctus, at 
//            sodales purus euismod.`,
//            `Donec vel mauris lectus. Etiam nec lectus urna. Sed sodales ultrices dapibus. 
//            Nam blandit tristique risus, eget accumsan nisl interdum eu. Aenean ac accumsan 
//            nisi. Nunc vel pulvinar diam. Nam eleifend egestas viverra. Donec finibus lectus 
//            sed lorem ultricies, eget ornare leo luctus. Morbi vehicula, nulla eu tempor 
//            interdum, nibh elit congue tellus, ac vulputate urna lorem nec nisi. Morbi id 
//            consequat quam. Vivamus accumsan dui in facilisis aliquet.`,
//            `Etiam nec lectus urna. Sed sodales ultrices dapibus. 
//            Nam blandit tristique risus, eget accumsan nisl interdum eu. Aenean ac accumsan 
//            nisi. Nunc vel pulvinar diam. Nam eleifend egestas viverra. Donec finibus lectus 
//            sed lorem ultricies, eget ornare leo luctus. Morbi vehicula, nulla eu tempor 
//            interdum, nibh elit congue tellus, ac vulputate urna lorem nec nisi. Morbi id 
//            consequat quam. Vivamus accumsan dui in facilisis aliquet.`,
//        ]
//    }, {
//        name: 'learn-node',
//        title: 'How to Build a Node Server in 10 Minutes',
//        content: [
//            `In this article, we're going to be talking looking at a very quick way
//            to set up a Node.js server. We'll be discussing some topics such as proin congue
//            ligula id risus posuere, vel eleifend ex egestas. Sed in turpis leo. 
//            Aliquam malesuada in massa tincidunt egestas. Nam consectetur varius turpis, 
//            non porta arcu porttitor non. In tincidunt vulputate nulla quis egestas. Ut 
//            eleifend ut ipsum non fringilla. Praesent imperdiet nulla nec est luctus, at 
//            sodales purus euismod.`,
//            `Donec vel mauris lectus. Etiam nec lectus urna. Sed sodales ultrices dapibus. 
//            Nam blandit tristique risus, eget accumsan nisl interdum eu. Aenean ac accumsan 
//            nisi. Nunc vel pulvinar diam. Nam eleifend egestas viverra. Donec finibus lectus 
//            sed lorem ultricies, eget ornare leo luctus. Morbi vehicula, nulla eu tempor 
//            interdum, nibh elit congue tellus, ac vulputate urna lorem nec nisi. Morbi id 
//            consequat quam. Vivamus accumsan dui in facilisis aliquet.`,
//            `Etiam nec lectus urna. Sed sodales ultrices dapibus. 
//            Nam blandit tristique risus, eget accumsan nisl interdum eu. Aenean ac accumsan 
//            nisi. Nunc vel pulvinar diam. Nam eleifend egestas viverra. Donec finibus lectus 
//            sed lorem ultricies, eget ornare leo luctus. Morbi vehicula, nulla eu tempor 
//            interdum, nibh elit congue tellus, ac vulputate urna lorem nec nisi. Morbi id 
//            consequat quam. Vivamus accumsan dui in facilisis aliquet.`,
//        ]
//    }, {
//        name: 'my-thoughts-on-resumes',
//        title: 'My Thoughts on Resumes',
//        content: [
//            `Today is the day I talk about something which scares most people: resumes.
//            In reality, I'm not sure why people have such a hard time with proin congue
//            ligula id risus posuere, vel eleifend ex egestas. Sed in turpis leo. 
//            Aliquam malesuada in massa tincidunt egestas. Nam consectetur varius turpis, 
//            non porta arcu porttitor non. In tincidunt vulputate nulla quis egestas. Ut 
//            eleifend ut ipsum non fringilla. Praesent imperdiet nulla nec est luctus, at 
//            sodales purus euismod.`,
//            `Donec vel mauris lectus. Etiam nec lectus urna. Sed sodales ultrices dapibus. 
//            Nam blandit tristique risus, eget accumsan nisl interdum eu. Aenean ac accumsan 
//            nisi. Nunc vel pulvinar diam. Nam eleifend egestas viverra. Donec finibus lectus 
//            sed lorem ultricies, eget ornare leo luctus. Morbi vehicula, nulla eu tempor 
//            interdum, nibh elit congue tellus, ac vulputate urna lorem nec nisi. Morbi id 
//            consequat quam. Vivamus accumsan dui in facilisis aliquet.`,
//            `Etiam nec lectus urna. Sed sodales ultrices dapibus. 
//            Nam blandit tristique risus, eget accumsan nisl interdum eu. Aenean ac accumsan 
//            nisi. Nunc vel pulvinar diam. Nam eleifend egestas viverra. Donec finibus lectus 
//            sed lorem ultricies, eget ornare leo luctus. Morbi vehicula, nulla eu tempor 
//            interdum, nibh elit congue tellus, ac vulputate urna lorem nec nisi. Morbi id 
//            consequat quam. Vivamus accumsan dui in facilisis aliquet.`,
//        ]
//    },
//];

//const articleVoutes = [
//    {
//        name: 'learn-react',
//        voutes: 0,
//        comments: []
//    }, {
//        name: 'learn-node',
//        voutes: 0,
//        comments: []
//    }, {
//        name: 'my-thoughts-on-resumes',
//        voutes: 0,
//        comments: []
//    }
//];

