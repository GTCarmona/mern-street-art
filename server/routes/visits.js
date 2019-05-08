const express = require('express');
const StreetArt = require('../models/StreetArt');
const Visit = require('../models/Visit');
const { isLoggedIn } = require('../middlewares')
const router = express.Router();

// Route protected for logged in user
router.get('/my-visits', isLoggedIn, (req, res, next) => {
  Visit.find({_user: req.user._id}).populate('_streetArt')
  .then(responseVisit => {
    res.json(responseVisit);
  })
  .catch(err => next(err))
});

router.post('/visits', isLoggedIn, (req, res, next) => {
  Visit.create({
    _user: req.user._id,
    _streetArt: req.body.streetArt
  })
  .then(createdVisit => {
    res.json(createdVisit);
  })
  .catch(err => next(err))
});

router.delete('/my-visits/:visitId', isLoggedIn, (req, res, next) => {
  Visit.findByIdAndRemove(req.params.visitId)
  .then(() => {
    res.json({message: "visit was deleted"});
  })
  .catch(err => next(err))
});
module.exports = router;