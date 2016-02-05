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
      console.log(sequences);
      res.render('user/index', {
        user: user,
        sequences: sequences
      })
    })
  });
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

module.exports = router;
