import { compose } from 'ramda';
import axios from 'axios';
import { store } from 'reducers';
import { signOut } from 'reducers/profileSlice';
import { openAlert } from 'reducers/alertSlice';
import { stringify } from 'query-string';
import { getProjectConfigByAlias, projectAlias } from 'data';

const clients = {};

const createClient = ({ name, apiBaseUrl }) => {
  const onError = ({ response }) => {
    if (response) {
      const { status, statusText, data } = response;
      if (status === 401) {
        store.dispatch(signOut());
      } else {
        const { message = `${status} - ${statusText}` } = data;
        store.dispatch(openAlert({ message, variant: 'error', key: 'axios' }));
      }
    } else {
      store.dispatch(openAlert({ message: `Cannot connect to Server`, variant: 'error', key: 'axios' }));
    }
    return Promise.reject(response);
  };

  const beforeRequest = (config) => {
    const { isLoggedIn, access_token } = store.getState().profile;
    if (isLoggedIn) {
      Object.assign(config.headers, { Authorization: `Bearer ${access_token}` });
    }
    if (config.data instanceof FormData) {
      Object.assign(config.headers, { 'Content-Type': 'multipart/form-data' });
    }
    return config;
  };

  const client = axios.create({
    baseURL: apiBaseUrl,
    paramsSerializer: (params) => stringify(params, { arrayFormat: 'index' }),
  });
  client.interceptors.request.use(beforeRequest);

  [client].forEach((client) => {
    client.interceptors.response.use(({ data }) => {
      return data.data ?? data;
    }, onError);
  });

  const clientRaw = axios.create({
    baseURL: apiBaseUrl,
    paramsSerializer: (params) => stringify(params, { arrayFormat: 'index' }),
  });
  clientRaw.interceptors.request.use(beforeRequest);

  clients[name] = { client, clientRaw };
  return clients[name];
};

export const getClient = (projectConfig) => {
  const { name } = projectConfig;
  return clients[name] || createClient(projectConfig);
};

export const client = compose(
  getClient,
  getProjectConfigByAlias
)(projectAlias.legacyProjects)
