var express = require('express');
var router = express.Router();
var knex = require('../db/knex');

/* GET users listing. */
router.get('/profile/:username', function(req, res, next) {
  Users().where('user_name', req.params.username).first().then(function(user){
    Sequence().where('user_name', req.params.username).then(function(sequences){
      res.render('users/index', {user: req.user, info: user, sequences: sequences})

    })
  })
});

function Sequences(){
  return knex('sequences');
}

function Users(){
  return knex('tempuser');
}


module.exports = router;
