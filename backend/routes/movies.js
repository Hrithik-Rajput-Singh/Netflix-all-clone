const router = require("express").Router();
const Movies = require("../models/Movies");
const Verify = require("../Verify");
const jwt = require("jsonwebtoken");
const { set } = require("mongoose");

//create movies
router.post("/", Verify, async (req, res) => {
  if (req.user.isAdmin) {
    const newMovies = new Movies(req.body);
    try {
      const savedMovie = await newMovies.save();

      res.status(200).json(savedMovie);
    } catch (err) {
      res.status(500).json("failed updating");
    }
  } else {
    res.status(500).json("error can't find movie");
  }
});

//update movie
router.put("/:id", Verify, async (req, res) => {
  if (req.user.id === req.params.id || req.user.isAdmin) {
    try {
      const movies = await Movies.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );

      res.status(200).json(movies);
    } catch (err) {
      res.status(500).json("failed updating");
    }
  } else {
    res.status(500).json("error can't find movie");
  }
});

//delete movie
router.delete("/:id", Verify, async (req, res) => {
  if (req.user.isAdmin) {
    try {
      await Movies.findByIdAndDelete(req.params.id);
      res.status(200).json("deleted");
    } catch (err) {
      res.status(500).json("failed updating");
    }
  } else {
    res.status(500).json("ssomething went wrong");
  }
});

//GET

router.get("/find/:id", async (req, res) => {
  try {
    const movies = await Movies.findById(req.params.id);
    res.status(200).json(movies);
  } catch (err) {
    res.status(500).json("failed updating");
  }
});

//GET RANDOM

//so we want to get one random movie or series .
// so first we have to check if passing params = "/movies?type=series" ------>req.query.type
//then in mongodb check for isSeries = true  ---> {$match: {isSeries: true}},
//then return random    -----> {$sample: {size: 1}}
//else do for movie same
router.get("/random", Verify, async (req, res) => {
  const type = req.query.type;
  let movie;
  try {
    if (type === "series") {
      movie = await Movies.aggregate([
        { $match: { isSeries: true } },
        { $sample: { size: 1 } },
      ]);
    } else {
      movie = await Movies.aggregate([
        { $match: { isSeries: false } },
        { $sample: { size: 1 } },
      ]);
    }

    res.status(200).json(movie);
  } catch (err) {
    res.status(501).json("something went wrong");
  }
  //aggregate means -- a whole formed by combining several separate elements.
});

//GET ALL
router.get("/", Verify, async (req, res) => {
  if (req.user.isAdmin) {
    try {
      const movies = await Movies.find();
      res.status(200).json(movies.reverse());
    } catch (err) {
      res.status(500).json("failed updating");
    }
  } else {
    res.status(500).json("error can't find movie");
  }
});

// router.get("/", async (req, res) => {
//   try {
//     const movies = await Movies.find();
//     res.status(200).json(movies.reverse());
//   } catch (err) {
//     res.status(500).json("failed updating");
//   }
// });

module.exports = router;

//http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4
//http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4
//http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4

//"http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4"
//"http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4"
//"http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4"
// "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4"
//"http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4"
//"http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4"
//"http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4"
//"http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
//"http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"
