import { getProjectConfigByAlias, projectAlias } from 'data';
import { compose } from 'ramda';
import { getClient } from './axios';

const marketServices = {};

export const createMarketService = (projectConfig) => {
  const { client } = getClient(projectConfig);

  const getQuota = () => client.get('/userlevel');
  const fetchProducts = (params) => client.get('/products', { params });
  const fetchOrders = (params) => client.get('/order/history', { params });
  const fetchCampaignsTime = () => client.get('/campaigntime');
  const checkout = (body) => client.post(`/order`, body);
  const submitOrder = ({ order_id, ...body }) => client.post(`/order/${order_id}/submit`, body);
  const cancelOrder = ({ order_id }) => client.delete(`/order/${order_id}`);
  const getMaxAmount = () => client.get('/max-amount');
  const fetchAccountInfo = () => client.get('/tickets-accounts');

  marketServices[projectConfig.alias] = {
    getQuota,
    fetchProducts,
    fetchOrders,
    fetchCampaignsTime,
    checkout,
    submitOrder,
    cancelOrder,
    getMaxAmount,
    fetchAccountInfo,
  };

  return marketServices[projectConfig.alias];
};

export const getMarketService = (projectConfig) => {
  const { alias } = projectConfig;
  return marketServices[alias] || createMarketService(projectConfig);
};

export const marketService = compose(
  getMarketService,
  getProjectConfigByAlias
)(projectAlias.legacyProjects)
