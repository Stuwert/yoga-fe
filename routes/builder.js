var express = require('express');
var router = express.Router();
var knex = require('../db/knex');
var db = require('../lib/db_builder');

var results = require('../tmp/results')
var categories = require('../db/categories')
var posecategories = require('../db/posecategories')


/* GET new builder page. */
router.get('/:user_id/builder/new', function(req, res, next) {
  res.render('builder', {
    results: results.results,
    categories: categories,
    user_id: req.params.user_id,
    posecategories: posecategories
  });
});

/*GET builder edit page */
router.get('`/:user_id/builder/`:usersequence_id', function(req, res, next){
  db.returnUserSequence(req.params.usersequence_id, function(usersequence){
    res.render('builder', {
      sequence: usersequence.sequence_id,
      usersequence_id: usersequence.id,
      time: usersequence.timing,
      categories: categories,
      posecategories: posecategories,
      user_id: req.params.user_id,
      name: usersequence.name
    })
  });
})


/*CREATE a new sequence*/
router.post('/:user_id/builder', function(req, res, next){
  var user_id = req.params.user_id;
  var times = JSON.stringify(req.body['data[time][]']);
  var sequence = JSON.stringify(req.body['data[sequence][]']);
  var name = req.body['data[name]'];
  // TODO: Sequence Builder needs a Public/Private? option
  // TODO: Sequence Builder needs a Name? field
  // TODO: don't let pressing enter submit the form :(
  db.createUserSequence({
    'user_id': user_id,
    'sequence_id': sequence,
    'name': name,
    'is_public': true,
    'timing': times
  }, function(result){
    res.redirect('/users/profile/'+user_id);
  });
})

/* UPDATE: Edit an existing sequence*/
router.post('/:user_id/builder/:usersequence_id', function(req, res, next){
  var obj = {};
  obj['id'] = req.params.usersequence_id;
  obj['user_id'] = req.params.user_id;
  obj['sequence_id'] = JSON.stringify(req.body['data[sequence][]']);
  obj['timing'] = JSON.stringify(req.body['data[time][]']);
  obj['name'] = req.body['data[name]'];


  db.updateUserSequence(obj, function(results){
    res.redirect('/users/' + req.params.user_id +'/builder/'+ req.params.usersequence_id);
  })
})

/* DELETE a sequence */
router.post('/:user_id/builder/:usersequence_id/delete', function(req, res, next){
  db.deleteUserSequence(req.params.usersequence_id, function(result){
    res.redirect('/users/' + req.params.user_id);
  });
});

module.exports = router;
