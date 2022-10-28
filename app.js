const express = require("express");
const https = require("https");
const bodyParser=require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(request,response){
  response.sendFile(__dirname+"/index.html");
});
app.post("/",function(req,res){

  const query=req.body.cityName;
  const appid="70d99dfb21eb2695bd01bcce330e68ae";
  const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+appid+"&units=metric";
  https.get(url,function(response){
    response.on("data",function(d){
      const weatherdata=JSON.parse(d);
      const temp=weatherdata.main.temp;
      const description=weatherdata.weather[0].description;
      const icon=weatherdata.weather[0].icon;
      const imageurl="http://openweathermap.org/img/wn/"+icon+"@2x.png";
      res.write("<h1>The weather is " +description+" </h1>");
      res.write("<h1>The temperature in "+query+" is "+temp+" Celsius<h1>");
      res.write("<img src="+imageurl+">");
      res.send();


    })
  })
});


app.listen(3000, function() {
  console.log("server started running");
});
