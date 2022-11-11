import React, { useState } from 'react';

import { useInterval } from './useInterval';

import { CampTimer } from 'utils/campaign';

export const useCountdown = (startTime, endTime) => {
  const [campTimer, setCampTimer] = useState({
    isStarted: false,
    isFinished: false,
    countdown: {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    },
  });

  useInterval(
    () => {
      if (!startTime || !endTime) return;
      setCampTimer(CampTimer(startTime, endTime));
    },
    1000,
    [startTime, endTime],
  );

  return campTimer;
};
