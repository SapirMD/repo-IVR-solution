import { Request, Response } from 'express';
import { handleNode } from './ivrDriverTwilio.js';
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Convert import.meta.url to __dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const jsonPath = path.resolve(__dirname, '../../examples/ivrTree.json');
const ivrData = JSON.parse(fs.readFileSync(jsonPath, "utf-8"));


export const reqHandler = (req: Request, res: Response) => {
  const digits = req.body.Digits;
  const nodeId = (req.query.nodeId as string) || ivrData.entrypoint; // default to main node
  const twiml = handleNode(ivrData, nodeId, digits);
  res.type('text/xml').send(twiml);
};