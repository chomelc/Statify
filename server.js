//Install express server
const express = require("express");
const path = require("path");
var proxy = require("express-http-proxy");

const app = express();
app.use("/login", proxy("https://appstatify-api.herokuapp.com/"));

// Serve only the static files form the dist directory
app.use(express.static(__dirname + "/dist/spotistics"));

app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname + "/dist/spotistics/index.html"));
});

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);
