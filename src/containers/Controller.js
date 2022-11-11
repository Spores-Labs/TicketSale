import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useAlert } from 'hooks';
import { signInWithSuffix } from 'reducers/profileSlice';
import jwtDecode from 'jwt-decode';
import { useServicesContext } from 'services/ServicesContext';
import { propOr, isEmpty } from 'ramda';

const Controller = ({ children }) => {
  useAlert();

  const { projectConfig, marketService } = useServicesContext();

  const dispatch = useDispatch();
  const [isReady, setIsReady] = React.useState(false);

  useEffect(() => {
    try {
      let projectSuffix = propOr('', 'alias', projectConfig);
      if (!isEmpty(projectSuffix)) {
        projectSuffix = `_${projectSuffix}`;
      }

      const profile = JSON.parse(localStorage.getItem(`profile${projectSuffix}`));
      if (profile) {
        jwtDecode(profile.access_token);
        dispatch(signInWithSuffix({ suffix: projectSuffix, data: profile }));

        marketService.getQuota().then(({ name, product_can_buy }) => {
          dispatch(
            signInWithSuffix({ suffix: projectSuffix, data: { tier: name, isVip: !!name, products: product_can_buy } }),
          );
        });
      }
    } catch (error) {
      console.error('error', error);
    } finally {
      setIsReady(true);
    }
  }, [dispatch, projectConfig, marketService]);

  return isReady && children;
};

export default Controller;
