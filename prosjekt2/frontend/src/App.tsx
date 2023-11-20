import { Route, Routes } from 'react-router-dom';
import './css/App.css';
import Home from './pages/Home';
import { SongInterface } from './types/interfaces';
import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
  from,
} from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import SongDisplay from './pages/SongDisplay';
import { useState } from 'react';

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
  new HttpLink({
    uri: import.meta.env.DEV
      ? 'http://localhost:4000/graphql'
      : 'http://it2810-30.idi.ntnu.no:4000/graphql',
  }),
]);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: link,
});

export default function App() {
  const [songs, setSongs] = useState<SongInterface[]>([]);

  return (
    <ApolloProvider client={client}>
      <Routes>
        <Route
          path="/project2/song/:id/reviews"
          element={<SongDisplay songs={songs} isShowingReviews={true} />}
        />
        <Route
          path="/project2/song/:id"
          element={<SongDisplay songs={songs} isShowingReviews={false} />}
        />
        <Route path="/project2/" element={<Home setSongs={setSongs} />} />
      </Routes>
    </ApolloProvider>
  );
}
