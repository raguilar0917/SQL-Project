var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('error');
});

router.get('/meow', (req, res, next) =>{
  res.send({literal: "Literal Help"});
});
router.get('/meow/:id', (req, res, next) =>{
  res.send({params: req.params.id});
});

module.exports = router;
