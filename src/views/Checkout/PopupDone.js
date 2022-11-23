import { memo } from 'react';
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

const PopupDone = memo(({ onDone }) => {
  return (
    <div
      className='box-border text-center text-white px-20 flex flex-col justify-center items-center'
      style={{
        backgroundImage: `url(${require('assets/projects/ookeenga-INO/frame3.png')})`,
        backgroundSize: '100% 100%',
        maxWidth: '500px',
        height: '392px',
      }}
    >
      <div className='flex justify-center mb-6'>
        <img src='/assets/imgs/xl-icons/done.svg' width='90' height='90' />
      </div>
      <span style={{ fontSize: '30px', color: '#F5E6D5' }} className='mb-2 font-skadi'>
        Thank you!
      </span>
      <span className='mb-2' style={{ color: '#F5E6D5', fontSize: '14px' }}>
        Your submission has been recorded. We are processing your order.
      </span>
      <span style={{ color: '#F5E6D5', fontSize: '14px' }}>Feel free to contact us at:</span>
      <span className='mb-4' style={{ color: '#DA8B14', fontSize: '14px' }}>
      support@okglabs.com
      </span>
      <StyledButton
        size='large'
        onClick={onDone}
        style={{ fontSize: '20px', height: '120px', width: '220px' }}
      >
        Done
      </StyledButton>
    </div>
  );
});

export default PopupDone;
