// server/routes/street-arts.js
const express = require('express');
const router = express.Router();
const StreetArt = require("../models/StreetArt")

router.get('/:streetArtId', (req, res, next) => {
  StreetArt.findById(req.params.streetArtId)
  .then(responseArt => {
    res.json(responseArt);
  })
  .catch(err => next(err))
});

router.get('/', (req, res, next) => {
  StreetArt.find()
  .then(responseArt => {
    res.json(responseArt);
  })
  .catch(err => next(err))
});



// router.post('/', (req, res, next) => {
//   StreetArt.create({
//     picture: req.body.picture,
//     location: req.body.location,
//     coordinates: req.body.coordinates,

//   }).then(responseArt => {
//     res.json(responseArt);
//   })
//   .catch(err => next(err))
// });


module.exports = router;