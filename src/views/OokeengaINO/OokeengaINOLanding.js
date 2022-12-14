import { Grid, Typography } from '@mui/material';
import React, { useMemo } from 'react';
import { OokeengaINORightCard, WhitelistCard } from 'views/OokeengaINO/components';
import { OokeengaINOTabs } from './components';
import { SupportButton } from 'components';
import { isTest, projectData } from './Data';
import { useServicesContext } from 'services/ServicesContext';
import { useQuery } from 'react-query';
import OokeengaINOInventory from './components/OokeengaINOInventory';

const OokeengaINOLanding = () => {
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
      className='bg-no-repeat bg-fixed'
      style={{ backgroundImage: `url(${projectData.background})`, backgroundSize: '100% 100%' }}
    >
      <SupportButton />
      <div
        className='p-4 px-0 lg:px-20 lg:pt-8 flex flex-col items-center justify-center'
        style={{
          backgroundPosition: 'center center',
          backgroundSize: 'cover',
          paddingBottom: 180,
        }}
      >
        <Grid
          container
          spacing={4}
          className='flex justify-center items-start'
          style={{
            maxWidth: '1500px',
          }}
        >
          {/* <Grid item xs={12} md={12} lg={4} xl={4} className='xl:sticky top-1'>
            <OokeengaINORightCard time={receivedTimeFromServer} />
          </Grid> */}
          <Grid item md={12} lg={8} xl={8}>
            <div
              className='bg-no-repeat bg-center md:bg-top bg-cover px-8 sm:px-20 md:px-36 pt-8 pb-60 md:pb-[500px]'
              style={{ backgroundImage: `url(${projectData.infoBackground})`, backgroundSize: '100% 100% !important' }}
            >
              <OokeengaINOInventory />
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default OokeengaINOLanding;
