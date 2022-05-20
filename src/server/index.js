const PORT = 8000;
const express = require("express");
const axios = require("axios");
const cors = require("cors");
var cookieParser = require("cookie-parser");
const { URLSearchParams } = require("url");
require("dotenv").config();

var client_id = process.env.SPOTIFY_CLIENT_ID;
var client_secret = process.env.SPOTIFY_CLIENT_SECRET;
var redirect_uri = "http://localhost:8000/callback";
var redirect_to_front = "http://localhost:4200?";

const app = express();
app.use(cors());
app.use(cookieParser());

var stateKey = "spotify-auth-state";

/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
var generateRandomString = function (length) {
  var text = "";
  var possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

// redirects to the Spotify Connection Page
app.get("/login", (req, res) => {
  const scope =
    "user-read-private user-read-email user-top-read user-follow-read user-library-read";
  const state = generateRandomString(16);
  res.cookie(stateKey, state);
  res.set({
    Accept: "application/json",
    "Content-Type": "application/x-www-form-urlencoded",
  });

  // the application requests authorization
  res.redirect(
    "https://accounts.spotify.com/authorize?" +
      new URLSearchParams({
        response_type: "code",
        client_id: client_id,
        scope: scope,
        redirect_uri: redirect_uri,
        state: state,
        show_dialog: true,
      })
  );
});

app.get("/callback", function (req, res) {
  // the application requests refresh and access tokens
  // after checking the state parameter

  var code = req.query.code || null;
  var state = req.query.state || null;
  var storedState = req.cookies ? req.cookies[stateKey] : null;

  if (state === null || state !== storedState) {
    res.redirect(
      "/#" +
        new URLSearchParams({
          error: "state_mismatch",
        })
    );
  } else {
    res.clearCookie(stateKey);
    const params = {
      client_id,
      client_secret,
      redirect_uri,
      code,
      grant_type: "authorization_code",
    };
    axios({
      method: "post",
      url: "https://accounts.spotify.com/api/token",
      params,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })
      .then((response) => {
        const access_token = response.data.access_token;
        const refresh_token = response.data.refresh_token;
        isLoggedIn = true;
        res.redirect(
          redirect_to_front +
            new URLSearchParams({ access_token, refresh_token })
        );
      })
      .catch((e) => console.error(e.response.data));
  }
});

app.listen(8000, () => console.log(`Server is running on port ${PORT}`));
