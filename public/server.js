const express = require("express");
const http = require("http");
const CODES = require("./constants/statusCodes").CODES;
const ENDPOINTS = require("./constants/endpoints").ENDPOINTS;

const PORT = process.env.PORT || 8000;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get(ENDPOINTS.default, (req, res) => {
  console.log(`Accessed endpoint ${ENDPOINTS.default}`);
  res.send(`Accessed endpoint ${ENDPOINTS.default}`);
});

http.createServer(app).listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
