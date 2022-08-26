const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const Verify = require("../Verify");
const jwt = require("jsonwebtoken");
const { set } = require("mongoose");
//user doc
//update
router.put("/:id", Verify, async (req, res) => {
  if (req.user.id === req.params.id || req.user.isAdmin) {
    if (req.body.password) {
      //these is here when we cahnge password we are checking if it is for password then set password to encrypted key
      req.body.password = CryptoJS.AES.encrypt(
        req.body.password,
        process.env.CRYPTO_SECRET_KEY
      ).toString();
    }

    try {
      const updatingUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true } //upper change the data and after adding new : true it means written new data
      );

      res.status(200).json(updatingUser);
    } catch (err) {
      res.status(500).json("failed updating");
    }
  } else {
    res.status(500).json("error can't find user");
  }
});

//delete
router.delete("/:id", Verify, async (req, res) => {
  if (req.user.id === req.params.id || req.user.isAdmin) {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json("USER DELETED");
    } catch (err) {
      res.status(500).json("fail DELETING");
    }
  } else {
    res.status(500).json("error can't find user");
  }
});

//get
router.get("/find/:id", async (req, res) => {
  //it's like a search bar //here anyone can see any one id that why wr are not verifying through jwt
  try {
    const user = await User.findById(req.params.id);
    //to avoid sending password
    const { password, ...info } = user._doc;
    res.status(200).json(info);
  } catch (err) {
    res.status(500).json("fail cannot find user");
  }
});

//get all

router.get("/", Verify, async (req, res) => {
  if (req.user.isAdmin) {
    const query = req.query.new; //these sentence like "http://localhost:8800/backend/users?new=true"    query = ?new=true  check movies server for more details
    try {
      const user = query
        ? await User.find().sort({ _id: -1 }).limit(4)
        : await User.find(); // if users?new=true then return limit else  users/ return all   //sort({ _id: -1 }) send last two digit
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json("funable to find ");
    }
  } else {
    res.status(500).json("your not allow to see all user");
  }
});

//get user statics
router.get("/stats", async (req, res) => {
  const today = new Date();
  const lastYear = today.setFullYear(today.setFullYear - 1);

  try {
    //basically these is a mangodb method to find number of user join in a month
    const data = await User.aggregate([
      {
        $project: {
          month: { $month: "$createdAt" },
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 },
        },
      },
    ]);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json("fail");
  }
});

module.exports = router;
