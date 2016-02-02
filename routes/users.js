var express = require('express');
var router = express.Router();
var knex = require('../db/knex');

/* GET users listing. */
router.get('/:username', function(req, res, next) {
  Users().where('user_name', req.params.username).first().then(function(user){
    Sequences().where('user_name', req.params.username).then(function(sequences){
      res.render('user/index', {user: user, sequences: sequences})
    })
  })
});

//This will need to have a knex call in here to pull up the user information.  Also some authentication to validate it.


function Sequences(){
  return knex('sequences');
}

function Users(){
  return knex('tempuser');
}


module.exports = router;
