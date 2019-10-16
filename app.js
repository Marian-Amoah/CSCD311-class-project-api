const express = require("express");
const path = require('path');
const app = express();
const mongoose = require("mongoose");

//path to the views file
app.set('view engine','ejs');
app.set('views', path.join(__dirname, '/'));

app.use(express.static('public'));


app.get("/", (req, res) => {
    res.render('welcome');
});

app.listen(3000, () => {
    console.log("server has started!");
});


//connecting to the database
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/node-demo");

//creating a database schema
const nameSchema = new mongoose.Schema({
student_Id : String,
password: String
});

//creating a model from our schema
const User = mongoose.model("User", nameSchema);
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//building a CRUD endpoint
app.post("/addname", (req, res) => {
const myData = new User(req.body);
myData.save()
.then(item => {
res.send("item saved to database");
})
.catch(err => {
res.status(400).send("unable to save to database");

});

});

