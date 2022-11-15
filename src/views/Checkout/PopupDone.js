import { memo } from 'react';
import { DesignButton } from 'components';

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
      <DesignButton
        design='orange'
        size='large'
        onClick={onDone}
        style={{ fontSize: '20px', height: '120px', width: '220px' }}
      >
        Done
      </DesignButton>
    </div>
  );
});

export default PopupDone;
