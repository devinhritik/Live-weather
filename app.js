const express = require("express");
const app = express();
const https = require("https");
const bodyParser = require("body-parser");
const { request } = require("http");
const { json } = require("body-parser");


app.use(bodyParser.urlencoded({extended: true}));

app.get("/",function(req,res){
    res.sendFile(__dirname + "/index.html");    
});

app.post("/",function(req,res){
   
        const query = req.body.CityName;
        const apiKey = "2edb9ea57a0e196d84291d2ff90c8bb8";
        const unit = "metric";
    
        const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query +"&appid=" + apiKey + "&units=" + unit ;
    
    https.get(url,function(response){
    
       console.log("statuscode: ",response.statusCode); //https response code mdn reference
    //    console.log("headers: ",response.headers); // it print response code 
    
    
       /* 200 statuscode means everything is correct 
       if we made any mistake then it will through 404 error code  */
    
        response.on("data",function(data){
           
            // console.log(data);   
            
            // this will print the hexadecimal code of the weather data that's why we have to parse the data into JSON format to to get the readable format.
    
            const weatherData = JSON.parse(data); // this is how we convert hexadecimal data into JSON format.
    
            const temp= weatherData.main.temp;
            const des = weatherData.weather[0].description;
            const humdity = weatherData.main.humidity; // use json view awesome extention to easlit get the path of the certian part to get it from data.
    
            const icon = weatherData.weather[0].icon;
            const imageUrl = "http://openweathermap.org/img/wn/"+icon+"@2x.png";
    
            // const object = {
            //     name: "Hritik",
            //     favouriteFood: "Malai Chapp"
            // }
    
            // console.log(JSON.stringify(object));      // this is basically to make object format of javascript to normal string which take minimum space; 
    
    
    
            // now we recived all the data using get request 
    
            //now we will try to print that data into our server to response (res);
    
    
            // res.send("<h1>The temperature in Delhi is " + temp + " degree Celcius <h1/>" + "The weather is currently " + des); 
            // instead of doing this like that  use res.write.
    
                res.write("<p>The weather is currently " + des +"<p/>"); 
                res.write("<h1>The temperature in "+ query + " is " + temp + " degree Celcius <h1/>");  
                res.write("<img src =" + imageUrl + ">");
                
    
               
    
                res.send();
    
            
            // we can send only one res.send method but we can send multipe res.write method;
    
        });
    
    
    
    
    });

});



app.listen(3000,function(){
    console.log("server is stared on 3000 server")
});