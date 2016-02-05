var express = require('express');
var db = require('../lib/db_builder');
var router = express.Router();


router.get('/', function(req, res, next){
  db.returnPublicSequences(function(sequences){
    var id = req.isAuthenticated() ? req.user.id : null
    var name = req.isAuthenticated() ? req.user.first_name + " " + req.user.last_name : null;
    res.render('sequences/all', {sequences: sequences, user:{
      exists: req.isAuthenticated(),
      id: id,
      name: name
      }
    })
  })
})

router.get('/:id', function(req, res, next){
  db.returnUserSequence(req.params.id, function(usersequence){
    var id = req.isAuthenticated() ? req.user.id : null
    var name = req.isAuthenticated() ? req.user.first_name + " " + req.user.last_name : null;
    if(usersequence.is_public){
      res.render('sequences/one', {usersequence: usersequence, user: {
        exists: req.isAuthenticated(),
        id: id,
        name, name
        }
      });
    }else{
      res.send("This isn't public, sorry bruh.")
    }
  });
})







module.exports = router;
