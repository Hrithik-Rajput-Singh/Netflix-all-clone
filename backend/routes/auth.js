//router is basically app.get()  or app.post thing. when we use various module(for seprated scheme) we use router
const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
//bascilly jwt is auth tokken but different check jwt crach corse for more

router.post("/register", async (req, res) => {
  // here say post on "/backend/auth/register"
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.CRYPTO_SECRET_KEY
    ).toString(),
    //upper one is encrypt done through using Cryptojs to make password hash
  });

  try {
    const user = await newUser.save(); //.save()  is a way to save file in mangose
    res.status(201).json(user); //status is 201 then prin user in json format use for postman
  } catch (err) {
    res.status(501).json(err);
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({
      email: req.body.email,
    });

    if (!user) res.status(401).json("no user found");

    // Decrypt
    const bytes = CryptoJS.AES.decrypt(
      user.password,
      process.env.CRYPTO_SECRET_KEY
    ); //user.password here because mangoose hash password is store  in user while finding one
    const originalText = bytes.toString(CryptoJS.enc.Utf8);

    if (originalText !== req.body.password)
      res.status(401).json("wrong password");

    const accessToken = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.CRYPTO_SECRET_KEY,
      {
        expiresIn: "5d",
      }
    ); //these here we are using just jwt

    const { password, ...info } = user._doc; //we don't want password to show when we check in below statement so we will seprate password //user_doc refer top user . documents
    res.status(200).json({ info, accessToken });
  } catch (err) {
    res.status(501).json(err);
  }
});

module.exports = router;
