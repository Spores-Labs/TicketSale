import { Button } from '@mui/material';
import { DesignButton } from 'components';
import { useCountdown } from 'hooks';
import React, { useMemo } from 'react';
import { formatTwoDigits } from 'utils/common';
import { hardCodeTime, projectData } from '../Data';

function WhitelistCard({ time }) {

  // start: time countdown
  const isStarted = useMemo(() => new Date(time.open_time).getTime() <= Date.now(), [time.open_time]);
  const isFinished = useMemo(() => new Date(time.close_time).getTime() <= Date.now(), [time.close_time]);
  const currentRound = useMemo(() => {
    if (!isStarted) return -1;
    else if (!isFinished) {
      if (new Date(time.fcfs_round_time).getTime() <= Date.now()) {
        return 3;
      } else if (new Date(time.double_limit_round_time).getTime() <= Date.now()) {
        return 2;
      } else {
        return 1;
      }
    }
    return 0;
  }, [time, isStarted, isFinished]);
  const times = useMemo(() => {
    switch (currentRound) {
      case -1: // not started
        return [new Date().toISOString(), time.open_time];
      default:
        // finished
        return [];
      case 0: // finished
        return [];
      case 1: // step 1
        return [time.open_time, time.double_limit_round_time];
      case 2: // step 2
        return [time.double_limit_round_time, time.fcfs_round_time];
      case 3: // step 3
        return [time.fcfs_round_time, time.close_time];
    }
  }, [time, currentRound]);
  const countdownData = useCountdown(times[0], times[1]);
  // end: time countdown

  return (
    <div>
      <div className='p-7 rounded-lg' style={{ backgroundColor: 'rgba(23, 10, 2, 0.8)' }}>
        <div className='flex space-x-4 mb-4 justify-center items-center xl:justify-start'>
          <img src={projectData.logo} className='h-12 w-12' />
          <div className=''>
            <div style={{ fontSize: '28px', color: '#F5E6D5' }} className='font-skadi font-bold'>
            OKG Community Sale
            </div>
          </div>
        </div>
        <div className='flex justify-between my-8 items-center'>
          <span
            className='text-xl'
            style={{
              color: '#F5E6D5'
            }}
          >
            Sale starts in
          </span>

          <span className='font-bold' style={{color:'#F5E6D5'}}>
            {formatTwoDigits(countdownData.countdown.days)}d {formatTwoDigits(countdownData.countdown.hours)}h{' '}
            {formatTwoDigits(countdownData.countdown.minutes)}m{' '}
            {formatTwoDigits(Math.floor(countdownData.countdown.seconds))}s
          </span>
        </div>
        <div className='flex flex-col w-full'>
          <DesignButton design='orange' size='large' href={projectData.whiteListUrl} target='_blank' className='h-14 text-base font-semibold'>
            GET WHITELISTED NOW
          </DesignButton>
        </div>
      </div>
    </div>
  );
}

export default WhitelistCard;
