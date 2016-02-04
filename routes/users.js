var express = require('express');
var router = express.Router();
var knex = require('../db/knex');
var passport = require('passport')

function Sequences(){
  return knex('sequences');
}

function Users(){
  return knex('users');
}


router.get('/test', function(req, res, next) {
  Users().select().then(function(result){
    res.send(result);
  });
})

router.get('/profile/:user_id', function(req, res, next) {
  Sequences().where('user_id', req.params.userid).then(function(sequences){
    res.render('user/index', {user: user, sequences: sequences})
  })
});

module.exports = router;
