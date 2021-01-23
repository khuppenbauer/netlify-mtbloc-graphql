module.exports = db => ({
  Query: {
    allTracks: async () => {
      const tracks = await db.collection('tracks').find().toArray()
      return tracks.map (track => {
        return {
          ...track,
          id: track._id,
        };
      });
    }
  },
});