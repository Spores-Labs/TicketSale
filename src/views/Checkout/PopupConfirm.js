import React, { memo, useCallback } from 'react';
import { Button, Dialog, Typography } from '@mui/material';
import { styled } from '@mui/system';
import { DesignButton } from 'components';
import { LoadingButton } from '@mui/lab';

export const StyledButton = ({
  design = 'linear-gradient(152.68deg, #E1A34F 16.58%, #A36C22 82.97%)',
  size = 'medium',
  disabled,
  loading,
  ...props
}) => {
  if (disabled) design = 'linear-gradient(152.68deg, #71604A 16.58%, #5B4B36 82.97%)';
  return (
    <LoadingButton
      disabled={disabled}
      fontFamily='Skranji'
      sx={{
        borderRadius: '8px',
        background: design,
        textShadow:
          design === 'linear-gradient(152.68deg, #71604A 16.58%, #5B4B36 82.97%)'
            ? '0px 2px 2px 0px #61412780'
            : '0px 2px 2px rgba(97, 65, 39, 0.5)',

        boxShadow: '0px 4px 32px rgba(68, 43, 23, 0.2), 0px 2px 4px rgba(68, 43, 23, 0.3)',
        backgroundSize: '100% 100%',
        fontFamily: 'Skranji',
        color: design === 'linear-gradient(152.68deg, #71604A 16.58%, #5B4B36 82.97%)' ? '#7B6C5B' : '#FFEAD2',
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
            <StyledButton size='large' onClick={onYes} style={{ fontSize: '20px', height: '100px', width: '160px' }}>
              {yesBtnText}
            </StyledButton>
            <StyledButton
              design='linear-gradient(152.68deg, #776458 16.58%, #49382E 82.97%)'
              size='large'
              onClick={onNo}
              style={{ fontSize: '20px', height: '100px', width: '160px' }}
            >
              {noBtnText}
            </StyledButton>
          </div>
        </div>
      </StyledDialog>
    );
  },
);
