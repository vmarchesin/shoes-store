import { MongoClient } from 'mongodb';
import nextConnect from 'next-connect';

const MONGO_CONECTION = process.env.MONGO_CONECTION

const client = new MongoClient(MONGO_CONECTION, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function database(req, res, next) {
  if (!client.isConnected()) await client.connect();
  req.dbClient = client;
  req.db = client.db('shoesweb');
  return next();
}

const middleware = nextConnect();

middleware.use(database);

export default middleware;