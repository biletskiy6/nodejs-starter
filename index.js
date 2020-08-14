const { error } = require('consola');
const { connectDB } = require('./helpers/db');
const { startServer } = require('./helpers/startServer');

startServer();
// connectDB()
//   .on('error', (e) =>  error({ message: `Unable to connect with db`, badge: true }))
//   .on('disconnected', connectDB)
//   .once('open', startServer);
