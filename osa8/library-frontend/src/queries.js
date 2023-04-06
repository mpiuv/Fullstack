const {gql} =require ('graphql-tag')

const BOOK_DETAILS = gql`
  fragment BookDetails on Book {
    title
    published
    author {
      name
    }
    genres
    id
  }
`;

export const AUTHOR_AND_BOOK_COUNT = gql`
  query {
    allAuthors  {
      name
      born
      bookCount 
    }
  }
`

export const EDIT_AUTHOR = gql`
mutation   editAuthorAge($name: String!, $setBornTo: Int!){
  editAuthor(name:$name, setBornTo: $setBornTo){
    name,
    born
  }
} 
`

export const ALL_BOOKS = gql`
query AllBooks {
  allBooks {
    title
    published
    author {
      name 
    }
    genres
    id
  }
}
`

export const ALL_BOOKS_BY_GENRE = gql`
query getallBooks($genre: String!) {
  allBooks(genre: $genre) {
    title
    published
    genres
    author {
      name
    }
  }
}
`

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`

export const CREATE_BOOK = gql`
mutation addBook(
  $title: String!,
  $author: String!,
  $published: Int!,
  $genres: [String]!
){addBook(
  title: $title,
  author: $author,
  published: $published,
  genres: $genres
){ ...BookDetails}
} ${BOOK_DETAILS}
`
export const BOOK_ADDED = gql`
  subscription BookAdded{
    bookAdded {
      ...BookDetails
    }
  } ${BOOK_DETAILS}
`

export const GET_FAVORITE_GENRE = gql`
query GetFavoriteGenre($username:String!) {
  getFavoriteGenre(username:$username) {value}
}
`