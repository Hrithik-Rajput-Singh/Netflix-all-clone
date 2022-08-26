const router = require("express").Router();
const Lists = require("../models/List");
const Verify = require("../Verify");

//create movies
router.post("/", Verify, async (req, res) => {
  if (req.user.isAdmin) {
    const newList = new Lists(req.body);
    try {
      const savedList = await newList.save();

      res.status(200).json(savedList);
    } catch (err) {
      res.status(500).json("failed updating");
    }
  } else {
    res.status(500).json("error can't find movie");
  }
});
//DELETE MOVIE
router.delete("/:id", Verify, async (req, res) => {
  if (req.user.id === req.params.id || req.user.isAdmin) {
    try {
      await Lists.findByIdAndDelete(req.params.id);

      res.status(200).json(savedList);
    } catch (err) {
      res.status(500).json("failed  to delete");
    }
  } else {
    res.status(500).json("error can't find user");
  }
});

//GET BY TYPE AND GENRE

//here we have return type and genre

router.get("/", async (req, res) => {
  const queryType = req.query.type;
  const queryGenre = req.query.genre;

  let list = [];

  try {
    if (queryType) {
      if (queryGenre) {
        list = await Lists.aggregate([
          { $sample: { size: 10 } },
          { $match: { genre: queryGenre, type: queryType } }, //type = movie genre = horror
        ]);
      } else {
        list = await Lists.aggregate([
          //if there is no genre set
          { $sample: { size: 10 } },
          { $match: { type: queryType } }, //type = movie
        ]);
      }
    } else {
      list = await Lists.aggregate([{ $sample: { size: 10 } }]);
    }

    res.status(200).json(list);
  } catch (err) {
    res.status(500).json("error occured");
  }
});

module.exports = router;
