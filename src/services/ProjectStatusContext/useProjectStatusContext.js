import { useContext } from 'react';

import { ProjectStatusContext } from './ProjectStatusContext';

export const useProjectStatusContext = () => {
  const context = useContext(ProjectStatusContext);
  return context;
};
