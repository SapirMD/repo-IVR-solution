import express, { Request, Response } from "express";
import bodyParser from 'body-parser';

import twilio from "twilio";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Convert import.meta.url to __dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const jsonPath = "../examples/ivr-twilio-example.json"

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// **Twilio** Testing and Playing around:
// Load IVR configuration
const { twiml } = twilio;
const ivrData = JSON.parse(fs.readFileSync(path.join(__dirname, jsonPath), "utf-8"));
console.log("Using ivrData from: ", path.join(__dirname, jsonPath))

// Route: /voice
app.post("/voice", (req: Request, res: Response) => {
  const VoiceResponse = twiml.VoiceResponse;
  const response = new VoiceResponse();

  const startNode = ivrData["start"];
  const gather = response.gather({
    numDigits: 1,
    action: "/handle-key",
    method: "POST"
  });
  gather.say(startNode.message);
  res.type("text/xml").send(response.toString());
});

// Route: /handle-key
app.post("/handle-key", (req: Request, res: Response) => {
  const digit = req.body.Digits;
  const currentNode = ivrData["start"];
  const nextNodeKey = currentNode.options[digit];

  const VoiceResponse = twiml.VoiceResponse;
  const response = new VoiceResponse();

  if (!nextNodeKey || !ivrData[nextNodeKey]) {
    response.say("Invalid choice. Goodbye!");
    response.hangup();
    res.type("text/xml").send(response.toString());
  }

  const nextNode = ivrData[nextNodeKey];
  response.say(nextNode.message);

  if (nextNode.action === "dial" && nextNode.number) {
    response.dial(nextNode.number);
  } else {
    response.hangup();
  }

  res.type("text/xml").send(response.toString());
});


// **Twilio** End

export default app;