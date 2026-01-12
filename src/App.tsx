import { ApolloProvider, client } from './apollo-client';
import { BookList } from './components/BookList';
import { AddBookForm } from './components/AddBookForm';
import { AddMemberForm } from './components/AddMemberForm';
import { Layout } from './components/layout/Layout';
import './App.css';

function App() {
  return (
    <ApolloProvider client={client}>
      <Layout>
        <div className="app-content">
          <section className="forms-section">
            <div className="forms-grid">
              <AddBookForm />
              <AddMemberForm />
            </div>
          </section>

          <section className="books-section">
            <BookList />
          </section>
        </div>
      </Layout>
    </ApolloProvider>
  );
}

export default App;
