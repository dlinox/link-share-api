const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000; // You can change the port if needed

// Temporary storage for shared links
let links = [];

app.use(cors());
app.use(bodyParser.json());

// Route to get all shared links
app.get('/links', (req, res) => {
  res.json(links);
});

// Route to share a new link
app.post('/links', (req, res) => {
  const { url, title, description } = req.body;
  const newLink = { url, title, description, votes: 0 };
  links.push(newLink);
  res.status(201).json(newLink);
});

// Route to delete a link
app.delete('/links/:id', (req, res) => {
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
app.post('/links/:id/vote', (req, res) => {
  const id = parseInt(req.params.id);
  const link = links.find(link => link.id === id);
  if (link) {
    link.votes += 1;
    res.sendStatus(200);
  } else {
    res.sendStatus(404);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
require
