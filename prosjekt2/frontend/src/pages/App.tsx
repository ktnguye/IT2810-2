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
  id: '1',
  title: 'Song title',
  artist: 'Artist name',
  cover: 'https://picsum.photos/seed/picsum/200/300',
  genres: ['Pop', 'Rock'],
  year: 2021,
  album: 'Album name',
  length: 180,
  rating: 4.5,
};

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ message, locations, path }) =>
      console.log(
        `GraphQL Errors: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    );
  }
  if (networkError) {
    console.log(`Network Error: ${networkError}`);
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

function App() {
  return (
    <ApolloProvider client={client}>
      <Routes>
        <Route path="/song/:id" element={<Home song={song} />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </ApolloProvider>
  );
}

export default App;
