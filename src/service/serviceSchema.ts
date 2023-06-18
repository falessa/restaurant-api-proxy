import { gql } from "apollo-server-express";

export const ServiceTypeDefs = gql`
  type Review {
    id: String
    rating: Float
    text: String
    time_created: String
    user: User
  }

  type User {
    id: String
    profile_url: String
    name: String
    image_url: String
  }

  type Business {
    id: String
    name: String
    hours: [Hours]
    rating: Float
    photos: [String]
    location: Location
    reviews: [Review]
    review_count: Int
  }

  type Location {
    address1: String
    address2: String
    address3: String
    city: String
    state: String
    country: String
    postal_code: String
    formatted_address: String
  }

  type Hours {
    is_open_now: Boolean
  }

  type Query {
    searchBusinesses(term: String!, location: String!): [Business]
  }
`;