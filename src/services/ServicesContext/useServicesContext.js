import { useContext } from 'react';

import { ServicesContext } from './ServicesContext';

export const useServicesContext = () => {
  const context = useContext(ServicesContext);
  return context;
};
