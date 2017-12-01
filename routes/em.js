var express = require('express');
var router = express.Router();
var em = require("../controllers/EmController.js");


router.get('/', (req, res) => {
  res.render('../views/EM/elogin')
});

router.post('/create', (req, res) => {
  em.save(req, res);
});

router.post('/verify', (req, res) => {
  em.verify(req, res);
});

router.get('/home/:id', (req, res) => {
  em.hom(req, res)
});
//================================em/candidates===================================
//candidates Start
router.get('/candidates', (req, res) => {
  em.cahome(req, res)
})
//Show
router.get('/candidates/show/:id', (req, res) => {
  em.cashow(req, res);
});
//Edit
router.get('/candidates/edit/:id', (req, res) => {
  em.caedit(req, res);
});

//Update on EDIT
router.post('/candidates/update/:id', (req, res) => {
  em.caupdate(req, res);
});

//Delete
router.post('/candidates/delete/:id', (req, res) => {
  em.cadelete(req, res);
});


//++++++++++++++++++++++++++++++em/candidates+++++++++++++++++++++++++++++++++++++

//================================em/party===================================
//party Start
router.get('/party', (req, res) => {
  em.phome(req, res)
})

router.get('/party/show/:name', (req, res) => {
  em.pshow(req, res);
});

router.get('/party/edit/:name', (req, res) => {
  em.pedit(req, res)
})

router.post('/party/update/:id', (req, res) => {
  em.pupdate(req, res);
});
router.post('/party/delete/:name', (req, res) => {
  em.pdelete(req, res);
});


//++++++++++++++++++++++++++++++em/party+++++++++++++++++++++++++++++++++++++

//================================em/voters===================================
//candidates Start
router.get('/voters', (req, res) => {
  em.vhome(req, res)
})
//Show
router.get('/voters/show/:id', (req, res) => {
  em.vshow(req, res);
});
//Edit
router.get('/voters/edit/:id', (req, res) => {
  em.vedit(req, res);
});

//Update on EDIT
router.post('/voters/update/:id', (req, res) => {
  em.vupdate(req, res);
});

//Delete
router.post('/voters/delete/:id', (req, res) => {
  em.vdelete(req, res);
});


//++++++++++++++++++++++++++++++em/candidates+++++++++++++++++++++++++++++++++++++
//==============================em/elections======================================
router.get('/elections/', (req, res) => {
  res.render('../views/EM/elhome')
})

router.get('/elections/create', (req, res) => {
  em.elcreate(req, res)
})
router.post('/elections/create/save', (req, res) => {
  em.elsave(req, res)
})

router.get('/elections/presidential', (req, res) => {
  res.render('../views/EM/elpview')
})

router.get('/elections/presidential/ongoing', (req, res) => {
  em.elpolist(req, res)
})

router.get('/elections/presidential/oshow/:id', (req, res) => {
  em.elposhow(req, res)
})

router.post('/elections/presidential/cal/:id', (req, res) => {
  em.elpocal(req, res)
})

router.get('/elections/presidential/upcoming', (req, res) => {
  em.elpulist(req, res)
})

router.get('/elections/presidential/completed', (req, res) => {
  em.elpclist(req, res)
})
router.get('/elections/presidential/cshow/:id', (req, res) => {
  em.elpcshow(req, res)
})

//========================district==============================================

router.get('/elections/district', (req, res) => {
  res.render('../views/EM/eldview')
})

router.get('/elections/district/ongoing', (req, res) => {
  em.eldolist(req, res)
})

router.get('/elections/district/oshow/:id', (req, res) => {
  em.eldoshow(req, res)
})

router.get('/elections/district/create',(req, res) =>{
  em.created(req, res)
})

router.post('/elections/district/save', (req, res) =>{
  em.saved(req, res)
})

router.post('/elections/district/oshow/:n/enroll/:id', (req, res) =>{
  em.enrolld(req, res)
})

router.get('/elections/district/ooshow/:id2/:id', (req, res) =>{
  em.eldooshow(req, res)
})

router.post('/elections/district/cal/:id', (req, res) =>{
  em.cald(req, res)
})

router.get('/elections/district/refresh/:id', (req, res)=>{
  em.refresh(req, res)
})

router.get('/elections/district/completed', (req, res) => {
  em.eldclist(req, res)
})

router.get('/elections/district/cshow/:id', (req, res) =>{
  em.eldcshow(req, res)
})

router.get('/elections/district/upcoming', (req, res) => {
  em.eldulist(req, res)
})


//++++++++++++++++++++++++++++++em/elections++++++++++++++++++++++++++++++++++++++
//==============================em/requests=======================================

router.get('/request/:id', (req, res) => {
  em.rlist(req, res);
});

router.post('/request/create', (req, res) => {
  em.rreg(req, res);
});

router.get('/request/resolve/:id', (req, res) => {
  em.resolve(req, res);
});

//++++++++++++++++++++++++++++++em/requests+++++++++++++++++++++++++++++++++++++++



module.exports = router;
