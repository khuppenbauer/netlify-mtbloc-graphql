const MongoClient = require("mongodb").MongoClient;
const DB_URL = process.env.MONGO_DB_URL;
const DB_NAME = process.env.MONGO_DB_NAME;

let cachedDb = null;
module.exports = () => {
  if (cachedDb && cachedDb.serverConfig.isConnected()) {
    return Promise.resolve(cachedDb);
  }
  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
  return MongoClient.connect(DB_URL, options).then(client => {
    cachedDb = client.db(DB_NAME);
    return cachedDb;
  });
};
