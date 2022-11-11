import { isEmpty, toLower } from 'ramda';
import React, { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { getProjectConfigByAlias, getLegacyProjectConfig } from 'data';
import { ServicesContext } from './ServicesContext';

import { getAccountService } from 'services/account';
import { getMarketService } from 'services/market';
import { getStorageService } from 'services/storage';
import { getSystemService } from 'services/system';

export const ServicesContextProvider = ({ children }) => {
  const location = useLocation();

  const contextState = useMemo(() => {
    const alias = toLower(location.pathname.replace(/^\//, '').split('/')[0]);

    let projectConfig;
    if (isEmpty(alias)) {
      projectConfig = getLegacyProjectConfig();
    } else {
      projectConfig = getProjectConfigByAlias(alias) || getLegacyProjectConfig();
    }
    return {
      projectConfig,
      accountService: getAccountService(projectConfig),
      marketService: getMarketService(projectConfig),
      storageService: getStorageService(projectConfig),
      systemService: getSystemService(projectConfig),
    };
  }, [location]);

  return <ServicesContext.Provider value={contextState}>{children}</ServicesContext.Provider>;
};
