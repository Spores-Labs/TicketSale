import { memo } from 'react';
import { Button, buttonClasses, Container, CardMedia } from '@mui/material';
import { RocketLaunchOutlined } from '@mui/icons-material';
import { useWindowDimensions } from 'hooks/useWindowDimensions';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles(
  {
    cardMedia: {
      height: '447px',
    },
    applyButton: {},
    '@media (max-width: 767px)': {
      cardMedia: {
        height: '490px',
        backgroundSize: 'contain',
        padding: '320px 0px 0',
        backgroundPosition: 'top center',
        textAlign: 'center',
      },
      applyButton: {
        padding: '12px 20px',
        fontSize: '16px',
      },
    },
  },
  {
    name: 'HomeFooter',
  },
);

export const Footer = memo(({ url }) => {
  const classes = useStyles();
  const { width } = useWindowDimensions();
  return (
    <Container className=''>
      <CardMedia
        image={
          width >= 768
            ? require('assets/projects/home/BottomBanner.png')
            : require('assets/projects/home/SmallBottomBanner.png')
        }
        className={['md:pl-20 md:pt-36', classes.cardMedia].join(' ')}
      >
        <div style={{ width: 372 }}>
          <div className='text-4xl md:text-5xl font-bold mb-9'>Launch a project on Spores!</div>
          <a href={url} target='_blank'>
            <Button startIcon={<RocketLaunchOutlined />} className={classes.applyButton}>
              Apply to launch
            </Button>
          </a>
        </div>
      </CardMedia>
    </Container>
  );
});
