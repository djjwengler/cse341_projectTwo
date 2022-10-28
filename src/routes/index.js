const routes = require('express').Router();
const recipes = require('./recipes');
const days = require('./days');
const openCors = require('../middleware/cors');
const secret = process.env.CLIENT_SECRET;
const domain = process.env.CLIENT_DOMAIN;
const clientId = process.env.CLIENT_ID;
const baseUrl = process.env.BASE_URL;

const { auth } = require('express-openid-connect');

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: secret,
  baseURL: baseUrl,
  clientID: clientId,
  issuerBaseURL: domain
};

// auth router attaches /login, /logout, and /callback routes to the baseURL
routes.use(auth(config));

// req.isAuthenticated is provided from the auth router
routes.get('/', (req, res) => {
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});

routes.use(openCors);
routes.use('/', require('./swagger'));
routes.use('/recipes', recipes);
routes.use('/days', days);
routes.use('/', () => {});

module.exports = routes;
