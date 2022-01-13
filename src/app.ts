import express from 'express';
import bodyParser from 'body-parser';
import * as _ from 'lodash';
import { Bitbucket } from 'bitbucket';

const app = express();
const port = 8080; // default port to listen

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const appKey = process.env.BBC_SPIKE_APP_KEY;
const appClientKey = process.env.BBC_SPIKE_APP_CLIENT_KEY;
const appSharedSecret = process.env.BBC_SPIKE_APP_SHARED_SECRET;

const workspace = process.env.BBC_SPIKE_APP_WORKSPACE;
const repo = process.env.BBC_SPIKE_APP_REPO;

app.set('view engine', 'hbs');
app.use(express.static('public'));

// define a route handler for the default home page
app.get('/', async (req, res, next) => {
  const bitbucket = new Bitbucket({
    hideNotice: true,
    auth: {
      type: 'jwt',
      appClientKey,
      appKey,
      appSharedSecret,
    },
  });

  try {
    const { data } = await bitbucket.repositories.get({
      workspace,
      repo_slug: repo,
    });

    res.json(data);
  } catch (err) {
    next(err);
  }
});

app.get('/ui', (req, res) => {
  res.render('index', {
    appKey,
    appClientKey,
    appSharedSecret,
    workspace,
    repo,
  });
});

// start the Express server
app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
