import app from "./app.js";
import mongoose from "mongoose";
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
        app.listen(PORT, () => {
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
