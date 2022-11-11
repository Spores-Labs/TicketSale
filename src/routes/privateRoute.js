import OokeengaINOLanding from 'views/OokeengaINO/OokeengaINOLanding';
import { lazy } from 'react';
import OokeengaINO3 from 'views/OokeengaINO/OokeengaINO3';

const OokeengaINOOrder = lazy(() =>
  import('views/OokeengaINO').then((module) => ({ default: module.OokeengaINOOrder })),
);

const privateRoute = {
  // newPage: { 
  //   path: '/community-sales-ino',
  //   component: OokeengaINO3,
  // },
  home: {
    path: '/community-sales-ino',
    component: OokeengaINOLanding,
  },
  projectOrder: {
    path: '/community-sales-ino/order-history',
    component: OokeengaINOOrder,
    requiredLogin: true,
  },
};

export default privateRoute;
