var express = require('express');
var unirest = require('unirest');
var router = express.Router();

var poses = require('../tmp/results').results;

/* GET users listing. */
router.get('/:user_id', function(req, res, next) {
  res.render('poses/pose', {
    pose: poses[0]
  })
});

router.get('/', function(req, res, next){
  unirest.get('https://young-shelf-28645.herokuapp.com/api/all').end(function(response){
    var array = JSON.parse(response.body);
    var newarray = [];
    array.forEach(function(item){
      item['category'].forEach(function(nextitem){
        newarray.push(nextitem);
      })
    })
    newarray = newarray.filter(function(item, i){
      return newarray.indexOf(item) === i;
    })
    res.send(newarray);
  })
})




module.exports = router;
