import { Container } from '@mui/material';
import React from 'react';
import { Banner, ActiveProjects, CompletedSales, Upcoming, Footer } from './Components';
import { useProjectStatusContext } from 'services/ProjectStatusContext';
import { ProjectStatusContextProvider } from 'services/ProjectStatusContext';

const Home = () => {
  const { activeProjectsData, upcomingProjectsData, completedSalesData } = useProjectStatusContext();
  return (
    <div className='text-white'>
      <Banner />

      <div style={{ backgroundColor: '#0A0C10' }}>
        {!!activeProjectsData.length && (
          <Container className='py-12'>
            <ActiveProjects projects={activeProjectsData} />
          </Container>
        )}

        {!!upcomingProjectsData.length && (
          <Container className='py-12'>
            <Upcoming projects={upcomingProjectsData} />
          </Container>
        )}

        <Container className='py-12 mb-20'>
          <CompletedSales projects={completedSalesData} />
        </Container>

        <Footer url='https://docs.google.com/forms/d/1K_GPDM6RmYbz60GWyEy9IKXUyEGBrRqlTnmqU8Gd1cw/viewform?edit_requested=true#settings' />
        <div className='h-20' />
      </div>
    </div>
  );
};

const HomeWithContext = () => (
  <ProjectStatusContextProvider>
    <Home />
  </ProjectStatusContextProvider>
);

export default HomeWithContext;
