import { compose } from 'ramda';
import { getProjectConfigByAlias, projectAlias } from 'data';
import { getClient } from './axios';

const accountServices = {};

export const createAccountService = (projectConfig) => {
  const { client } = getClient(projectConfig);

  const connect = (params) => client.get(`/login/wallet`, { params });
  const login = (body) => client.post(`/login`, body);

  accountServices[projectConfig.alias] = {
    connect,
    login,
  };
  return accountServices[projectConfig.alias]
};

export const getAccountService = (projectConfig) => {
  const { alias } = projectConfig;
  return accountServices[alias] || createAccountService(projectConfig);
};
  
export const accountService = compose(
  getAccountService,
  getProjectConfigByAlias
)(projectAlias.legacyProjects)