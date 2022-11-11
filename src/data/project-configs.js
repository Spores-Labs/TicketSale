import { find, equals, toLower, propOr, compose } from 'ramda';
import { projectAlias } from './project-alias';
import { API_URL } from 'env';

export const projectConfigs = [
  {
    alias: projectAlias.legacyProjects,
    apiBaseUrl: API_URL,
  },
];

export const getProjectConfigByAlias = (alias) => find(
  compose(
    equals(toLower(alias)),
    toLower,
    propOr('', 'alias'),
  ),
  projectConfigs
);

export const getLegacyProjectConfig = () => getProjectConfigByAlias(projectAlias.legacyProjects);
