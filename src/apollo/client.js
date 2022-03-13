import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";

const defaultOptions = {
  watchQuery: {
    fetchPolicy: "no-cache",
    errorPolicy: "ignore",
  },
  query: {
    fetchPolicy: "no-cache",
    errorPolicy: "all",
  },
};

const cache = new InMemoryCache({
  resultCaching: false,
  // change to true before deploying
});

const link = createHttpLink({
  uri: process.env.NEXT_PUBLIC_WP_SITE_URL,
});

const client = new ApolloClient({
  link,
  cache,
  defaultOptions,
});

export default client;
