import { Typography, Box, AppBar, Grid } from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import Tabs, { tabsClasses } from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import OokeengaINOInventory from './OokeengaINOInventory';
import HowToBuy from './HowToBuy';
import { styled } from '@mui/system';
import { DateTime } from 'luxon';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: 'transparent',
  boxShadow: 'none',
  '.MuiTabs-indicator': {
    display: 'none',
  },
  [`& .${tabsClasses.root}, .MuiTabs-scroller`]: {
    padding: '24px !important',
    margin: '-24px !important',
  },
  [`& .${tabsClasses.flexContainer}`]: {
    flexWrap: 'wrap',
  },
}));

const StyledTab = styled(Tab)(({ theme }) => ({
  display: 'flex',
  height: '60px',
  fontSize: '20px',
  paddingLeft: '38px',
  paddingRight: '38px',
  background: `url(${require(`assets/components/gray_medium.png`)})`,
  backgroundSize: '100% 100%',
  flexDirection: 'row',
  alignItems: 'center',
  position: 'relative',
  marginBottom: '6px',
  fontFamily: 'Skranji',
  color: '#B7A284',
  '&.Mui-selected': {
    background: `url(${require(`assets/components/green_medium.png`)})`,
    backgroundSize: '100% 100%',
    fontFamily: 'Skranji',
    color: '#FFFFFF',
    '&:before': {
      content: '" "',
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      zIndex: -1,
    },
  },
}));

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ py: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
};

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const OokeengaINOTabs = ({ receivedTimeFromServer }) => {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  const formatTime = (timeISO) => {
    return DateTime.fromISO(timeISO).toUTC().toFormat('dd MMMM yyyy HH:mm');
  };

  return (
    <div className='w-full p-9 mt-10 rounded-lg' style={{ backgroundColor: 'rgba(23, 10, 2, 0.8)' }}>
      <StyledAppBar position='static' className='p-0'>
        <Tabs value={value} onChange={handleChange} indicatorColor='secondary' textColor='inherit'>
          <StyledTab label='Sale schedule' {...a11yProps(0)} />
          <StyledTab label='Project information' {...a11yProps(1)} />
          <StyledTab label='How to buy' {...a11yProps(2)} />
        </Tabs>
      </StyledAppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel className='bg-inherit' value={value} index={0} dir={theme.direction}>
          <div className='flex flex-col gap-6'>
            <div className='flex flex-col gap-7 w-full'>
              <div className='text-xl leading-8 text-white' style={{ fontFamily: 'Skranji' }}>
                Inventory
              </div>
              <div className='flex flex-col lg:flex-row gap-4 justify-center items-center'>
                <div className='flex border-[1px] rounded-lg border-[#463024] w-full md:w-3/4 lg:w-1/2 p-4 gap-3 relative'>
                  <div className='flex flex-row absolute top-[-8px] right-0 z-10 '>
                    <img src={require('assets/projects/ookeenga-INO/sale.png')} width='51' height='52' alt='sale' />
                  </div>
                  <img src={require('assets/projects/ookeenga-INO/cocoon.png')} />
                  <div className='flex flex-col justify-between'>
                    <span className='text-[#F5E6D5] font-bold text-lg'>Genesis cocoon - OKG</span>
                    <span className='text-[#DA8B14] text-base'>
                    3,500 OKG <span className='text-xs line-through text-[#8C744E]'>3,888 OKG</span>
                    </span>
                    <span className='text-[#F5E6D5] text-base'>1,500 items</span>
                  </div>
                </div>
                <div className='flex border-[1px] rounded-lg border-[#463024] w-full md:w-3/4 lg:w-1/2 p-4 gap-3'>
                  <img src={require('assets/projects/ookeenga-INO/cocoon.png')} />
                  <div className='flex flex-col justify-between'>
                    <span className='text-[#F5E6D5] font-bold text-lg'>Genesis cocoon - USD</span>
                    <span className='text-[#DA8B14] text-base'>$100</span>
                    <span className='text-[#F5E6D5] text-base'>3,500 items</span>
                  </div>
                </div>
              </div>
              <div className='w-full lg:w-full' style={{ border: '1px #463024 solid', borderWidth: '1px 1px 0px 1px' }}>
                {[
                  {
                    title: 'NFT type',
                    info: 'BEP 721',
                  },
                  {
                    title: 'Distribution network',
                    info: 'BNB Chain',
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className='flex justify-between items-end md:text-left px-6 py-4'
                    style={{ borderBottom: '1px #463024 solid' }}
                  >
                    {item.url ? (
                      <div className='font-bold' style={{ fontSize: '16px', color: '#cfb657' }}>
                        {item.title}
                      </div>
                    ) : (
                      <div className='font-normal' style={{ fontSize: '16px', color: '#B7A284' }}>
                        {item.title}
                      </div>
                    )}

                    <div className='font-bold text-right' style={{ fontSize: '18px', color: '#F5E6D5' }}>
                      {item.info}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className='flex flex-col gap-7 w-full'>
              <div className='text-xl leading-8 text-white' style={{ fontFamily: 'Skranji' }}>
                Sale Schedule
              </div>
              <div className='w-full lg:w-full' style={{ border: '1px #463024 solid', borderWidth: '1px 1px 0px 1px' }}>
                {[
                  {
                    title: 'Pool type',
                    info: 'Open for EVERYONE - FCFS',
                  },
                  {
                    title: 'Start time:',
                    info: '17 Oct 2022 10:00 UTC',
                  },
                  {
                    title: 'End time:',
                    info: '01 Nov 2022 10:00 UTC',
                  },
                  {
                    title: 'Promotion',
                    info: (
                      <span>
                        Buy 2 get 1 FREE
                        <br />
                        Additional discount 10% if paid with OKG{' '}
                      </span>
                    ),
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className='flex justify-between items-end md:text-left px-6 py-4'
                    style={{ borderBottom: '1px #463024 solid' }}
                  >
                    {item.url ? (
                      <div className='font-bold' style={{ fontSize: '16px', color: '#cfb657' }}>
                        {item.title}
                      </div>
                    ) : (
                      <div className='font-normal' style={{ fontSize: '16px', color: '#B7A284' }}>
                        {item.title}
                      </div>
                    )}

                    <div className='font-bold text-right' style={{ fontSize: '18px', color: '#F5E6D5' }}>
                      {item.info}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <OokeengaINOInventory />
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
          <HowToBuy />
        </TabPanel>
      </SwipeableViews>
    </div>
  );
};
export default OokeengaINOTabs;
