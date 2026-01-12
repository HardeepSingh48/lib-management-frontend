import { ApolloProvider, client } from './apollo-client';
import { BookList } from './components/BookList';
import { AddBookForm } from './components/AddBookForm';
import { AddMemberForm } from './components/AddMemberForm';
import './App.css';

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="app">
        <header className="app-header">
          <h1>📚 Mini Library Management System</h1>
          <p>Manage your books and members with ease</p>
        </header>

        <main className="app-main">
          <div className="forms-section">
            <AddBookForm />
            <AddMemberForm />
          </div>

          <div className="books-section">
            <BookList />
          </div>
        </main>

        <footer className="app-footer">
          <p>Built with GraphQL, TypeScript, Prisma, and React</p>
        </footer>
      </div>
    </ApolloProvider>
  );
}

export default App;
