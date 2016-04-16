const _ = require('lodash');
const express = require('express');
const app = express();
const config = require('./config/config');
const favicon = require('serve-favicon');
require('./config/auth')(app);

// Serving static files from dist folder

app.use(express.static(__dirname + '/../dist', { index: false }));
app.use(favicon(__dirname + '/../dist/img/favicon.ico'));

// Default Routes
// Determines which main page to render based on session status
app.get('/', (req, res) => {
  if (_.get(req, 'session.passport.user', false)) {
    res.sendFile('main.html', { root: 'dist' });
  } else {
    res.sendFile('index.html', { root: 'dist' });
  }
});

// Prevents accidentally using React routes if no session is held
app.get(/\/#\/.*/, (req, res) => {
  if (!req.session.passport.user) {
    res.sendFile('index.html', { root: 'dist' });
  }
});

//API Routes
require('./routes/user.routes.js')(app);
require('./routes/team.routes.js')(app);
require('./routes/questions.routes.js')(app);

//Initialization
app.listen(config.port);
console.log('Listening on port ' + config.port);
