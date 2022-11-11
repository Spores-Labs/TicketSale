import React, { useMemo, useCallback, useState } from 'react';
import { projectStatuses } from 'data/project-statuses';
import { propEq, reject, filter, findIndex, isEmpty } from 'ramda';
import { ProjectStatusContext } from './ProjectStatusContext';
import { projectsData } from 'views/Home/Helpers';
import { getMarketService } from 'services/market';
import { getProjectConfigByAlias } from 'data';
import { useQuery } from 'react-query';

const statusEq = propEq('status');
const aliasEq = propEq('alias');
const checkCompleted = statusEq(projectStatuses.completed);
const filterUpcomingProjects = filter(statusEq(projectStatuses.upcoming));
const filterActiveProjects = filter(statusEq(projectStatuses.active));

const StatusCheck = ({ project, onChange }) => {
  const marketService = useMemo(() => getMarketService(getProjectConfigByAlias(project.alias)), [project.alias]);

  const { data: time = {} } = useQuery(
    [`${project.alias}_context_marketService.fetchCampaignsTime`],
    () => marketService.fetchCampaignsTime(),
    {
      refetchOnMount: 'always',
      refetchInterval: 60 * 1000,
      staleTime: 0,
      enabled: project.enable,
    },
  );

  const isStarted = useMemo(() => new Date(time.open_time).getTime() <= Date.now(), [time.open_time]);
  const isFinished = useMemo(() => new Date(time.close_time).getTime() <= Date.now(), [time.close_time]);
  const { data: product = [] } = useQuery(
    [`${project.alias}_context_marketService.fetchProducts`],
    () => marketService.fetchProducts(),
    {
      refetchOnMount: 'always',
      enabled: !!isStarted && project.enable,
    },
  );

  const isSoldOut = useMemo(() => product[0]?.remain_quantity === 0, [product[0]?.remain_quantity]);
  const remainAmount = product[0]?.remain_quantity
  const amount = product[0]?.product?.amount
  const onStatusChange = useCallback(
    (status) => {
      if (project.status === status || project.remainAmount === remainAmount || !onChange) return;
      onChange({ ...project, status, amount, remainAmount });
    },
    [project, amount, remainAmount],
  );

  React.useEffect(() => {
    if (isEmpty(time)) return;

    if (isStarted) {
      if (isSoldOut || isFinished) {
        onStatusChange(projectStatuses.completed);
      } else {
        onStatusChange(projectStatuses.active);
      }
    } else {
      onStatusChange(projectStatuses.upcoming);
    }
  }, [time, project, isSoldOut, isStarted, onStatusChange]);

  return <div className='hidden' />;
};

export const ProjectStatusContextProvider = ({ children }) => {
  const [inCompletedSalesData, setInCompletedSalesData] = useState(reject(checkCompleted, projectsData));
  const [completedSalesData, setCompletedSalesData] = useState(filter(checkCompleted, projectsData));
  const onChange = useCallback(
    (projectConfig) => {
      if (checkCompleted(projectConfig)) {
        setCompletedSalesData([projectConfig, ...completedSalesData]);
        setInCompletedSalesData(reject(aliasEq(projectConfig.alias), inCompletedSalesData));
      } else {
        const index = findIndex(aliasEq(projectConfig.alias), inCompletedSalesData);
        inCompletedSalesData[index] = projectConfig;
        setInCompletedSalesData([...inCompletedSalesData]);
      }
    },
    [completedSalesData, inCompletedSalesData],
  );

  const context = useMemo(() => {
    const upcomingProjectsData = filterUpcomingProjects(inCompletedSalesData);
    const activeProjectsData = filterActiveProjects(inCompletedSalesData);
    return {
      activeProjectsData,
      upcomingProjectsData,
      completedSalesData,
    };
  }, [inCompletedSalesData, completedSalesData]);

  return (
    <>
      {inCompletedSalesData.map((project, index) => (
        <StatusCheck key={index} project={project} onChange={onChange} />
      ))}
      <ProjectStatusContext.Provider value={context}>{children}</ProjectStatusContext.Provider>
    </>
  );
};
