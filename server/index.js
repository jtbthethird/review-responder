const express = require("express");
const bodyParser = require("body-parser");
// const cors = require("cors");
const path = require("path");
const app = express();

const ReviewResponder = require("./review-response");
const PostGenerator = require("./social-post-caption");

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
  const s = await ReviewResponder.generateReviewResponse(req.body);

  return res.send(s);
});

app.post("/review-response-2", async function (req, res) {
  const s = await ReviewResponder.generateReviewResponse2(req.body);

  return res.send(s);
});

app.post("/post-caption", async function (req, res) {
  const s = await PostGenerator.generateSocialPostCaptions(req.body);
  res.send(s);
});

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "..", "build", "index.html"));
});

app.listen(process.env.PORT || 8080);
