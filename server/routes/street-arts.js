// server/routes/street-arts.js
const express = require('express');
const router = express.Router();
const StreetArt = require("../models/StreetArt")
const uploader = require("../configs/cloudinary")

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
//     lat: req.body.lat,
//     lng: req.body.lng,

//   }).then(responseArt => {
//     res.json(responseArt);
//   })
//   .catch(err => next(err))
// });

// Route to create a street art
// `uploader.single('picture')` parses the data send with the name `picture` and save information inside `req.file`
router.post('/', uploader.single('picture'), (req, res, next) => {
  let { lat, lng } = req.body
  let pictureUrl = req.file.url
  StreetArt.create({
    pictureUrl,
    location:{
      coordinates: [lat, lng]
    }
  })
  .then(responseArt => {
    res.json(responseArt);
  })
  .catch(err => next(err))
});
module.exports = router;