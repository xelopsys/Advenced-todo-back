import 'dotenv/config'
import express from 'express'
import { TodoList } from './database/Lists.model.js'
import { mongoose } from 'mongoose'
import bodyParser from 'body-parser'
import cors from 'cors'
import { Headers } from 'node-fetch';
const headers = new Headers()

const app = express()

const port = process.env.PORT || 3002

headers.set('Content-Type', 'application/json')
headers.append('Access-Control-Allow-Origin', 'https://todo-app-xxhh8.ondigitalocean.app/');
headers.append('Access-Control-Allow-Origin', 'https://todo-nextauth.netlify.app/');
headers.append('Access-Control-Allow-Credentials', 'true');

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const URI = `mongodb+srv://<username>:<password>@<dbname>.dfoka.mongodb.net/?retryWrites=true&w=majority`;

const main = async (req, res) => {
    await mongoose.connect(
        URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then((result) => {
        console.log('Connected to MongoDB')
    });

    app.get('/todo', async (req, res) => {
        const lists = await TodoList.find()
        res.json({ data: lists })
    })



    app.post('/todo/create', async (req, res) => {
        const { id, title, content } = req.body;

        try {
            const user = await TodoList.create({ id: id, title: title, content: content });
            res.json({ data: user });
        } catch (err) {
            console.log(err.message);
            res.status(501).json({ error: err })
        }

    })

    // app.put('/todo/update', async (req, res) => {
    //     const { id } = req.body;

    //     try {
    //         const user = await TodoList.findOneAndUpdate({ id }, { title, content }, { new: true });
    //         res.json({ data: user });
    //     } catch (err) {
    //         console.log(err.message);
    //         res.status(501).json({ error: err })
    //     }
    // })
    app.patch('/todo/update', async (req, res) => {
        const { id, title, content } = req.body;

        try {
            const user = await TodoList.findOneAndUpdate({ id: id }, { title: title, content: content }, { new: true });
            res.json({ data: user });
        } catch (err) {
            console.log(err.message);
            res.status(501).json({ error: err })
        }
    })


    app.delete('/todo/delete/', async (req, res) => {
        const { id } = req.body;

        try {
            const user = await TodoList.findOneAndDelete({ id });
            res.json({ data: user });
        } catch (err) {
            console.log(err.message);
            res.status(501).json({ error: err })
        }
    })


    app.listen(port, () => {
        console.log(`Server listening on port ${port}`)
    })


}



main().catch((err) => {
    console.log(err.message)
})
