import { Button, Typography, Grid } from '@mui/material';
import { useCountdown } from 'hooks';
import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { createUseStyles } from 'react-jss';
import { getProjectConfigByAlias, projectAlias } from 'data';
import { getMarketService } from 'services/market';
import { useQuery } from 'react-query';
import { formatTwoDigits } from 'utils/common';
import { hardCodeTime } from 'views/Roe/Data';
import { projectData } from 'views/Roe/Data';
import { projectStatuses, saleStatuses } from 'data/project-statuses';

const useStyles = createUseStyles(
  {
    bannerItem: {
      position: 'relative',
      display: 'flex',
      height: 800,
      background: `url(${projectData.bigBanner}) no-repeat`,
      backgroundPosition: 'center center',
      backgroundSize: 'cover',
      flexDirection: 'column',
      '&:before': {
        content: '" "',
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        background: 'linear-gradient(90deg, rgba(0, 0, 0, 0.9) 29.17%, rgba(0, 0, 0, 0) 88.02%)',
      },
    },
  },
  {
    name: 'HomeBanner',
  },
);

export const RoeBanner = () => {
  const classes = useStyles();
  const marketService = useMemo(() => getMarketService(getProjectConfigByAlias(projectAlias.roe)), []);

  const { data: receivedTimeFromServer = {} } = useQuery(
    [`${projectAlias.roe}_marketService.fetchCampaignsTime`],
    () => marketService.fetchCampaignsTime(),
    {
      refetchOnMount: 'always',
      refetchInterval: 60 * 1000,
      staleTime: 0,
      enabled: projectData.status !== projectStatuses.completed,
    },
  );
  const time = hardCodeTime || receivedTimeFromServer;

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
  const countdownLable = useMemo(() => {
    switch (currentRound) {
      case -1: // not started
        return 'Sale starts in';
      default:
        // finished
        return 'SALE HAS ENDED';
      case 0: // finished
        return 'SALE HAS ENDED';
      case 1: // step 1
        return 'VIP round ends in';
      case 2: // step 2
        return 'VIP Double Quota ends in';
      case 3: // step 3
        return 'FCFS (VIP access only) ends in';
    }
  }, [currentRound]);
  const countdownData = useCountdown(times[0], times[1]);
  // end: time countdown

  const { data: dataX = [] } = useQuery(
    [`${projectAlias.roe}_marketService.fetchProducts`],
    () => marketService.fetchProducts(),
    {
      refetchOnMount: 'always',
      enabled: !!isStarted,
    },
  );

  const products = React.useMemo(() => {
    return dataX
      .sort((a, b) => a.product_id - b.product_id)
      .map((item) => {
        return {
          product_id: item?.product_id,
          prices: item?.product?.price,
          name: item?.product.name,
          remain_amount: item?.remain_quantity,
          amount: item?.product.amount,
        };
      });
  }, [dataX]);

  const amountLeft = products[0]?.remain_amount;
  const isSoldOut = useMemo(() => projectData.saleStatus === saleStatuses.soldOut || amountLeft <= 0, [amountLeft]);

  return (
    <div className={['relative flex justify-center items-center pb-10 px-6 w-full', classes.bannerItem].join(' ')}>
      <Grid
        container
        className='flex'
        style={{
          maxWidth: '1500px',
        }}
      >
        <Grid item xs={12} md={12} lg={7} xl={5} className='flex flex-col'>
          <div className='flex flex-col items-center xl:items-start rounded-lg py-20 z-10'>
            <img src={projectData.textLogo} className='mb-6' />
            <Typography
              variant='h1'
              align='center'
              className='text-4xl sm:text-5xl mb-8 font-bold'
              style={{ lineHeight: '80px', fontSize: '64px' }}
            >
              {`${projectData.name} ${projectData.saleType}`}
            </Typography>
            <div className='mb-6'>
              {!isSoldOut && (
                <Typography
                  variant='subtitle1'
                  letterSpacing={2}
                  className='font-bold text-lg bg-clip-text text-transparent'
                  style={{
                    background:
                      '-webkit-linear-gradient(90deg, rgba(255,130,130,1) 0%, rgba(255,196,79,1) 70%, rgba(255,81,0,1) 100%)',
                  }}
                >
                  {countdownLable}
                </Typography>
              )}
            </div>

            {!isFinished && !isSoldOut && (
              <div>
                <div className='hidden sm:flex'>
                  <div>
                    <div
                      className='flex justify-center items-center'
                      style={{
                        border: '1px solid linear-gradient(rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.04))',
                        borderRadius: '16px',
                      }}
                    >
                      <div
                        className='flex justify-center items-center'
                        style={{
                          width: '78px',
                          height: '78px',
                          background: 'linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.05))',
                          borderRadius: '16px',
                        }}
                      >
                        <span className='font-medium text-white' style={{ fontSize: '40px' }}>
                          {formatTwoDigits(countdownData.countdown.days)}
                        </span>
                      </div>
                    </div>
                    <div
                      className='text-center'
                      style={{
                        margin: 'auto',
                        fontSize: '18px',
                        lineHeight: '44px',
                        color: 'rgba(255, 255, 255, 0.5)',
                      }}
                    >
                      Days
                    </div>
                  </div>
                  <div className='font-bold text-4xl flex mt-4 mx-4'>:</div>
                  <div>
                    <div
                      className='flex justify-center items-center'
                      style={{
                        border: '1px solid linear-gradient(rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.04))',
                        borderRadius: '16px',
                      }}
                    >
                      <div
                        className='flex justify-center items-center'
                        style={{
                          width: '78px',
                          height: '78px',
                          background: 'linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.05))',
                          borderRadius: '16px',
                        }}
                      >
                        <span className='font-medium text-white' style={{ fontSize: '40px' }}>
                          {formatTwoDigits(countdownData.countdown.hours)}
                        </span>
                      </div>
                    </div>
                    <div
                      className='text-center'
                      style={{
                        margin: 'auto',
                        fontSize: '18px',
                        lineHeight: '44px',
                        color: 'rgba(255, 255, 255, 0.5)',
                      }}
                    >
                      Hours
                    </div>
                  </div>
                  <div className='font-bold text-4xl flex mt-4 mx-4'>:</div>
                  <div>
                    <div
                      className='flex justify-center items-center'
                      style={{
                        border: '1px solid linear-gradient(rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.04))',
                        borderRadius: '16px',
                      }}
                    >
                      <div
                        className='flex justify-center items-center'
                        style={{
                          width: '78px',
                          height: '78px',
                          background: 'linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.05))',
                          borderRadius: '16px',
                        }}
                      >
                        <span className='font-medium text-white' style={{ fontSize: '40px' }}>
                          {formatTwoDigits(countdownData.countdown.minutes)}
                        </span>
                      </div>
                    </div>
                    <div
                      className='text-center'
                      style={{
                        margin: 'auto',
                        fontSize: '18px',
                        lineHeight: '44px',
                        color: 'rgba(255, 255, 255, 0.5)',
                      }}
                    >
                      Minutes
                    </div>
                  </div>
                  <div className='font-bold text-4xl flex mt-4 mx-4'>:</div>
                  <div>
                    <div
                      className='flex justify-center items-center'
                      style={{
                        border: '1px solid linear-gradient(rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.04))',
                        borderRadius: '16px',
                      }}
                    >
                      <div
                        className='flex justify-center items-center'
                        style={{
                          width: '78px',
                          height: '78px',
                          background: 'linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.05))',
                          borderRadius: '16px',
                        }}
                      >
                        <span className='font-medium text-white' style={{ fontSize: '40px' }}>
                          {formatTwoDigits(Math.round(countdownData.countdown.seconds))}
                        </span>
                      </div>
                    </div>
                    <div
                      className='text-center'
                      style={{
                        margin: 'auto',
                        fontSize: '18px',
                        lineHeight: '44px',
                        color: 'rgba(255, 255, 255, 0.5)',
                      }}
                    >
                      Seconds
                    </div>
                  </div>
                </div>
                <div className='flex sm:hidden'>
                  <div>
                    <div
                      className='flex justify-center items-center'
                      style={{
                        border: '1px solid rgba(255, 255, 255, 0.4)',
                        borderRadius: '10px',
                      }}
                    >
                      <div
                        className='flex justify-center items-center'
                        style={{
                          width: '50px',
                          height: '50px',
                          background: 'linear-gradient(rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0))',
                          borderRadius: '10px',
                        }}
                      >
                        <span className='font-semibold text-white' style={{ fontSize: '32px' }}>
                          {formatTwoDigits(countdownData.countdown.days)}
                        </span>
                      </div>
                    </div>
                    <div
                      className='text-center'
                      style={{
                        margin: 'auto',
                        fontSize: '12px',
                        lineHeight: '44px',
                        color: 'rgba(255, 255, 255, 0.5)',
                      }}
                    >
                      Days
                    </div>
                  </div>
                  <div className='font-bold text-xl flex mt-2 mx-4'>:</div>
                  <div>
                    <div
                      className='flex justify-center items-center'
                      style={{
                        border: '1px solid rgba(255, 255, 255, 0.4)',
                        borderRadius: '10px',
                      }}
                    >
                      <div
                        className='flex justify-center items-center'
                        style={{
                          width: '50px',
                          height: '50px',
                          background: 'linear-gradient(rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0))',
                          borderRadius: '10px',
                        }}
                      >
                        <span className='font-semibold text-white' style={{ fontSize: '32px' }}>
                          {formatTwoDigits(countdownData.countdown.hours)}
                        </span>
                      </div>
                    </div>
                    <div
                      className='text-center'
                      style={{
                        margin: 'auto',
                        fontSize: '12px',
                        lineHeight: '44px',
                        color: 'rgba(255, 255, 255, 0.5)',
                      }}
                    >
                      Hours
                    </div>
                  </div>
                  <div className='font-bold text-xl flex mt-2 mx-4'>:</div>
                  <div>
                    <div
                      className='flex justify-center items-center'
                      style={{
                        border: '1px solid rgba(255, 255, 255, 0.4)',
                        borderRadius: '10px',
                      }}
                    >
                      <div
                        className='flex justify-center items-center'
                        style={{
                          width: '50px',
                          height: '50px',
                          background: 'linear-gradient(rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0))',
                          borderRadius: '10px',
                        }}
                      >
                        <span className='font-semibold text-white' style={{ fontSize: '32px' }}>
                          {formatTwoDigits(countdownData.countdown.minutes)}
                        </span>
                      </div>
                    </div>
                    <div
                      className='text-center'
                      style={{
                        margin: 'auto',
                        fontSize: '12px',
                        lineHeight: '44px',
                        color: 'rgba(255, 255, 255, 0.5)',
                      }}
                    >
                      Minutes
                    </div>
                  </div>
                  <div className='font-bold text-xl flex mt-2 mx-4'>:</div>
                  <div>
                    <div
                      className='flex justify-center items-center'
                      style={{
                        border: '1px solid rgba(255, 255, 255, 0.4)',
                        borderRadius: '10px',
                      }}
                    >
                      <div
                        className='flex justify-center items-center'
                        style={{
                          width: '50px',
                          height: '50px',
                          background: 'linear-gradient(rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0))',
                          borderRadius: '10px',
                        }}
                      >
                        <span className='font-semibold text-white' style={{ fontSize: '32px' }}>
                          {formatTwoDigits(Math.floor(countdownData.countdown.seconds))}
                        </span>
                      </div>
                    </div>
                    <div
                      className='text-center'
                      style={{
                        margin: 'auto',
                        fontSize: '12px',
                        lineHeight: '44px',
                        color: 'rgba(255, 255, 255, 0.5)',
                      }}
                    >
                      Seconds
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className='mt-6'>
              {isFinished || isSoldOut ? (
                <Link to={`/${projectData.alias}`}>
                  <Button style={{ width: '130px', height: '52px' }}>
                    <div
                      className='font-semibold h-14 w-56 flex justify-center items-center'
                      style={{ color: '#3C3C3E', fontSize: '16px' }}
                    >
                      Learn more
                    </div>
                  </Button>
                </Link>
              ) : (
                <Link to={`/${projectData.alias}`}>
                  <Button style={{ width: '130px', height: '52px' }}>
                    <div
                      className='font-semibold flex justify-center items-center'
                      style={{ color: '#3C3C3E', fontSize: '16px' }}
                    >
                      Participate
                    </div>
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </Grid>
        <Grid item lg={5} xl={7} className='xl:flex justify-center items-center'>
          {isSoldOut ? (
            <img
              src={require('assets/projects/supernova/soldout.png')}
              style={{
                borderRadius: '24px',
              }}
            />
          ) : isFinished ? (
            <img
              src={require('assets/projects/supernova/ended.png')}
              style={{
                borderRadius: '24px',
              }}
            />
          ) : null}
        </Grid>
      </Grid>
    </div>
  );
};
