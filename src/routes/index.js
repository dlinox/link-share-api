// Importing dependencies.
const express = require('express');
const router = express.Router();

// Importing users and entries routes.
const userRoutes = require('./userRoutes');
const linksRoutes = require('./linksRoutes');

// indicating express where to find the users and entries routes.
router.use(userRoutes);
router.use(linksRoutes);

module.exports = router;