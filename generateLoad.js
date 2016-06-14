//Description
//End points are called in sequence (i.e. Only when a response is received is the next request to the REST end point made)
//
//Args
//Argument 1 - How many times to call end points

console.log("Starting to call REST Services");

//Define Variables
var querystring = require('querystring');
var https = require('https');
var loopTimes = process.argv[2];
var count = 0;

//Read config file
var fs, configurationFile;
configurationFile = 'configuration.json';
fs = require('fs');
var configuration = JSON.parse(
    fs.readFileSync(configurationFile)
);


//Call Perform Request function
performRequest(configuration[0].host, configuration[0].path,'GET', '', configuration[0].clientId, configuration[0].clientSecret, configuration[0].methodName, function(data) {
});

//Random Integer function
// Returns a random integer between min (included) and max (excluded)
// Using Math.round() will give you a non-uniform distribution!
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}


//Perform Request Function
 function performRequest(fHost, endpoint, method, data, fClientId, fClientSecret, methodName, success) {
   count = count +1;
   loopTimes = loopTimes - 1;
   console.log("Invocation: " + count);
   console.log("Method: " + methodName);

   var dataString = JSON.stringify(data);
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
       //console.log(responseString);
       var responseObject = JSON.parse(responseString);
       success(responseObject);
       if(loopTimes > 0)
       {
         var randomInteger = getRandomInt(0, configuration.length);
         //Repeat call to Perform Request function
         performRequest(configuration[randomInteger].host, configuration[randomInteger].path, configuration[randomInteger].method, '', configuration[randomInteger].clientId, configuration[randomInteger].clientSecret, configuration[randomInteger].methodName, function(data) {
         });
       }
       else
       {
         console.log("Script Complete");
       }
     });
   });

   req.write(dataString);
   req.end();
 }
