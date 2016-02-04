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
    db.returnSequence(usersequence.sequence_id, function(sequence){
      console.log(sequence, usersequence);
      res.render('builder', {
        sequence: sequence.sequence,
        time: usersequence.timing,
        categories: categories,
        posecategories: posecategories,
        user_id: req.params.user_id,
        usersequence_id: usersequence.id
      })
    })
  });
})


/*Create a new sequence*/
router.post('/:user_id/builder', function(req, res, next){
  console.log('POST a new sequence');
  var user_id = req.params.user_id;
  var times = req.body['data[time][]'];
  var sequence = req.body['data[sequence][]'];

  console.log(user_id);
  console.log(times);
  console.log(sequence);

  // get sequence id where sequence exists. else create sequence and return sequence id
  // add to user_sequences
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

/*Edit an existing sequence*/
router.post('/:user_id/builder/:id', function(req, res, next){
  res.send('It worked!')
})

function Sequences(){
  return knex('sequences');
}

module.exports = router;
