import { compose } from 'ramda';
import { getProjectConfigByAlias, projectAlias } from 'data';
import { getClient } from './axios';

const systemServices = {};

export const createSystemService = (projectConfig) => {
  const { client } = getClient(projectConfig);

  const fetchCategories = () => client.get(`/v1/nft/categories`);
  const fetchSubCategories = () => client.get(`/v1/nft/sub-categories`);
  const fetchPaymentTokens = () => client.get(`/v1/nft/payment-tokens`);
  const fetchSystemConfig = () => client.get(`/v1/nft/systems`);

  systemServices[projectConfig.alias] = {
    fetchCategories,
    fetchSubCategories,
    fetchPaymentTokens,
    fetchSystemConfig,
  };

  return systemServices[projectConfig.alias] 
};

export const getSystemService = (projectConfig) => {
  const { alias } = projectConfig;
  return systemServices[alias] || createSystemService(projectConfig);
};

export const systemService = compose(
  getSystemService,
  getProjectConfigByAlias
)(projectAlias.legacyProjects)