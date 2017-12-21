//backend javascript
var express = require('express');
var app = express();
var moment = require('moment');
var fs = require('fs');
var path = require('path');

//use the enviroment port or port 80
var port = process.env.PORT || 80;

app.get('/',function(req,res){
  var fileName = path.join(__dirname+'/views/index.html');
  res.sendFile(fileName,function(err){
    if(err){
      console.log(err);
      res.status(err.status).end();
    }else{
      console.log('Sent:',fileName);
    }
  });
});

app.get('/:datastring',function(req,res){
  var myDate;
  if(/^[0-9]*$/g.test(req.params.datastring)){
    myDate = moment(req.params.datastring,'X');
  }else{
    myDate = moment(req.params.datastring,'MMMM D, YYYY');
  }
  if(myDate.isValid()){
    res.json({
      unix: myDate.format('X'),
      natural: myDate.format('MMMM D, YYYY')
    });
  }else{
    res.json({
      unix: null,
      natural: null,
    });
  }
});

app.listen(port);