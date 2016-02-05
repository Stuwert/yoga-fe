var express = require('express');
var db = require('../lib/db_builder');
var router = express.Router();


router.get('/', function(req, res, next){

  res.send("I'm a banana")
})

router.get('/:id', function(req, res, next){
  db.returnUserSequence(req.params.id, function(usersequence){
    if(usersequence.is_public){
      res.render('sequences/one', usersequence);
    }else{
      res.send("This isn't public, sorry bruh.")
    }
  });
})






module.exports = router;
