const express = require("express");
const app = express();
const db = require('./db');


app.use(express.json());


const Task = require('./models/task');


app.post('/tasks', async (req, res) => {
    try {
        const data = req.body;
        const newtask = new Task(data);
        const response = await newtask.save();
        res.status(201).json(response);
        console.log("data saved is");
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
})

app.get('/tasks', async (req, res) => {
    try {
        const data = await Task.find();
        console.log("data fetched");
        res.status(201).json(data);

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
})



app.get('/', (req, res) => {
    res.send("hello there welcome to our hotel");
})

app.get('/home', (req, res) => {
    let num = 10;
    res.send(`hello boys its your home ${num}`);
})

//import router files
const personroutes = require('./routes/personRoutes');
app.use('/person',personroutes);


//import router of menu
const menuroutes=require('./routes/menuRoutes')
app.use('/menu',menuroutes);


app.listen(5000, () => console.log("Server running"));