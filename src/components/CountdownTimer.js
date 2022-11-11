import Countdown from 'react-countdown';

const Box = ({ text, label }) => {
  const chars = text.split('');
  return (
    <div className='flex flex-col items-center'>
      <div className='inline-flex mx-2'>
        {chars.map((char, index) => (
          <span
            key={index}
            className='bg-white font-medium text-4xl text-center rounded w-10 h-11 mx-0.5'
            style={{ color: '#1D1E22' }}
          >
            {char}
          </span>
        ))}
      </div>
      <div className='text-xs mt-2'>{label}</div>
    </div>
  );
};

const CountdownTimer = ({ endTime }) => {
  return (
    <Countdown
      date={endTime}
      renderer={({ formatted: { days, hours, minutes, seconds } }) => {
        return (
          <div className='flex'>
            <Box text={days} label='DAYS' />
            <Box text={hours} label='HOURS' />
            <Box text={minutes} label='MINUTES' />
            <Box text={seconds} label='SECONDS' />
          </div>
        );
      }}
    />
  );
};

export default CountdownTimer;
