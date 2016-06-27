# RestLoadGeneratorForNode
Node app that runs locally to call a REST end point a specified number of times

Instructions:
1. Update configuration.json file to list out REST endpoints to invoke, must be in format:

              //GET
                {
               "methodName" : "GET - Operation 1",
               "host" : "api.eu.apiconnect.ibmcloud.com",
               "path" : "/garykeanukibmcom-apiconnect/sb/api/Cars",
               "clientSecret" : "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
               "clientId" : "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
               "method": "GET",
               "data": ""
                }
                
              //POST
                {
               "methodName" : "POST - Operation 1",
               "host" : "api.eu.apiconnect.ibmcloud.com",
               "path" : "/garykeanukibmcom-apiconnect/sb/api/Cars",
               "clientSecret" : "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
               "clientId" : "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
               "method": "POST",
               "data":
                       {
                        "description": "Test Description 1",
                        "name": "Test Name 1",
                        "price": 1000,
                        "img_url": "test url 1"
                        }
                }

All the REST end points contained in the file are called randomly and not in the order they appear

2. Run the NodeJs app on the command line using command:

            node generateLoad.js <total number of invocations to make> <time between invocations in seconds>
            
            //example below would make 100 invocations to the REST endpoint defined in configuration.js (selected at random) and there would  be a 10 second wait between invocations
            
            node generateLoad.js 100 10
