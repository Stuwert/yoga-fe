var express = require('express');
var unirest = require('unirest');
var router = express.Router();


/* GET pose listing. */
router.get('/:poseid', function(req, res, next) {
  unirest.get('https://young-shelf-28645.herokuapp.com/api/poses/id?id=' + req.params.poseid).end(function(response){
    console.log(response.body[0]);
    res.render('poses/pose', {pose: response.body[0]});
  })
});






module.exports = router;
