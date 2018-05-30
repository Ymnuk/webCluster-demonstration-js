var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.session.counter) {
    req.session.counter++
  } else {
    req.session.counter = 1;
  }
  res.render('index', { title: 'Express', req: req });
});

module.exports = router;
