import React, { Suspense, useMemo } from 'react';
import { Redirect, Route, Switch } from 'react-router';
import { useSelector } from 'react-redux';
import { AppFooter, AppHeader } from 'containers';
import { privateRoute } from 'routes';

const PrivateLayout = () => {
  const { isLoggedIn } = useSelector(({ profile }) => profile);

  const routes = useMemo(
    () => Object.values(privateRoute).filter(({ requiredLogin }) => (requiredLogin ? isLoggedIn : true)),
    [isLoggedIn],
  );

  return (
    <main className='min-h-screen flex flex-col'>
      <AppHeader />
      <div className='flex-1 h-full' style={{ backgroundColor: '#0A0C10', height: '100%' }}>
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            {routes.map(({ path, component }) => (
              <Route exact key={path} path={path} component={component} />
            ))}
            <Redirect from='/' to={privateRoute.home.path} />
          </Switch>{' '}
        </Suspense>
      </div>
      <AppFooter />
    </main>
  );
};

export default PrivateLayout;
