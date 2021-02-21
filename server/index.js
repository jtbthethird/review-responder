const express = require("express");
const bodyParser = require("body-parser");
// const cors = require("cors");
const path = require("path");
const app = express();

const ReviewResponder = require("./review-response");

// const corsOptions = {
//   origin: "*",
//   optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
// };
// app.use(cors(corsOptions));
app.use(express.static(path.join(__dirname, "..", "build")));
app.use(bodyParser.json());

app.get("/ping", function (req, res) {
  return res.send("pong");
});

app.post("/review-response", async function (req, res) {
  console.log("Request Body: ", req.body);

  const s = await ReviewResponder.generateReviewResponse(req.body);
  console.log(s);

  return res.send(s);
});

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "..", "build", "index.html"));
});

app.listen(process.env.PORT || 8080);
