import { memo } from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Link as MuiLink, Toolbar, Typography } from '@mui/material';
import { privateRoute } from 'routes';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles(
  {
    footer: {},
    '@media (max-width: 767px)': {
      footer: {
        flexDirection: 'column',
      },
    },
  },
  {
    name: 'LayoutFooter',
  },
);

const Footer = memo(() => {
  const classes = useStyles();

  return (
    <AppBar className='px-4' position='sticky' elevation={0} style={{ backgroundColor: 'rgba(23, 10, 2, 0.8)' }}>
      <Toolbar className={classes.footer}>
        <div className='md:flex flex-1 justify-start text-[#CCC3B5] grid md:grid-none grid-cols-2 md:grid-cols-none'>
          <Typography className='hidden md:inline'>Contact Us: support@okglabs.com</Typography>
        </div>
      </Toolbar>
    </AppBar>
  );
});

export default Footer;
