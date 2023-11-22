import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
  from,
} from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import SongSelected from './pages/SongSelected';
import { Provider } from 'react-redux';
import store from './store';

// Error handling
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

// Link to the backend
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
  return (
    // Redux store is used to store the tag
    <Provider store={store}>
      {/* ApolloProvider is used to connect to the backend */}
      <ApolloProvider client={client}>
        <Routes>
          <Route
            path="/project2/song/:id/reviews"
            element={<SongSelected isShowingReviews={true} />}
          />
          <Route
            path="/project2/song/:id"
            element={<SongSelected isShowingReviews={false} />}
          />
          <Route path="/project2/" element={<Home />} />
        </Routes>
      </ApolloProvider>
    </Provider>
  );
}
