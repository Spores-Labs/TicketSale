import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Provider as ReduxProvider } from 'react-redux';
import { QueryClientProvider } from 'react-query';
import { PrivateLayout } from 'layouts';
import { AppController, AppTheme } from 'containers';
import { SnackbarProvider } from 'notistack';
import { store } from 'reducers';
import { queryClient } from 'services/client';
import { ServicesContextProvider } from 'services/ServicesContext';
import OokeengaINORestricted from 'views/OokeengaINO/OokeengaINORestricted';

const App = () => {
  return (
    <ReduxProvider store={store}>
      <SnackbarProvider
        preventDuplicate
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        style={{ marginTop: 60 }}
      >
        <QueryClientProvider client={queryClient}>
          <AppTheme>
            <Router>
              <ServicesContextProvider>
                <AppController>
                  <Switch>
                    <Route path='/vn' component={OokeengaINORestricted} />
                    <Route path='/' component={PrivateLayout} />
                  </Switch>
                </AppController>
              </ServicesContextProvider>
            </Router>
          </AppTheme>
        </QueryClientProvider>
      </SnackbarProvider>
    </ReduxProvider>
  );
};

export default App;
