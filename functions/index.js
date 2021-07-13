const functions = require('firebase-functions');

const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
dotenv.config();

const app = express();
const AccessToken = require('twilio').jwt.AccessToken;
const VideoGrant = AccessToken.VideoGrant;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.get('/token', (req, res) => {
    const identity = req.query.identity;
    console.log(identity);
    const token = new AccessToken(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_API_KEY_SID, process.env.TWILIO_API_KEY_SECRET);
    token.identity = identity;
    const grant = new VideoGrant({ room: req.query.room });
    token.addGrant(grant);
    res.send({
        identity: token.identity,
        token: token.toJwt()
    });
});

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

exports.app = functions.https.onRequest(app);
