import express, { Request, Response } from "express";
import bodyParser from 'body-parser';
import path from "path";
import { fileURLToPath } from "url";


// Convert import.meta.url to __dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const jsonPath = "../examples/ivr-twilio-example.json"


const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


export default app;