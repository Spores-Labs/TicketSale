import { compose, propOr } from "ramda";
import { getProjectConfigByAlias, projectAlias } from "data";

const storageServices = {}

export const createStorageService = (projectConfig) => {
  if (!projectConfig) return {};
  const prefix = projectConfig.alias !== projectAlias.legacyProjects ?  projectConfig.alias+'_': '';

  const getOrder = () => JSON.parse(localStorage.getItem(`${prefix}order`)) ?? {};
  const saveOrder = (order) => localStorage.setItem(`${prefix}order`, JSON.stringify(order));
  const clearOrder = () => localStorage.removeItem(`${prefix}order`);

  storageServices[projectConfig.alias] = {
    getOrder,
    saveOrder,
    clearOrder,
  };

  return storageServices[projectConfig.alias] 
};

export const getStorageService = (projectConfig) => {
  const alias = propOr('', 'alias', projectConfig);
  return storageServices[alias] || createStorageService(projectConfig);
};
  
export const storageService = compose(
  getStorageService,
  getProjectConfigByAlias
)(projectAlias.legacyProjects)