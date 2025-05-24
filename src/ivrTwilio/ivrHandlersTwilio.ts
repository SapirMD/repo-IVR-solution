import { Request, Response } from 'express';
import { handleNode } from './ivrDriverTwilio.js';

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Convert import.meta.url to __dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// const jsonPath = "../examples/ivrTree.json"
const jsonPath = path.resolve(__dirname, '../../examples/ivrTree.json');
const ivrData = JSON.parse(fs.readFileSync(jsonPath, "utf-8"));


export const reqHandler = (req: Request, res: Response) => {
  const digits = req.body.Digits;
  const nodeId = req.body.nodeId || ivrData.entrypoint; // default to main node
  const twiml = handleNode(ivrData, nodeId, digits);

  res.type('text/xml').send(twiml);
};


// is neccesary ? vv
export const menuHandler = (req: Request, res: Response) => {
  const digit = req.body.Digits;
  const currentNodeId = req.query.nodeId as string;

  const twiml = handleNode(ivrData, currentNodeId, digit);
  res.type('text/xml').send(twiml);
};

