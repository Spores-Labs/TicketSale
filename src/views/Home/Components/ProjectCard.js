import React, { useMemo } from 'react';
import clsx from 'clsx';
import { createUseStyles } from 'react-jss';
import { formatNumber, isNumeric } from 'utils/common';
import { Button, LinearProgress, linearProgressClasses } from '@mui/material';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { projectStatuses } from 'data/project-statuses';

export const TotalRaiseProgress = styled(LinearProgress)(({ theme }) => ({
  height: 8,
  borderRadius: 18,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    background: '#222325',
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 18,
    background: 'linear-gradient(270deg, rgba(255, 239, 94, 1) 0%, rgba(247, 147, 111, 1) 100%)',
  },
}));

const useStyles = createUseStyles(
  {
    projectCard: {
      minHeight: '400px',
      border: '1px solid transparent',
      overflow: 'hidden',
    },
    link: {
      '& $projectCard:hover': {
        borderColor: '#EECE7C',
      },
    },
    projectCardBanner: {
      maxHeight: '517px',
      margin: '-1.5rem',
      position: 'relative',
      '&:after': {
        position: 'absolute',
        content: '" "',
        top: '50%',
        left: 0,
        right: 0,
        bottom: 0,
        background: 'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #000000 100%)',
      },
    },
    projectName: {
      fontSize: '20px',
      lineHeight: '30px',
      fontFeatureSettings: "'tnum' on, 'lnum' on",
    },
    tokenTag: {
      fontSize: '16px',
      lineHeight: '24px',
      fontFeatureSettings: "'tnum' on, 'lnum' on",
      color: '#a9a9b0',
      '&:not(:first-child)::before': {
        content: '" / "',
        display: 'inline-block',
        margin: '0 .5rem',
      },
    },
    projectCardDescription: {
      fontWeight: 700,
      fontSize: '16px',
      lineHeight: '24px',
      fontFeatureSettings: "'tnum' on, 'lnum' on",
      color: '#87878D',
    },
    projectRaise: {
      fontWeight: 700,
      fontSize: '24px',
      lineHeight: '34px',
      textAlign: 'right',
      fontFeatureSettings: "'tnum' on, 'lnum' on",
      color: '#EECE7C',
    },
    btnLearnMore: {
      width: '100%',
      height: '36px',
    },
    saleStatus: {
      position: 'absolute',
      zIndex: 1,
      top: '16px',
      right: 0,
      fontSeight: 700,
      fontSize: '14px',
      lineHeight: '24px',

      height: '32px',
      background: '#00B074',
      borderRadius: '40px',
      padding: '4px 12px',
    },
  },
  {
    name: 'ProjectCard',
  },
);

export const ProjectCard = ({ className, project }) => {
  const classes = useStyles();

  const soldPercent = useMemo(
    () => Math.round(((project.amount - project.remainAmount) / project.amount) * 1001) / 10,
    [project],
  );

  const renderContent = () => {
    return (
      <div className={clsx('project-card bg-gray-900 rounded-lg p-6', classes.projectCard, className)}>
        <div className='relative'>
          {/* {!!project.saleStatus && <span className={classes.saleStatus}>{project.saleStatus}</span>} */}
          <div className={classes.projectCardBanner} style={{ maxHeight: '517px' }}>
            <img src={project.banner} alt={project.name} className='w-full object-cover' />
          </div>
          <div className='flex flex-row absolute bottom-4 left-0'>
            <div className='mr-4'>
              <img src={project.logo} alt={project.name} width='58' height='58' />
            </div>
            <div className='flex flex-col'>
              <h5 className={clsx('text-white font-bold', classes.projectName)}>
                {project.name} {project.saleType}
              </h5>
              <div>
                {project.acceptedTokens.map((token, index) => (
                  <span key={index} className={clsx(classes.tokenTag, 'font-thin')}>
                    {token}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className='mt-12'>
          <div className='mb-4 flex justify-between items-center'>
            <div className={classes.projectCardDescription}>
              {project.status === projectStatuses.completed ? 'Total raised' : 'Targeted raise'}
            </div>{' '}
            {!!project.totalRaise ? (
              <div className={clsx(classes.projectRaise, 'flex items-center')}>
                <span className='font-bold'>{formatNumber(project.totalRaise, '$') || 'TBA'} </span>
                {/*
                <span className='ml-1'>
                  <img src='/assets/imgs/logo-bsc.svg' width='24' height='24' alt='logo bsc' />
                </span>
                */}
              </div>
            ) : (
              <div className={clsx(classes.projectRaise, 'font-bold')}>TBA</div>
            )}
          </div>
          {project.meta.map((metaItem, index) => (
            <div key={index} className='mb-4 flex justify-between items-center'>
              <div className={classes.projectCardDescription}>{metaItem.label}</div>{' '}
              {!!metaItem.value ? (
                <div className='font-bold'>
                  {isNumeric(metaItem.value) ? formatNumber(metaItem.value, metaItem.prefix) : metaItem.value}
                </div>
              ) : (
                <div className='font-bold'>TBA</div>
              )}
            </div>
          ))}
          <div className='mb-4 flex justify-between items-center'>
            <div className={classes.projectCardDescription}>Starts</div>
            <div className='font-bold ml-2'>{project.starts || 'TBA'}</div>
          </div>

          {project.status === projectStatuses.active && (
            <div className='py-2' style={{ borderTop: '1px solid #3C3C3E' }}>
              <TotalRaiseProgress className='my-2' variant='determinate' value={soldPercent}></TotalRaiseProgress>
              <div className='text-right'>
                {(((project.amount - project.remainAmount) / project.amount) * 100).toFixed(1)}%
              </div>
            </div>
          )}

          {project.status !== projectStatuses.completed && (
            <Button className={classes.btnLearnMore} disabled={!project.enable}>
              Learn more
            </Button>
          )}
        </div>
      </div>
    );
  };

  return !!project.url ? (
    <Link to={project.url} className={classes.link}>
      {renderContent()}
    </Link>
  ) : (
    renderContent()
  );
};
