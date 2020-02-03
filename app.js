var express=require("express"); 
var bodyParser=require("body-parser"); 


const mongoose = require('mongoose'); 
mongoose.connect('mongodb://localhost:27017/test'); 
var db=mongoose.connection; 
db.on('error', console.log.bind(console, "connection error")); 
db.once('open', function(callback){ 
	console.log("connection succeeded"); 
}) 

var app=express() 
app.set('view engine' ,'ejs');

app.use(bodyParser.json()); 
app.use(express.static('public')); 
app.use(bodyParser.urlencoded({ 
	extended: true
})); 



var todoSchema = new mongoose.Schema({
	name : 
	{
		type : String
	},
	level :
	{
		type : Number
	}
});
var Todo = mongoose.model('Todo',todoSchema);

app.post('/response', function(req,res){ 
	var name = req.body.name; 
	var level= req.body.level;
	var  todo = new Todo({name: name,level: level});
 
 todo.save();
 res.render('response');
			console.log('record inserted sucessfully');
	}); 
		

app.get('/display', function(req,res){
	
	Todo.find().sort([["level","descending"]]).
	then(data => {
		console.log(data);
		res.render('display',{
			pageTitle :'leaderboard',
		todos :data
	});
}).
  catch(err =>
  {
	  console.log('error')
  });
}) 


app.get('/',function(req,res){ 
res.render('form');
}).listen(9000) 


console.log("server listening at port 9000"); 
