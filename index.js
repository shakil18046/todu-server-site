
const express = require('express')
const app = express()
const port = process.env.PORT || 5000
const cors = require('cors')
// middlewere
app.use(express.json());
app.use(cors())


const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = "mongodb+srv://admin:admin@cluster0.yhrn5.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run() {
    try{
        await client.connect();
        console.log("db connected");
        const collection = client.db("todo-app").collection("task");
        app.get("/collection", async (req, res)=>{
            const query = {};
            const cursor = collection.find(query);
            const result = await cursor.toArray();
            res.send(result);
        })
        app.post("/collection", async (req, res) => {
            const doc = req.body;
            const result = await collection.insertOne(doc);
            res.send(result)
        })
        app.delete('/collection/:id', async (req, res) => {
            const id = req.params.id;
            console.log(id);
            const query = { _id: ObjectId(id) };
            const result = await collection.deleteOne(query);
            res.send(result);
        })
    }finally{

    }
}
run().catch(console.dir);
app.get('/', (req, res) => {
  res.send('Hello Worldd!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})