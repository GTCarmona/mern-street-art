const express = require('express');
const StreetArt = require('../models/StreetArt');
const Visit = require('../models/Visit');
const { isLoggedIn } = require('../middlewares')
const router = express.Router();

// Route protected for logged in user
router.get('/visits', isLoggedIn, (req, res, next) => {
  Visit.find({_user: req.user._id}).populate('_streetArt')
  .then(responseVisit => {
    res.json(responseVisit);
  })
  .catch(err => next(err))
});

router.post('/visits', isLoggedIn, (req, res, next) => {
  Visit.create({
    _user: req.user._id,
    _streetArt: req.body._streetArt
  })
  .then(createdVisit => {
    res.json(createdVisit);
  })
  .catch(err => next(err))
});

router.delete('/visits/:visitId', isLoggedIn, (req, res, next) => {
  Visit.findById(req.params.visitId)
  .then(visit => {
    if(visit._user === req.user.id) {
      Visit.findByIdAndRemove(req.params.visitId)
    }
    else {
      res.json({message: "You are not allowed to do delete that"})
  }})
      .then(() => {
        res.json({message: "visit was deleted"});
      })
      .catch(err => next(err))
    })

   

module.exports = router;