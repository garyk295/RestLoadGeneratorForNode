//Description
//End points are called in sequence (i.e. Only when a response is received is the next request to the REST end point made)
//


console.log("Starting to call REST Services");

//Define Variables
var querystring = require('querystring');
var https = require('https');
var loopTimes = process.argv[2];
var timeBetweenCalls = process.argv[3];
var count = 0;

//Convert timeBetweenCalls from seconds to milliseconds
timeBetweenCalls = timeBetweenCalls * 1000;

//Read configuration file
var fs, configurationFile;
configurationFile = 'configuration.json';
fs = require('fs');
var configuration = JSON.parse(
    fs.readFileSync(configurationFile)
);


//Call Perform Request function starting with the first end point in the configuration file
performRequest(configuration[0].host, configuration[0].path, configuration[0].method, configuration[0].data, configuration[0].clientId, configuration[0].clientSecret, configuration[0].methodName, function(data) {
console.log(data);
});

//Random Integer function
// Returns a random integer between min (included) and max (excluded)
// Using Math.round() will give you a non-uniform distribution!
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}


//Perform Request Function
 function performRequest(fHost, endpoint, method, requestData, fClientId, fClientSecret, methodName, result) {
   count = count +1;
   loopTimes = loopTimes - 1;
   console.log("Invocation: " + count + " |  Method: " + methodName);

   var dataString = JSON.stringify(requestData);
   var headers = {};

   headers =
   {
     'X-IBM-Client-Id': fClientId,
     'X-IBM-Client-Secret': fClientSecret,
     'content-type': 'application/json',
     'accept': 'application/json'
   };

   var options = {
     host: fHost,
     path: endpoint,
     method: method,
     headers: headers
   };

   var req = https.request(options, function(res) {

       res.setEncoding('utf-8');

       var responseString = '';

       res.on('data', function(data) {
         responseString += data;

       });

       res.on('end', function() {

           if(res.statusCode != 200)
           {
             result("Error: " + res.statusCode + " | " + res.statusMessage);
             //console.log(res);
           }
           else
           {
             result("Success: " + res.statusCode + " | " + res.statusMessage);
             //Don't need to do anything with the response object therefore the below code is commented out
             //var responseObject = JSON.parse(responseString);
           }


           if(loopTimes > 0)
           {
             var randomInteger = getRandomInt(0, configuration.length);
             //Repeat call to Perform Request function
             setTimeout(function() {
               performRequest(configuration[randomInteger].host, configuration[randomInteger].path, configuration[randomInteger].method, configuration[randomInteger].data, configuration[randomInteger].clientId, configuration[randomInteger].clientSecret, configuration[randomInteger].methodName, function(data) {
                 console.log(data);
               });
             }, timeBetweenCalls
            );
           }
           else
           {
             console.log("Script Complete");
           }
       });



   });

   req.write(dataString);
   req.end();
   req.on('error', function(e) {
     console.log("Error: " + e);

     var randomInteger = getRandomInt(0, configuration.length);
     //Repeat call to Perform Request function
     setTimeout(function() {
       performRequest(configuration[randomInteger].host, configuration[randomInteger].path, configuration[randomInteger].method, configuration[randomInteger].data, configuration[randomInteger].clientId, configuration[randomInteger].clientSecret, configuration[randomInteger].methodName, function(data) {
         console.log(data);
       });
     }, timeBetweenCalls
    );
   });
 }
