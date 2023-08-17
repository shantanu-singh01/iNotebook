const mongoose = require('mongoose');

const connectToMongo = async ()=> {
    mongoose.connect(process.env.mongoURI, { useNewUrlParser: true}, await console.log("connected to database successfully")) 
    
}

module.exports = connectToMongo;