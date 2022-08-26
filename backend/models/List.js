const mongoose = require("mongoose");

const ListSchema = new mongoose.Schema(
  {
    title: { type: String, require: true, unique: true },
    type: { type: String },
    genre: { type: String },
    //we are going to add here atleat 10 movie we are gone add here id

    content: { type: Array },
  },
  { timestamps: true }
);

module.exports = mongoose.model("List", ListSchema);
