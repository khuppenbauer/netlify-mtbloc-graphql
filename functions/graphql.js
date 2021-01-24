const { ApolloServer } = require('apollo-server-lambda');
const typeDefs = require('./graphql/typedefs');
const resolvers = require('./graphql/resolvers');
const mongoDB = require('./graphql/mongodb');
const sentryPlugin = require('./graphql/sentry');

exports.handler = async (event, context) => {
  const db = await mongoDB();
  const server = new ApolloServer({
    typeDefs,
    resolvers: resolvers(db),
    plugins: [sentryPlugin],
  });
  return new Promise((result, error) => {
    const cb = (err, args) => (err ? error(err) : result(args));
    server.createHandler()(event, context, cb);
  });
};
