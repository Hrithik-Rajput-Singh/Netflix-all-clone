const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv"); //dotenv file provide security
const authRouter = require("./routes/auth");
const userRouter = require("./routes/user");
const movieRouter = require("./routes/movies");
const listRouter = require("./routes/list");
dotenv.config();

async function main() {
  await mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log("DB connected");
  });
}

main().catch((err) => console.log(err)); //conecting to mongoose

app.use(express.json()); //to use json file

app.use("/backend/auth", authRouter); //syntex to send to auth routes notice '/bckend/auth is common in all rotes so we return here
app.use("/backend/users", userRouter);
app.use("/backend/movies", movieRouter);
app.use("/backend/lists", listRouter);

app.listen(8800, () => {
  console.log("Backend is connected");
});
