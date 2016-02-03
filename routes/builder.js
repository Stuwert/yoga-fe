var express = require('express');
var router = express.Router();
var knex = require('../db/knex');

var results = require('../tmp/results')
var categories = require('../db/categories')
var posecategories = require('../db/posecategories')

/* GET new builder page. */
router.get('/:username/builder/new', function(req, res, next) {
  res.render('builder', {results: results.results, categories: categories, username:req.params.username, posecategories: posecategories});
});

/*GET builder edit page */
router.get('/:username/builder/:id', function(req, res, next){
  res.render('builder', {results: results.results, categories: categories})
})


/*Create a new sequence*/
router.post('/:username/builder', function(req, res, next){
  //Search Sequences, add sequence (or not), return sequence id
  //Add to User sequences
  res.send('It worked!')
})

/*Edit an existing sequence*/
router.post('/:username/builder/:id', function(req, res, next){
  res.send('It worked!')
})

function Sequences(){
  return knex('sequences');
}

module.exports = router;
