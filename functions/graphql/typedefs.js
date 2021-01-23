const { gql } = require('apollo-server-lambda');

module.exports = gql`
  type Query {
    allTracks: [Track]
  }

  type Track {
    id: ID!
    name: String!
    date: String
    foreignKey: String
    type: String
    active: Boolean
    author: String
    startCoords: Point
    endCoords: Point
    minCoords: Point
    maxCoords: Point
    distance: Float
    elapsedTime: Float
    totalElevationGain: Float
    totalElevationLoss: Float
    startElevation: Float
    endElevation: Float
    elevLow: Float
    elevHigh: Float
    startCity: String
    startState: String
    startCountry: String
    endCity: String
    endState: String
    endCountry: String
    gpxFile: String
    gpxFileSmall: String
    staticImage: String
    geoJsonFile: String
    visualization: String
    startTime: String
    endTime: String
  }

  type Point {
    lat: Float
    lon: Float
  }
`;