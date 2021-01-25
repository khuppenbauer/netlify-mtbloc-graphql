const GraphQLJSON = require('graphql-type-json');
const ObjectId = require('mongodb').ObjectId;
const GraphQLFields = require('graphql-fields');

module.exports = db => ({
  JSON: GraphQLJSON,
  Query: {
    allTracks: async (parent, args, context, info) => {
      const fields = Object.keys(GraphQLFields(info));
      const projection = fields.reduce((a, b) => ({ ...a, [b]: 1 }), {})
      return await db.collection('tracks').find({}, { projection }).toArray();
    },
    track: async (parent, args, context, info) => {
      const track = await db.collection('tracks').findOne({_id: new ObjectId(args._id)});
      return {
        ...track,
        date: new Date(track.date).toISOString(),
        startTime: new Date(track.startTime).toISOString(),
        endTime: new Date(track.endTime).toISOString(),
        createdAt: new Date(track.createdAt).toISOString(),
        updatedAt: new Date(track.updatedAt).toISOString(),
      };
    },
  },
});