import React, { memo, useCallback } from 'react';
import { Button, Dialog, Typography } from '@mui/material';
import { styled } from '@mui/system';
import { DesignButton } from 'components';

const NoButton = styled(Button)(({ theme }) => ({
  background: '#EBECF0',
}));

const StyledDialog = styled(Dialog)(({ theme }) => ({
  background: '#000',
}));

export const PopupConfirm = memo(
  ({
    title = 'Cancel?',
    message = 'Are you sure you want to cancel?',
    noBtnText = 'No',
    yesBtnText = 'Yes',
    onAnswer,
    open,
    onClose,
  }) => {
    const onYes = useCallback(() => {
      onAnswer(true);
    }, [onAnswer]);

    const onNo = useCallback(() => {
      onAnswer(false);
    }, [onAnswer]);
    return (
      <StyledDialog open={open} onClose={onClose} maxWidth='md'>
        <div
          className='box-border flex flex-col justify-center text-center text-white px-20 py-10'
          style={{
            backgroundImage: `url(${require('assets/projects/ookeenga-INO/frame3.png')})`,
            backgroundSize: '100% 100%',
            maxWidth: '500px',
            height: '352px',
          }}
        >
          <div className='flex justify-center mb-6'>
            <img src='/assets/imgs/xl-icons/warning.svg' width='57' height='54' alt='warning icon' />
          </div>

          {/* <Typography  variant='h3' className='my-2'>
            {title}
          </Typography> */}

          <p
            className='font-skadi font-bold'
            style={{ color: '#DA8B14', fontSize: '24px' }}
            variant='body2'
            color='silver'
          >
            {message}
          </p>

          <div className='mt-4 grid grid-flow-col gap-4'>
            <DesignButton design='orange' size='large' onClick={onYes} style={{ fontSize: '20px',height: '100px', width: '160px' }}>
              {yesBtnText}
            </DesignButton>
            <DesignButton design='green' size='large' onClick={onNo} style={{ fontSize: '20px',height: '100px', width: '160px' }}>
              {noBtnText}
            </DesignButton>
          </div>
        </div>
      </StyledDialog>
    );
  },
);
