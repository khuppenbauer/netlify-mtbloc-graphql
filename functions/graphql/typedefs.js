const { gql } = require('apollo-server-lambda');

module.exports = gql`
  scalar JSON
  
  type Query {
    allTracks: [Track]
    track(_id: ID!): Track
  }

  type Track {
    _id: ID!
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
    geoJson: FeatureCollection
  }

  type FeatureCollection {
    type: String
    features: [Feature]
  }

  type Feature {
    type: String
    properties: JSON 
    bbox: JSON
    geometry: Geometry
  }

  type Geometry {
    type: String
    coordinates: JSON
  }

  type Point {
    lat: Float
    lon: Float
  }
`;