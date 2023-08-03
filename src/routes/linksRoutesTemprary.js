const express = require('express');
const router = express.Router();

// Temporary storage for shared links
let links = [];

// Route to get all shared links
router.get('/links', (req, res) => {
    res.json(links);
  });
  
  // Route to share a new link
  router.post('/links', (req, res) => {
    const { url, title, description } = req.body;
    const newLink = { url, title, description, votes: 0 };
    links.push(newLink);
    res.status(201).json(newLink);
  });
  
  // Route to delete a link
  router.delete('/links/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = links.findIndex(link => link.id === id);
    if (index !== -1) {
      links.splice(index, 1);
      res.sendStatus(200);
    } else {
      res.sendStatus(404);
    }
  });
  
  // Route to vote for a link
  router.post('/links/:id/vote', (req, res) => {
    const id = parseInt(req.params.id);
    const link = links.find(link => link.id === id);
    if (link) {
      link.votes += 1;
      res.sendStatus(200);
    } else {
      res.sendStatus(404);
    }
  });

  module.exports = router;
