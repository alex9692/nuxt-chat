const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: `${__dirname}/../../.env` });

const localDb = process.env.LOCAL_DB;

mongoose
  .connect(localDb, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(() => {
    console.log("database connected");
  });
