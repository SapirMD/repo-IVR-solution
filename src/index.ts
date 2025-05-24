import express from 'express';
import bodyParser from 'body-parser';
import twilioRouter from './routes/twilioRouter.js';

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


// ADD conditinal - Twilio Router of Commio Router?  
app.use(twilioRouter);

const PORT = 3000;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`IVR Server running on port ${PORT}`);
;
});
