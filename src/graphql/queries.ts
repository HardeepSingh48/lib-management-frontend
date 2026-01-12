import { gql } from '@apollo/client';

export const LIST_BOOKS = gql`
  query ListBooks {
    listBooks {
      id
      title
      author
      available
      createdAt
      updatedAt
    }
  }
`;

export const GET_BOOK_BY_ID = gql`
  query GetBookById($id: Int!) {
    getBookById(id: $id) {
      id
      title
      author
      available
      createdAt
      updatedAt
    }
  }
`;

export const ADD_BOOK = gql`
  mutation AddBook($title: String!, $author: String!) {
    addBook(title: $title, author: $author) {
      id
      title
      author
      available
      createdAt
      updatedAt
    }
  }
`;

export const ADD_MEMBER = gql`
  mutation AddMember($name: String!) {
    addMember(name: $name) {
      id
      name
      createdAt
      updatedAt
    }
  }
`;

export const BORROW_BOOK = gql`
  mutation BorrowBook($bookId: Int!, $memberId: Int!) {
    borrowBook(bookId: $bookId, memberId: $memberId) {
      id
      title
      author
      available
      createdAt
      updatedAt
    }
  }
`;

export const RETURN_BOOK = gql`
  mutation ReturnBook($bookId: Int!, $memberId: Int!) {
    returnBook(bookId: $bookId, memberId: $memberId) {
      id
      title
      author
      available
      createdAt
      updatedAt
    }
  }
`;

export const LIST_MEMBERS = gql`
  query ListMembers {
    listMembers {
      id
      name
      createdAt
      updatedAt
    }
  }
`;
