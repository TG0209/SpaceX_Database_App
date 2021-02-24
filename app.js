const express        = require("express"),
	  app            = express(),
	  methodOverride = require("method-override"),
	  bodyParser     = require("body-parser"),
	  PORT           = process.env.PORT || 3000,
	  data_route   = require("./routes/data")

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + "/public"));
app.set("view engine","ejs");
app.use(methodOverride("_method"));
app.use("/", data_route);


app.listen(PORT,function(){
	console.log("sever started!!");
});