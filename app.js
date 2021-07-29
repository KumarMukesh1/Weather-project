const express = require("express");
const app = express();
const https = require("https");
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req, res) {
    res.sendFile(__dirname+"/index.html");
});

app.post("/", function(req, res) {
    const query = req.body.cityName;
    const apikey = "0e3154568cd35152fa8994dab5967cd0";
    const units = "metric";
    url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&units="+units+"&appid="+apikey;
    https.get(url, function(response){
        console.log(response.statusCode);
        response.on("data", function(data){
            const weatherData = JSON.parse(data);
            console.log(weatherData);
            const temp = weatherData.main.temp;
            const weatherDescription =weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imageurl = "http://openweathermap.org/img/wn/"+icon+"@2x.png";
            res.write("<p>The weather condition is : "+weatherDescription+"<p>");
            res.write("<h1>The temperature is : "+temp+" celcius</h1>");
            res.write("<img src=" + imageurl +">");
            res.send();
        });
    });

});



app.listen(3000,function(req, res) {
    console.log("Good");
});