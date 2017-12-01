var express = require('express');
var router = express.Router();
var $ = require('jquery')


router.get('/', (req, res) => {
  res.render('../views/index');
});

/*
router.get('/', function(req, res, next) {
  var sessData = req.session;
  sessData.someName = "Umar";
  res.send('Returning with some text');
});

router.get('/bar', function(req, res, next) {
  var someName = req.session.someName;
  res.send(`This will print the Name I set earlier: ${someName}`);
});
*/

module.exports = router;