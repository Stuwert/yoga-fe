var express = require('express');
var router = express.Router();
var knex = require('../db/knex');

var results = require('../tmp/results')

/* GET new builder page. */
router.get('/:username/builder/new', function(req, res, next) {
  res.render('builder', {results: results.results});
});

/*GET builder edit page */
router.get('/:username/builder/:id', function(req, res, next){
  res.render('builder', {results: results.results})
})


/*Create a new sequence*/
router.post('/:username/builder', function(req, res, next){
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
