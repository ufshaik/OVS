var express = require('express');
var router = express.Router();
var party = require("../controllers/PartyController.js");

//Create party
router.get('/register', (req, res) => {
  party.create(req, res);
});

router.post('/save', (req, res) => {
  party.save(req, res);
});


router.get('/', (req, res) => {
  res.render('../views/party/login')
});

router.post('/verify', (req, res) => {
  party.verify(req, res)
})

router.get('/home/:id', (req, res) => {
  party.hom(req, res)
})

router.get('/show/:id', (req, res) => {
  party.show(req, res);
})

router.post('/update/:id', (req, res) => {
  party.update(req, res);
});

router.get('/request/:id', (req, res) => {
  party.rlist(req, res);
});

router.post('/request/create', (req, res) => {
  party.rreg(req, res);
});

router.get('/request/resolve/:id', (req, res) => {
  party.resolve(req, res);
});

router.get('/candidates/:id', (req, res) => {
  party.clist(req, res)
})

router.get('/candidates/:name/show/:id', (req, res) => {
  party.cshow(req, res)
})
router.post('/candidates/:name/:id/update/', (req, res) => {
  party.cupdate(req, res)
})

router.post('/candidates/:name/:id/delete/', (req, res) => {
  party.cdelete(req, res)
})

//=============================================================================

router.get('/elections', (req, res) => {
  res.render('../views/party/eindex')
});
router.get('/elections/presidential', (req, res) => {
  res.render('../views/party/eview')
})

router.get('/elections/presidential/ongoing', (req, res) => {
party.elpolist(req, res);
})
router.get('/elections/presidential/oshow/:id', (req, res) => {
  party.elposhow(req, res);
})
router.get('/elections/presidential/cshow/:id', (req, res) => {
  party.elpocshow(req, res);
})

router.get('/elections/presidential/upcoming', (req, res) => {
  party.elpulist(req, res)
})

router.get('/elections/presidential/completed', (req, res) => {
  party.elpclist(req, res)
})
//=============================================================
router.get('/elections/district', (req, res) => {
  res.render('../views/candidates/edview')
})

router.get('/elections/district/ongoing', (req, res) => {
  party.eldolist(req, res);
})

router.get('/elections/district/oshow/:id', (req, res) => {
  party.eldoshow(req, res);
})

router.get('/elections/district/ooshow/:id2/:id', (req, res) =>{
  party.eldooshow(req, res)
})

router.get('/elections/district/cshow/:id', (req, res) => {
  party.eldocshow(req, res);
})
router.post('/elections/district/vote/:id', (req, res) => {
  party.dvote(req, res);
})
router.get('/elections/district/upcoming', (req, res) => {
  party.eldulist(req, res)
})

router.get('/elections/district/completed', (req, res) => {
  party.eldclist(req, res)
})

router.get('/elections/district/coshow/:id', (req, res) =>{
  party.eldcshow(req, res)
})



module.exports = router;
