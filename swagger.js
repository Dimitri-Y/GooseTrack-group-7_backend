import swaggerAutogen from "swagger-autogen";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const _dirname = dirname(fileURLToPath(import.meta.url));
const options = {
  openapi: "3.0.1", // Enable/Disable OpenAPI. By default is null
  language: "en-US", // Change response language. By default is 'en-US'
  disableLogs: false, // Enable/Disable logs. By default is false
  autoHeaders: true, // Enable/Disable automatic headers capture. By default is true
  autoQuery: true, // Enable/Disable automatic query capture. By default is true
  autoBody: true, // Enable/Disable automatic body capture. By default is true
};
const doc = {
  openapi: "3.0.1",
  info: {
    version: "2.0.2",
    title: "API documentation",
    description: "REST API for ",
    license: {
      name: "MIT",
      url: "https://opensource.org/licenses/MIT",
    },
  },
  consumes: ["application/json"],
  produces: ["application/json"],
  servers: [{ url: "http://localhost:3000" }],
  tags: [
    {
      name: "Auth",
      description: "Authorization endpoints",
    },
    {
      name: "Tasks",
      description: "Tasks endpoints",
    },
    {
      name: "Reviews",
      description: "Reviews endpoints",
    },
  ],
};

const outputFile = join(_dirname, "./swagger.json");
const endpointsFiles = [
  join(_dirname, "./routes/api/auth-router.js"),
  join(_dirname, "./routes/api/reviews-router.js"),
  join(_dirname, "./routes/api/tasks-router.js"),
];

/* NOTE: if you use the express Router, you must pass in the 
   'endpointsFiles' only the root file where the route starts,
   such as index.js, app.js, routes.js, ... */

swaggerAutogen(options)(outputFile, endpointsFiles, doc).then(({ success }) => {
  console.log(`Generated: ${success}`);
});
