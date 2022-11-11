import { Grid, Typography } from '@mui/material';
import React, { useMemo } from 'react';
import { OokeengaINORightCard, WhitelistCard } from 'views/OokeengaINO/components';
import { OokeengaINOTabs } from './components';
import { SupportButton } from 'components';
import { isTest, projectData } from './Data';
import { useServicesContext } from 'services/ServicesContext';
import { useQuery } from 'react-query';

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
        className='p-4 lg:px-20 lg:pt-8 flex flex-col items-center justify-center'
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
          <Grid item xs={12} md={12} lg={4} xl={4} className='xl:sticky top-1'>
            <OokeengaINORightCard time={receivedTimeFromServer} />
          </Grid>
          <Grid item md={12} lg={8} xl={8}>
            <div
              style={{
                borderRadius: '8px',
              }}
              className='justify-between max-w-screen-xl'
            >
              <img className='mb-12 w-full' src={require('assets/projects/ookeenga-INO/inventory.png')} />
                {/* <div
                  className='w-full mb-4 p-6 md:p-4 flex md:flex-row flex-col items-center'
                  style={{
                    backgroundImage: `url(${require('assets/projects/ookeenga-INO/frame.png')})`,
                    backgroundSize: '100% 100%',
                  }}
                >
                  <video
                    src={
                      'https://spores-marketplace-assets-dev.s3.ap-southeast-1.amazonaws.com/b69e4dc7-e7db-48b8-ba98-93cb709eab29'
                    }
                    className=''
                    autoPlay
                    loop
                    muted
                    style={{ height: '400px' }}
                  />
                  <div className='bg-[#342014] w-full py-6 lg:py-9 px-8 lg:px-12 hidden sm:block'>
                    <div className='font-skadi font-bold text-[#F5E6D5] text-[32px]'>Genesis Cocoon</div>
                    <div className='sm:flex flex-row md:flex-col justify-between hidden'>
                      <div className='flex flex-col mt-4'>
                        <span className='text-[#B7A284]'>Price</span>
                        <span className='text-[#F5E6D5] font-bold text-2xl'>$100</span>
                      </div>
                      <div className='flex flex-col mt-4'>
                        <span className='text-[#B7A284]'>Quantity</span>
                        <span className='text-[#F5E6D5] font-bold text-2xl'>500</span>
                      </div>
                      <div className='flex flex-col mt-4'>
                        <span className='text-[#B7A284]'>NFT Type</span>
                        <span className='text-[#F5E6D5] font-bold text-2xl'>BEP 721</span>
                      </div>
                      <div className='flex flex-col mt-4'>
                        <span className='text-[#B7A284]'>Distribution netwwork</span>
                        <span className='text-[#F5E6D5] font-bold text-2xl'>BNB Chain</span>
                      </div>
                    </div>
                  </div>
                  <div className='w-full block sm:hidden'>
                    <Grid container columns={4} style={{ color: '#F5E6D5', textShadow: '0px 0px 6px 0px #FFFFFF59' }}>
                      <Grid item md={1} xs={5} className='relative text-center mt-4'>
                        <Typography className='mb-0 md:mb-2'>Price</Typography>
                        <Typography
                          style={{
                            fontSize: '22px',
                            fontWeight: '700',
                          }}
                        >
                          $100
                        </Typography>
                        <div
                          className='absolute hidden md:inline'
                          style={{
                            width: 1,
                            height: 40,
                            right: 0,
                            top: 12,
                            backgroundColor: 'rgba(183, 162, 132, 0.3)',
                          }}
                        />
                      </Grid>
                      <Grid item md={1} xs={5} className='relative text-center mt-4'>
                        <Typography className='mb-0 md:mb-2'>Quantity</Typography>
                        <Typography style={{ fontSize: '22px', fontWeight: '700' }}>500</Typography>
                        <div
                          className='absolute bg-gray-500 hidden md:inline'
                          style={{
                            width: 1,
                            height: 40,
                            right: 0,
                            top: 12,
                            backgroundColor: 'rgba(183, 162, 132, 0.3)',
                          }}
                        />
                      </Grid>
                      <Grid item md={1} xs={5} className='relative text-center mt-4'>
                        <Typography className='mb-0 md:mb-2'>NFT Type</Typography>
                        <Typography style={{ fontSize: '22px', fontWeight: '700' }}>BEP 721</Typography>
                        <div
                          className='absolute bg-gray-500 hidden md:inline'
                          style={{
                            width: 1,
                            height: 40,
                            right: 0,
                            top: 12,
                            backgroundColor: 'rgba(183, 162, 132, 0.3)',
                          }}
                        />
                      </Grid>
                      <Grid item md={1} xs={5} className='relative text-center mt-4'>
                        <Typography className='mb-0 md:mb-2'>Distribution network</Typography>
                        <Typography style={{ fontSize: '22px', fontWeight: '700' }}>BNB Chain</Typography>
                      </Grid>
                    </Grid>
                  </div>
                </div>
              <img className='mt-10 w-full' src={projectData.discountBanner} /> */}

              <OokeengaINOTabs receivedTimeFromServer={receivedTimeFromServer} />
            </div>
          </Grid>
        </Grid>
        <div
          columns={12}
          className='flex justify-center items-start mt-10'
          style={{
            maxWidth: '1500px',
          }}
        ></div>
      </div>
    </div>
  );
};

export default OokeengaINOLanding;
