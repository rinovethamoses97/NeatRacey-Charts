var express=require("express");
var cors=require("cors");
var bodyparser=require("body-parser");
var app=express();
app.use(cors());
app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());
app.use(express.static(__dirname+"/public"));
app.set('view engine','ejs');
app.get('/',function(req,res){
    res.render('chart');
});
app.get('/combined',function(req,res){
    res.render('chartCombined');
});

app.listen(process.env.PORT||3000,function(){
    console.log("Server Running");
});