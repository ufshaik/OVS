var express = require('express');
var router = express.Router();
var voter = require("../controllers/VoterController.js");


router.get('/', (req, res) => {
  voter.login(req, res);
});
router.get('/register', (req, res) => {
  voter.register(req, res);
})

router.post('/verify', (req, res) => {
  voter.verify(req, res);
});

router.get('/home/:id', (req, res) => {
  voter.hom(req, res);
})

router.get('/show/:id', (req, res) => {
  voter.vshow(req, res);
})
//Update
router.post('/update/:id', (req, res) => {
  voter.update(req, res);
});
//Save from Register
router.post('/save', (req, res) => {
  voter.save(req, res);
});
//Election Start
router.get('/elections', (req, res) => {
  res.render('../views/voters/eindex')
});
router.get('/elections/presidential', (req, res) => {
  res.render('../views/voters/eview')
})

router.get('/elections/presidential/ongoing', (req, res) => {
  voter.elpolist(req, res);
})
router.get('/elections/presidential/oshow/:id', (req, res) => {
  voter.elposhow(req, res);
})
router.get('/elections/presidential/cshow/:id', (req, res) => {
  voter.elpocshow(req, res);
})
router.post('/elections/presidential/vote/:id', (req, res) => {
  voter.vote(req, res);
})
router.get('/elections/presidential/upcoming', (req, res) => {
  voter.elpulist(req, res)
})

router.get('/elections/presidential/completed', (req, res) => {
  voter.elpclist(req, res)
})
router.get('/elections/presidential/cpshow/:id', (req, res) => {
  voter.elpcshow(req, res)
})
//================================================================================
router.get('/elections/district', (req, res) => {
  res.render('../views/voters/edview')
})

router.get('/elections/district/ongoing', (req, res) => {
  voter.eldolist(req, res);
})

router.get('/elections/district/oshow/:id', (req, res) => {
  voter.eldoshow(req, res);
})

router.get('/elections/district/ooshow/:id2/:id', (req, res) =>{
  voter.eldooshow(req, res)
})

router.get('/elections/district/cshow/:id', (req, res) => {
  voter.eldocshow(req, res);
})
router.post('/elections/district/vote/:id', (req, res) => {
  voter.dvote(req, res);
})
router.get('/elections/district/upcoming', (req, res) => {
  voter.eldulist(req, res)
})

router.get('/elections/district/completed', (req, res) => {
  voter.eldclist(req, res)
})

router.get('/elections/district/coshow/:id', (req, res) =>{
  voter.eldcshow(req, res)
})




module.exports = router;
