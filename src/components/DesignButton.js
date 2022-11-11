import { LoadingButton } from '@mui/lab';
import React from 'react';

/// design?: 'orange' | 'gray' | 'green' | 'yellow';
const DesignButton = ({ design = 'orange', size = 'medium', disabled, loading, ...props }) => {
  if (disabled) design = 'gray';
  return (
    <LoadingButton
      disabled={disabled}
      fontFamily='Skranji'
      sx={{
        background: `url(${require(`assets/components/${design}_${size}.png`)})`,
        backgroundSize: '100% 100%',
        fontFamily: 'Skranji',
        color: design === 'gray' ? '#B7A284' : '#F1E9DC',
        paddingLeft: 2,
        paddingRight: 2,
        minWidth: 0,
      }}
      classes={{
        sizeLarge: 'h-15 text-xl',
        sizeMedium: 'h-11',
      }}
      {...props}
    />
  );
};

export default DesignButton;
