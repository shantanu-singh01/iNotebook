const dotenv = require('dotenv')
dotenv.config();
const connectToMongo = require("./db");
const express = require('express');
connectToMongo();

const app = express();
const port = process.env.PORT || 5000;
var cors = require('cors')


app.use(cors())
app.use(express.json())


// Available routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes')); 

app.listen(port, ()=> {
    console.log(`iNotebook backend Listening on port ${port}`)
})

app.use("/", (req, res) => {
    res.send("Hello to iNotebook API");
});