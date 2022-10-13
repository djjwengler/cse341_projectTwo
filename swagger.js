const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Meal Planning',
    description: 'What are we going to eat this week?'
  },
  host: 'jw-341-projecttwo.onrender.com',
  schemes: ['https']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./src/routes/index.js'];

/* NOTE: if you use the express Router, you must pass in the 
   'endpointsFiles' only the root file where the route starts,
   such as index.js, app.js, routes.js, ... */

swaggerAutogen(outputFile, endpointsFiles, doc);

// swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
//     require('./index.js'); // Your project's root file
//   });
