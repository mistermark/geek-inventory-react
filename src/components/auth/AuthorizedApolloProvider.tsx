import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { useAuth0 } from '@auth0/auth0-react';
import React from 'react';

export const AuthorizedApolloProvider = ({ children }: { children: React.ReactElement}) => {
  const { getAccessTokenSilently, isLoading, isAuthenticated } = useAuth0();
  if (isLoading) return <div>Loading...</div>;
  const httpLink = createHttpLink({
    uri: process.env.REACT_APP_NODE_API_URI,
  });

  const authLink = setContext(async () => {
    if (isAuthenticated) {
      const token = await getAccessTokenSilently();
      return {
        headers: {
          authorization: `Bearer ${token}`,
        },
      };
    } else {
      return {};
    }
  });
  const apolloClient = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });
  return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>;
}
