const express = require('express');
const app = express();
const path = require('path');
const appDir = path.dirname(require.main.filename);
const cors = require('cors');
const bodyParser = require('body-parser');
const { success } = require('consola');
const { PORT } = require('../config');

// Nunjucks
// const nunjucks = require('nunjucks');
// nunjucks.configure(path.resolve(appDir, 'views'), {
//   express: app,
//   autoscape: true,
//   noCache: false,
//   watch: true,
// });

module.exports.startServer = async () => {
  app.use(express.static('public'));
  app.set('view engine', 'pug');
  app.use(cors());
  app.use(bodyParser.json());

  // app.engine('html', nunjucks.render);
  // app.set('view engine', 'html');

  app.get('/', (req, res) => {
    res.render('index', {
      title: 'Hello, World',
    });
  });

  // app.use('/api/users', require('../routes/users'));
  // app.use('/api/users', require('../routes/user'));

  app.listen(PORT, () =>
    success({ message: `Server started on PORT:${PORT}`, badge: true }),
  );
};
