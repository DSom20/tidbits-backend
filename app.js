const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const tidbits = require('./fakeDb');

const app = express();
app.use(cors());
app.use(morgan("tiny"));
app.use(express.json());

// importing from ./fakeDb to help with tests
// let tidbits = [];

const artificialDelay = ms => new Promise(resolve => {
  setTimeout(() => resolve(), ms);
});
const shouldArtificiallyErrorOut = () => Math.random() < .5;


app.get('/tidbits', async function(request, response) {
  // await artificialDelay(1000);
  // if (shouldArtificiallyErrorOut()) {
  //   return response.status(500).end();
  // }
  return response.json({ tidbits });
});

app.post('/tidbits', async function(request, response) {
  // await artificialDelay(1000);
  // if (shouldArtificiallyErrorOut()) {
  //   return response.status(500).end();
  // }
  const tidbit = request.body.tidbit;
  tidbits.unshift(tidbit);
  return response.json({ tidbit });
});

module.exports = app;