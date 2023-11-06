import { Route, Routes } from 'react-router-dom';
import '../css/App.css';
import Home from './Home';
import { SongInterface } from '../types/interfaces';
import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
  from,
} from '@apollo/client';
import { onError } from '@apollo/client/link/error';

const song: SongInterface = {
  id: 1,
  title: 'Song title',
  artist: 'Artist name',
  tag: 'Rock',
  year: 2021,
  views: 328,
  lyrics: 'Dette er en banger sang',
};

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ message }) =>
      console.log(`GraphQL Errors: Message: ${message}`)
    );
  }
  if (networkError) {
    console.log(`Network Error`);
  }
});

const link = from([
  errorLink,
  new HttpLink({ uri: 'http://localhost:4000/graphql' }),
]);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: link,
});

export default function App() {
  return (
    <ApolloProvider client={client}>
      <Routes>
        <Route path="/project2/song/:id" element={<Home song={song} />} />
        <Route path="/project2/" element={<Home />} />
      </Routes>
    </ApolloProvider>
  );
}
