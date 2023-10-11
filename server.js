const app = require("./app");

const mongoose = require("mongoose");

const { DB_HOST } = process.env;
const PORT = 3000;
// const DB_HOST =
//   "mongodb+srv://admin:tLSReGZYE3o43gQd@cluster0.tj2yeha.mongodb.net/";

// const optionsConnect = {
//   promiseLibrary: global.Promise,
//   useCreateIndex: true,
//   useUnifiedTopology: true,
//   useFindAndModify: false,
// };

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Database connection successful`);
    });
  })
  .catch((err) => {
    console.log(`Server not running. Error message: ${err.message}`);
    process.exit(1);
  });
