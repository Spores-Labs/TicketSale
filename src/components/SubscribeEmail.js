import clsx from 'clsx';
import React from 'react';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  container: {
    height: '156px',
    backgroundColor: '#FEF6D8',
    bottom: '100%',
    width: '100%',
    zIndex: '999'
  },
});

export const SubscribeEmail = () => {
  const classes = useStyles();
  return <div className={clsx('subscribe-email absolute', classes.container)}></div>;
};
