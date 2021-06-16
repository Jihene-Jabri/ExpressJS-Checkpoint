const express = require("express");
const app = express();

const port = 5000;

app.get("/styles/closed.css", (req, res) => {
  res.sendFile(`${__dirname}/views/styles/closed.css`);
});

const time_verify = (req, res, next) => {
  let date = new Date();
  let day = date.getDay();
  let hour = date.getHours();
  if (day > 6 || hour > 17 || hour < 9) {
    res.sendFile(`${__dirname}/views/closed.html`);
  } else {
    next();
  }
};

app.use(time_verify, express.static("views"));

app.listen(port, (err) => {
  if (err) throw err;
  console.log(`http://localhost:${port}`);
});
