var express = require('express');
var router = express.Router();
var knex = require('../db/knex');
var passport = require('passport')
var multer  =   require('multer');
var storage =   multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './public/img');
  },
  filename: function (req, file, callback) {
    callback(null, file.fieldname + '-' + Date.now());
  }
});
var upload = multer({ storage : storage}).single('displayImage');

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

router.get('/profile/:username', function(req, res, next) {
  Users().where('username', req.params.username).first().then(function(user){
    Sequences().where('user_id', req.params.userid).then(function(sequences){
      res.render('user/index', {user: user, sequences: sequences})
    })
  })
});

router.post('/photos/:id', function(req,res,next){
  upload(req,res,function(err) {
      if(err) {
          console.log(err);
          return res.end("Error uploading file.");
      }
      res.end("File is uploaded");
  });
})

function Sequences(){
  return knex('user_sequences');
}

function Users(){
  return knex('users');
}


module.exports = router;
