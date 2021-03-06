const router = require('express').Router();

// import all api routes from index.js in the api folder
const apiRoutes = require('./api');

router.use("/api", apiRoutes);

module.exports = router;