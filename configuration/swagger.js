const swaggerJSDoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Food Delivery Backend API",
      version: "1.0.0",
      description: "API Documentation for Food App Backend Project",
    },
    servers: [
      {
        url: "http://localhost:5000",
      },
    ],
  },

  apis: ["./routes/*.js"], // scans all route files
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
