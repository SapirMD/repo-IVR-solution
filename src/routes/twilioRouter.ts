import express from 'express';
import { reqHandler } from '../ivrTwilio/ivrHandlersTwilio.js';

const twilioRouter = express.Router();
twilioRouter.post('/voice', reqHandler);

export default twilioRouter;

