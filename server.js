const app = require("./app");

// const mongoose = require("mongoose");

// const { DB_HOST } = process.env;
const PORT = 3000;

// mongoose
// .connect(DB_HOST)
// .then(() => {
app.listen(PORT, () => {
  console.log(`Database connection successful`);
});
// })
// .catch((err) => {
// console.log(`Server not running. Error message: ${err.message}`);
// process.exit(1);
// });
