const express = require('express')
const cors = require('cors');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
require('dotenv').config();

const app = express()
const port = 5000

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))


const uri = "mongodb+srv://volunteerUser:volunteerPass6945@cluster0.hftxd.mongodb.net/volunterrDbName?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
    const collection = client.db("volunterrDbName").collection("volunterrDbCollectionName");
    const collectionWorker = client.db("volunterrDbName").collection("collectionWorker");
    console.log('databaseconnected')

    app.post("/addVolunteerField", (req, res) => {
        const addVolunteer = req.body;
        // collection.insertMany(addVolunteer)
        //     .then(result => {
        //         res.send(result)
        //         console.log(result)
        //     })
    })

    app.get('/addWork', (req, res) => {
        collection.find({})
            .toArray((err, documents) => {
                res.send(documents)
            })
    })

    app.post("/interestwork", (req, res) => {
        const addWorker = req.body;
        collectionWorker.insertOne(addWorker)
            .then(result => {
                res.send(result)
            })
    })

    app.get('/activities', (req, res) => {
        const activity = req.body;
        collectionWorker.find({ email: req.query.email })
            .toArray((err, documents) => {
                res.send(documents)
            })
    })

    app.delete('/delete/:id', (req, res) => {
        collectionWorker.deleteOne({ _id: ObjectId(req.params.id) })
            .then(result => {
                res.send(result.deletedCount > 0)
            })
    })









});



app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(process.env.PORT || port)