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
router.get('/:user_id/builder/:id', function(req, res, next){
  db.returnUserSequence(req.params.id, function(usersequence){
    console.log(usersequence);
    res.render('builder', {
      sequence: usersequence.sequence_id,
      time: usersequence.timing,
      categories: categories,
      posecategories: posecategories,
      user_id: req.params.user_id
    })
  });
})


/*CREATE a new sequence*/
router.post('/:user_id/builder', function(req, res, next){
  var user_id = req.params.user_id;
  var times = req.body['data[time][]'];
  var sequence = req.body['data[sequence][]'];

  // TODO: Sequence Builder needs a Public/Private? option
  // TODO: Sequence Builder needs a Name? field
  db.addIfDoesNotExist(sequence, function(results){
    db.createUserSequence({
      'user_id': user_id,
      'sequence_id': results[0],
      'name': 'sequencename',
      'is_public': true,
      'timing': JSON.stringify(times)
    }, function(result){
      res.send('Bing Bong')
    });
  });
})

/* UPDATE: Edit an existing sequence*/
router.post('/:user_id/builder/:usersequence_id', function(req, res, next){
  req.body['id'] = req.params.usersequence_id;
  req.body['user_id'] = req.params.user_id;

  db.updateUserSequence(req.body, function(results){
    res.redirect(req.params.user_id +'/builder/'+ req.params.usersequence_id);
  })
})

function Sequences(){
  return knex('sequences');
}

module.exports = router;
