import OokeengaINOLanding from 'views/OokeengaINO/OokeengaINOLanding';
import { lazy } from 'react';
import OokeengaINO3 from 'views/OokeengaINO/OokeengaINO3';

const OokeengaINOOrder = lazy(() =>
  import('views/OokeengaINO').then((module) => ({ default: module.OokeengaINOOrder })),
);

const privateRoute = {
  home: {
    path: '/tickets',
    component: OokeengaINOLanding,
  },
  projectOrder: {
    path: '/tickets/order-history',
    component: OokeengaINOOrder,
    requiredLogin: true,
  },
};

export default privateRoute;
