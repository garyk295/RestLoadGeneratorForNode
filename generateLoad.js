//Args
//Argument 1 - How many times to call end point
//
//
//Description
//End points are called in sequence (i.e. Only when a response is received is the next request to the REST end point made)


console.log("Starting to call REST Services");


var querystring = require('querystring');
var https = require('https');
var host = 'api.eu.apiconnect.ibmcloud.com';
var clientSecret = 'L4vD4sE1bR5pJ6cF6nU7sX2xI6yW7tJ0pW3tK4kJ5wA4kK3yQ5';
var clientId = 'cf69bc7d-c1da-4ca2-a770-5cbe91ca2245';
var loopTimes = process.argv[2];
var count = 0;

performRequest('/garykeanukibmcom-apiconnect/sb/api/Cars','GET', '', function(data) {
 console.log('Fetched Results');
});



//Perform Request Start
 function performRequest(endpoint, method, data, success) {
   count = count +1;
   loopTimes = loopTimes - 1;
   console.log("In Loop " + count)
   console.log("This many more times to loop " + loopTimes)
   var dataString = JSON.stringify(data);
   var headers = {};

  //  if (method == 'GET') {
  //    endpoint += '?' + querystring.stringify(data);
  //  }
  //  else {
     headers =
     {
       'X-IBM-Client-Id': clientId,
       'X-IBM-Client-Secret': clientSecret,
       'content-type': 'application/json',
       'accept': 'application/json'
     };

//   }
   var options = {
     host: host,
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
         performRequest('/garykeanukibmcom-apiconnect/sb/api/Cars','GET', '', function(data) {
          console.log('Fetched Results');
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

 //Perform Request End
