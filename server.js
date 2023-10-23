import app from "./app.js";
import mongoose from "mongoose";

import dotenv from "dotenv";
dotenv.config();

class Server {
  constructor() {
    this.app = app;
  }
  async start() {
    const { DB_HOST, PORT } = process.env;
    mongoose.set("strictQuery", false);
    mongoose
      .connect(DB_HOST)
      .then(() => {
        app.listen(process.env.PORT || 3000, () => {
          console.log("Database connection successful");
        });
      })
      .catch((error) => {
        console.log(error.message);
        process.exit(1);
      });
  }
}
new Server().start();
