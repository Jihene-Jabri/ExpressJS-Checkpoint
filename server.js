const express = require("express");
const app = express();

const port = 5000;
app.use(express.static("views"));

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

app.get("/", (req, res) => {
  res.sendFile(`${__dirname}/views/index.html`);
});
app.get("/services", (req, res) => {
  res.sendFile(`${__dirname}/views/services.html`);
});
app.get("/contact", (req, res) => {
  res.sendFile(`${__dirname}/views/contact.html`);
});
app.all("*", (req, res) => {
  res.status(404).send("<h2>not found...</h2>");
});
app.listen(port, (err) => {
  if (err) throw err;
  console.log(`http://localhost:${port}`);
});
