const express = require('express');
const app = express();

const mongoose = require('mongoose');
const body_parser = require('body-parser');
const ejs = require('ejs');

app.use(express.static(__dirname + '/static'));

app.use(body_parser.urlencoded({extended: true}));
app.use(body_parser.json());
//app.use(mongoose);

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

//connect to local mongodb server instance
mongoose.connect('mongodb://localhost/basic_mongoose_app');

//create schema
var UserSchema = new mongoose.Schema({
  name: String,
  age: Number
});

//create model
mongoose.model('User', UserSchema);

//retreive model
var User = mongoose.model('User');


app.get('/', (req, res)=>{
  console.log('get - req to "/"');
  var users = User.find({}, (err, users)=>{
    console.log(users);
    res.render('index', {'users': users});
  });
  //User.deleteMany({});
  //console.log(users);
  //res.render('index', {'users': users});
})

app.post('/users', (req, res)=>{
  console.log('post - req to "/users"');

  var user = new User({name: req.body.name, age: req.body.age});

  user.save(err=>{
    if(err){
      console.log('There was an issue during the save operation!');
    }else{
      console.log('User has been added successfully!');
      res.redirect('/');
    }
  });
  
  // var user = {
  //   name: req.body.name,
  //   age: req.body.age
  // }

  // res.render('users', {"user": user});
})

app.listen(7777, function(){
  console.log('Express app listening on port 7777');
})
