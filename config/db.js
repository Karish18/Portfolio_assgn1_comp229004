//user-karishma
// password-Karishma@18
//connection string -mongodb+srv://Karishma:<password>@cluster229-004.hymr9.mongodb.net/test

//establishing the connection
let atlasDB = "mongodb+srv://Karishma:SgLMZUYqOGoTbOIC@cluster229-004.hymr9.mongodb.net/Authentication?retryWrites=true&w=majority";

//setting up the DB

let mongoose = require('mongoose');
module.exports= function(){

    mongoose.connect(atlasDB);
    let mongoDB = mongoose.connection;
    mongoDB.on('error',console.error.bind(console,'Connection Error :'));
    mongoDB.once('open', ()=>{
        console.log('Connected to MongoDB....');
    });
    return mongoDB;
}