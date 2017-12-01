var express = require('express');
var router = express.Router();
var ele = require("../controllers/ElectionController.js");


router.post('/create', (req, res) => {
  ele.save(req, res);
});

router.get('/', (req, res) => {
  res.render('../views/elections/index')
})

router.get('/presidential', (req, res) => {
  res.render('../views/elections/pindex')

})

router.get('/presidential/ongoing', (req, res) => {
  ele.pon(req, res)
})

router.get('/presidential/ongoing/show/:id', (req, res) => {
  ele.ponshow(req, res)
})

module.exports = router;