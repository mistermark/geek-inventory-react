/* eslint-disable */
import React, { ComponentType } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, useNavigate } from 'react-router-dom';
import { IntlProvider } from 'react-intl';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { Auth0Provider } from '@auth0/auth0-react';
import { createTheme, ThemeProvider } from '@mui/material';

import App from './App';
import reportWebVitals from './reportWebVitals';
import Layout from './components/Layout';
import './index.css';
import { AuthorizedApolloProvider } from './components/auth/AuthorizedApolloProvider';

type Auth0ProviderWithRedirectCallbackProps = {
  children: any;
  domain: string;
  clientId: string;
  redirectUri: string;
  audience: string;
};

const Auth0ProviderWithRedirectCallback = ({
  children,
  domain,
  clientId,
  redirectUri,
  audience,
  ...props
}: Auth0ProviderWithRedirectCallbackProps) => {
  const navigate = useNavigate();
  const onRedirectCallback = (appState: any) => {
    navigate((appState && appState.returnTo) || window.location.pathname);
  };
  return (
    <Auth0Provider
      onRedirectCallback={onRedirectCallback}
      domain={domain}
      clientId={clientId}
      redirectUri={redirectUri}
      audience={audience}
      {...props}
    >
      {children}
    </Auth0Provider>
  );
};

const theme = createTheme({
  components: {
    MuiAppBar: {
      styleOverrides: {
        colorPrimary: {
          backgroundColor: 'var(--color-primary)'
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        contained: {
          backgroundColor: 'var(--color-secondary)'
        }
      }
    }
  }
})

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Auth0ProviderWithRedirectCallback
          domain={process.env.REACT_APP_AUTH0_DOMAIN || ''}
          clientId={process.env.REACT_APP_AUTH0_CLIENTID || ''}
          redirectUri={window.location.origin}
          audience={process.env.REACT_APP_AUTH0_AUDIENCE || ''}
        >
          <IntlProvider locale="nl" defaultLocale="en">
            <AuthorizedApolloProvider>
              <Layout>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <App />
                </LocalizationProvider>
              </Layout>
            </AuthorizedApolloProvider>
          </IntlProvider>
        </Auth0ProviderWithRedirectCallback>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
