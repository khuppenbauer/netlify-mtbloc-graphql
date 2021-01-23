const { ApolloServer } = require('apollo-server-lambda');
const typeDefs = require('./graphql/typedefs');
const resolvers = require('./graphql/resolvers');
const mongoDB = require('./graphql/mongodb');

exports.handler = async function(event, context) {
  const db = await mongoDB();
  const server = new ApolloServer({
    typeDefs,
    resolvers: resolvers(db)
  });
  return new Promise((result, error) => {
    const cb = (err, args) => (err ? error(err) : result(args));
    server.createHandler()(event, context, cb);
  });
};
