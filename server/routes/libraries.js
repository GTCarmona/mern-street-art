// server/routes/street-arts.js
const express = require('express');
const router = express.Router();
const Library = require("../models/Library")
const uploader = require("../configs/cloudinary")

router.get('/:libraryId', (req, res, next) => {
  StreetArt.findById(req.params.libraryId)
  .then(response => {
    res.json(response);
  })
  .catch(err => next(err))
});

router.get('/', (req, res, next) => {
  Library.find()
  .then(response => {
    res.json(response);
  })
  .catch(err => next(err))
});



router.post('/', uploader.single('picture'), (req, res, next) => {
  Library.create({
    name: req.body.name,
    pictureUrl: req.file.url,  
    address: req.body.address,

    })
  
  .then(response => {
    res.json(response);
  })
  .catch(err => next(err))
});


module.exports = router;