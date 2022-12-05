import React, { memo } from 'react';
import { Link as MuiLink } from '@mui/material';

export const SupportButton = memo(({ supportUrl = 'https://t.me/+_q6TJ9OCANFlNzI1' }) => {
  return (
    <div
      style={{
        position: 'sticky',
        top: '70vh',
        zIndex: '1',
      }}
    >
      <div className='grid justify-center content-around mr-2 md:mr-6' style={{ position: 'absolute', right: 1 }}>
        <MuiLink
          href={supportUrl}
          target='_blank'
          className='opacity-80 hover:opacity-100 grid justify-center'
          title='Telegram'
        >
          <img
            className='w-full, h-full'
            src={require('assets/designs/support.png')}
            width='60'
            height='60'
            style={{ height: '60px', width: '60px' }}
            alt='support link'
          />
        </MuiLink>
      </div>
    </div>
  );
});
