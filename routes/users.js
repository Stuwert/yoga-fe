var express = require('express');
var router = express.Router();
var knex = require('../db/knex');
var passport = require('passport')

function Sequences(){
  return knex('user_sequences');
}

function Users(){
  return knex('users');
}

router.get('/:user_id', function(req, res, next){
  res.redirect('/users/profile/' + req.params.user_id);
});

router.get('/profile/:user_id', function(req, res, next) {
  Users().where('id', req.params.user_id).first().then(function(user){
    Sequences().where('user_id', req.params.user_id).then(function(sequences){
      console.log('ROUTES/USERS: rendering');
      console.log(user);
      console.log(sequences);
      res.render('user/index', {
        user: user, 
        sequences: sequences
      })
    })
  });
});

module.exports = router;
