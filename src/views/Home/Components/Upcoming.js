import { Typography } from '@mui/material';
import React, { memo } from 'react';

import { ProjectCard } from './ProjectCard';

export const Upcoming = memo(({ projects }) => {
  return (
    <div className='upcoming'>
      <Typography variant='h2' className='mb-6'>
        Upcoming
      </Typography>
      <div className='grid sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8'>
        {projects.map((project, index) => (
          <ProjectCard key={index} project={project} />
        ))}
      </div>
    </div>
  );
});
