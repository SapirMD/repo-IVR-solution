import express from 'express';
import { welcomeHandler, menuHandler, reqHandler } from '../ivrTwilio/ivrHandlersTwilio.js';

const twilioRouter = express.Router();
twilioRouter.post('/voice', reqHandler);

export default twilioRouter;

