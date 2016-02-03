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


/* GET users listing. */

router.get('/profile/:username', function(req,res,next){
  console.log(req.user);
  console.log("HIT!!!! ", req.isAuthenticated());
  res.send('IT WORKED!!!!!!!!')

});

router.get('/test', function(req, res, next) {
  Users().select().then(function(result){
    res.send(result);
  });
})

// router.get('/profile/:username', function(req, res, next) {
//   Users().where('username', req.params.username).first().then(function(user){
//     Sequences().where('user_name', req.params.username).then(function(sequences){
//       // console.log(req.sessionStore.MemoryStore);
//       console.log(req.session.passport);
//       console.log("REQ.USER " + req.user);
//       // var  p = JSON.parse(req.sessionStore)
//       // console.log(p.MemoryStore);
//       console.log();
//       for(x in req.sessionStore) {
//         if(x == 'sessions'){
//           console.log("x= " + typeof(x));
//         }
//     }
//       //console.log("******** USERNAME:" + "\n"+ user.username);
//       res.render('user/index', {user: user, sequences: sequences})
//     })
//   })
// });

function Sequences(){
  return knex('sequences');
}

function Users(){
  return knex('users');
}


module.exports = router;
