var express= require('express');
var bodyParser = require('body-parser');

var app= express();
var port =process.env.PORT || 3000;
var ip= process.env.IP || "127.0.0.1";
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

app.post('/', function(req,res){
    console.log('Hello world');
    console.log(req.body);
    if(req.body.queryResult.action =="checkVote"){
      
        var age= req.body.queryResult.parameters.age;
        console.log(age);
        var age1= parseFloat(age[0].amount);
        var response="";
        
        if (age1>=18){
            response="Yes";
        }
        else {
            response="No";
        }

        let responseObj={
            "fulfillmentText":response
           ,"fulfillmentMessages":[
               {
                   "text": {
                       "text":[ response
                       ]
                   }
               }
           ]
           ,"source":"webhook"
       }
       return res.json(responseObj);
    } else if (req.body.queryResult.action =="Add")
    {
        var sum= parseFloat(req.body.queryResult.parameters.number)+ parseFloat(req.body.queryResult.parameters.number1);
        var responseText= "The sum of "+ req.body.queryResult.parameters.number + "and" + req.body.queryResult.parameters.number1 + "="+sum;
        let responseObj={
            "fulfillmentText":responseText
           ,"fulfillmentMessages":[
               {
                   "text": {
                       "text":[ responseText
                       ]
                   }
               }
           ]
           ,"source":"webhook"
       }
       return res.json(responseObj);
    }
})
app.listen(port,ip);