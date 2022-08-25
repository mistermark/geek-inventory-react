/* eslint-disable */
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { IntlProvider } from 'react-intl';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider
} from '@apollo/client';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';

import App from './App';
import reportWebVitals from './reportWebVitals';
import Layout from './components/Layout';
import './index.css';

const cache = new InMemoryCache({
  typePolicies: {
    CollectionItemMetaData: {
      merge: true,
    },
  },
});

const client = new ApolloClient({
  uri: 'http://localhost:8000/',
  cache,
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <IntlProvider locale="nl" defaultLocale="en">
        <Layout>
          <ApolloProvider client={client}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <App />
            </LocalizationProvider>
          </ApolloProvider>
        </Layout>
      </IntlProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
