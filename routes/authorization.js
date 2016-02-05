var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy;
var passconfig = require('../config/passport')
var knex = require('../db/knex.js')
var server = require('../serverlogic/serverlogic.js')
var multer = require('multer');
var storage = multer.diskStorage({
  destination: function(req, file, callback) {
    callback(null, './public/img');
  },
  filename: function(req, file, callback) {
    callback(null, file.fieldname + '-' + Date.now());
  }
});


function Sequences() {
  return knex('user_sequences');
}

function Users() {
  return knex('users')
}

router.get('/', function(req, res, next) {
  res.redirect('/auth/login')
})

router.get('/login', function(req, res, next) {
  res.render('auth/login')
});

// router.post('/login',
// passport.authenticate('local', function(err, user, info) {
//     if (err) { return next(err); }
//     if (!user) { return res.redirect('/auth/login'); }
//     req.logIn(user, function(err) {
//       if (err) { return next(err); }
//       return res.redirect('/users/profile');
//     });
//   })(req, res, next);
// // });

router.post('/login', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err)
      return next(err);
    if (!user)
      return res.redirect('/auth/login');

    req.logIn(user, function(err) {
      if (err)
        return next(err);
      console.log('logging in user ' + user.id);
      return res.redirect('/users/profile/' + user.id);
    });

  })(req, res, next);
});


router.get('/facebook', passport.authenticate('facebook'), function(req, res, next) {
  res.redirect('/auth')
});

// router.get('/home', function(req, res, next){
//   res.send("You did it!")
//   //req.query.option would equal 'my-cool-option'
//   // var usersName = localStorage.getItem('name').replace(/['"]+/g, '');
//   // var originalUrl = localStorage.getItem('photo');
//   // var url = originalUrl.replace(/['"]+/g, '');
// });


router.get('/facebook/callback',
  passport.authenticate('facebook', {
    // successRedirect : '/users/profile/hello',
    failureRedirect: '/'
  }),
  function(req, res, next) {
    Users().select().where('fb_id', req.user.id).first().then(function(result){
      res.redirect('/users/profile/'+result.id)
    })
  });
//  function(req,res,next){;
//   res.redirect('/')
// })


router.get('/signup', function(req, res, next) {
  res.render('auth/signup')
})

router.post('/signup', function(req, res, next) {
  // Need to create a req.user
  /* Function to compare B.crypt
  var p = bcrypt.compareSync(req.body.password , hash)
  */
  var pass = req.body.password
  var salt = bcrypt.genSaltSync(10);
  var hash = bcrypt.hashSync(req.body.password, salt);


  var insertObj = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    username: req.body.username,
    password: hash
  }
  console.log(insertObj);
  Users().select().where('username', req.body.username).then(function(rest) {
    console.log(rest);
    if (rest.length == 0) {
      Users().insert(insertObj).returning('id').then(function(resulted) {
        console.log("Does this work!!!");
        result = resulted[0]
        console.log(resulted[0]);
        res.redirect('/auth/' + result + '/profile/edit')
      });
    } else {
      res.render('auth/signup', {
        message: "Username Is Already In Use"
      })
    }

    // Redirect user to their profile page
  });
})

router.get('/:id/profile/edit', function(req, res, next) {

  Users().select().where('id', req.params.id).first().then(function(results) {

    res.render('auth/profileinfo', {
      user: results,
      styles: server.yogaStyles
    })
  })
});

router.post('/:id/profile', function(req,res,next){
  var upload = multer({storage: storage}).single('displayImage');
  upload(req,res,function(err) {
      if(err) {
          console.log(err);
          return res.end("Error uploading file.");
      }
      var fixedPath = req.file.path
      fixed = fixedPath.replace('public','')
      console.log(fixed);
      Users().where('id', req.params.id).update({'image': fixed, bio: req.body.bio, studio: req.body.studio, speciality: req.body.speciality}).then(function(results){

      res.redirect('/auth');
    });
  });
})

router.get('/logout', function(req, res, next) {
  console.log("Hittted");
  req.user = null
  req.session = null
  console.log(req.user);
  req.logout()
  res.redirect('/')
})



module.exports = router;
