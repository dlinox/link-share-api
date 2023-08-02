// Importing dependencies.
const express = require('express');
const router = express.Router();

// Importing users and entries routes.
const userRoutes = require('./userRoutes');
const entryRoutes = require('./entryRoutes');

// indicating express where to find the users and entries routes.
router.use(userRoutes);
router.use(entryRoutes);

module.exports = router;