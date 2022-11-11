import { DateTime } from 'luxon';
import { BOOMI_END_TIME, BOOMI_START_TIME } from 'env';

export const CampTimer = (saleStart = BOOMI_START_TIME, saleEnd = BOOMI_END_TIME) => {
  const currentTime = DateTime.now();
  const startTime = DateTime.fromISO(saleStart);
  const endTime = DateTime.fromISO(saleEnd);
  const isStarted = startTime < currentTime;
  const isFinished = endTime < currentTime;
  return {
    isStarted,
    isFinished,
    countdown: (isFinished ? currentTime : isStarted ? endTime : startTime)
      .diff(currentTime, ['days', 'hours', 'minutes', 'seconds'])
      .toObject(),
  };
};

export const checkVipLevelStartTime = (vipLevel) => {
  switch (vipLevel) {
    case 'VIP Level 1':
      return '2022-01-03T04:00:00.000Z';
    case 'VIP Level 2':
      return '2022-01-03T03:30:00.000Z';
    case 'VIP Level 3':
      return '2022-01-03T03:00:00.000Z';
    default:
      return '2022-01-03T04:30:00.000Z';
  }
};
