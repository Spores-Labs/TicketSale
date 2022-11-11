import React, { useEffect } from 'react';

export const useInterval = (func, interval, ...deps) => {
  useEffect(() => {
    const handler = setInterval(func, interval);
    return () => clearInterval(handler);
  }, [func, interval, ...deps]);
};
