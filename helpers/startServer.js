const app = require('express')();
const cors = require('cors');
const bodyParser = require('body-parser');
const { success } = require('consola');
const { PORT } = require('../config');


module.exports.startServer = async () => {
  app.use(cors());
  app.use(bodyParser.json());


  app.use( '/api/users', require('../routes/users'));

  // app.use('/api/users', require('../routes/user'));

  app.listen(PORT, () => success({message: `Server started on PORT:${PORT}`, badge: true}))
};