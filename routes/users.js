var express = require('express');
var router = express.Router();
var knex = require('../db/knex');

function Sequences(){
  return knex('sequences');
}

function Users(){
  return knex('users');
}


/* GET users listing. */
router.get('/profile/:username', function(req, res, next) {
  Users().where('username', req.params.username).first().then(function(user){
    Sequences().where('user_name', req.params.username).then(function(sequences){
      // console.log(req.user);
      res.render('user/index', {user: user, sequences: sequences})
    })
  })
});

router.get('/test', function(req, res, next) {
  Users().select().then(function(result){
    res.send(result);
  });
})


module.exports = router;
