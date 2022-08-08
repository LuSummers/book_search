import { gql } from '@apollo/client';

export const QUERY_ME = gql`
  {
    me {
      _id
      username
      email
      books {
        _id
        authors
        description
        image
        link
        title
      }
    }
  }
`;