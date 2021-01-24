const dotenv = require('dotenv').config();
const Sentry = require('@sentry/serverless');

const { SENTRY_DSN } = process.env;

module.exports = {
  requestDidStart(requestContext) {  
    return {
      didEncounterErrors(requestContext) {
        const { request, operation, operationName, errors } = requestContext;
        if (SENTRY_DSN) {
          Sentry.AWSLambda.init({
            dsn: SENTRY_DSN,
          });
          Sentry.AWSLambda.withScope((scope) => {
            errors.forEach((error) => {
              if (error.path || error.name !== 'GraphQLError') {
                scope.setExtras({
                  path: error.path,
                  location: error.locations,
                });
                Sentry.AWSLambda.captureException(error);
              } else {
                scope.setExtras({});
                Sentry.AWSLambda.captureMessage(`GraphQLWrongQuery: ${error.message}`);
              }
            });
          });
        }
      },
    };
  },
};