import { Grid, Typography } from '@mui/material';
import React, { useMemo } from 'react';
import { SupportButton } from 'components';
import { isTest, projectData } from './Data';
import { useServicesContext } from 'services/ServicesContext';
import { useQuery } from 'react-query';

const OokeengaINO3 = () => {
  const { projectConfig, marketService } = useServicesContext();
  //get TIme campaign
  const { data: receivedTimeFromServer = {} } = useQuery(
    [`${projectConfig.alias}_marketService.fetchCampaignsTime`],
    () => marketService.fetchCampaignsTime(),
    {
      refetchOnMount: 'always',
      refetchInterval: 60 * 1000,
      staleTime: 0,
      enabled: !isTest,
    },
  );

  return (
    <div
      className='h-full flex flex-col items-center justify-center backdrop-blur-md'
      style={{
        backgroundImage: `url(${projectData.newBackground})`,
        backgroundPosition: 'center',
        backgroundPepeat: 'no-repeat',
        backgroundSize: 'cover',
        minHeight: '100vh',
      }}
    >
      <img
        src={projectData.bigSale}
        alt={projectData.name}
        className='w-full object-cover max-w-[538px] hover:cursor-pointer'
      />
    </div>
  );
};

export default OokeengaINO3;
