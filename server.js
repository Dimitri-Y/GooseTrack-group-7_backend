// import mongoose from "mongoose";
import app from "./app.js";

// const { DB_HOST } = process.env;
const PORT = process.env.PORT || 3000;

// mongoose
// .connect(DB_HOST)
// .then(() => {
// app.listen(PORT, () => {
//   console.log(`Database connection successful`);
// });
// })
// .catch((err) => {
// console.log(`Server not running. Error message: ${err.message}`);
// process.exit(1);
// });

const server = app.listen(PORT, () =>
  console.log(`Example app listening on port ${PORT}!`)
);

server.keepAliveTimeout = 120 * 1000;
server.headersTimeout = 120 * 1000;
