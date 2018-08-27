// Express requirements
import bodyParser from 'body-parser';
import compression from 'compression';
import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import path from 'path';
import forceDomain from 'forcedomain';
import MobileFeedBack from "./models/MobileFeedBack"
import Loadable from 'react-loadable';
import cookieParser from 'cookie-parser';

// Our loader - this basically acts as the entry point for each page load
import loader from './loader';

// Create our express app using the port optionally specified
const app = express();
const PORT = process.env.PORT || 3000;

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://@127.0.0.1:27017/centralefitness', { useNewUrlParser: true }).catch((err) => {
  console.error(err);
});


// NOTE: UNCOMMENT THIS IF YOU WANT THIS FUNCTIONALITY
/*
  Forcing www and https redirects in production, totally optional.

  http://mydomain.com
  http://www.mydomain.com
  https://mydomain.com

  Resolve to: https://www.mydomain.com
*/
// if (process.env.NODE_ENV === 'production') {
//   app.use(
//     forceDomain({
//       hostname: 'www.mydomain.com',
//       protocol: 'https'
//     })
//   );
// }

// Compress, parse, log, and raid the cookie jar
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use(cookieParser());

app.post('/postfeedback', (req, res) => {

  const feedback = new MobileFeedBack();
  feedback.email = req.body.email;
  feedback.content = req.body.content;
  feedback.date = req.body.date;
  feedback.version = req.body.version

  feedback.save(err => {
    if (err)
      res.send("ERROR")
    res.send("OK")
  })

})

app.get('/getfeedbacks', (req, res) => {
  MobileFeedBack.find((err, feedbacks) => {
    if (err)
      res.send(err)
    res.json(feedbacks)
  })
})

// Set up homepage, static assets, and capture everything else
app.use(express.Router().get('/', loader));
app.use(express.static(path.resolve(__dirname, '../build')));
app.use(loader);

// We tell React Loadable to load all required assets and start listening - ROCK AND ROLL!
Loadable.preloadAll().then(() => {
  app.listen(PORT, console.log(`App listening on port ${PORT}!`));
});

// Handle the bugs somehow
app.on('error', error => {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof PORT === 'string' ? 'Pipe ' + PORT : 'Port ' + PORT;

  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
});
