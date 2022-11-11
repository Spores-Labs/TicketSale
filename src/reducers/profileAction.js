import { store } from 'reducers';
import { accountService as defaultAccountService } from 'services/account';
import { marketService as defaultMarketService } from 'services/market';
import { signInWithSuffix } from 'reducers/profileSlice';
import { openAlert } from 'reducers/alertSlice';
import Web3 from 'web3';
import { isEmpty, pathOr } from 'ramda';

export const connectWallet = async (servicesContext, callback) => {
  let marketService, accountService;
  if (!!servicesContext) {
    marketService = servicesContext.marketService || defaultMarketService;
    accountService = servicesContext.accountService || defaultAccountService;
  }

  if (window.ethereum) {
    window.web3 = new Web3(window.ethereum);
  } else if (window.web3) {
    window.web3 = new Web3(window.web3.currentProvider);
  } else {
    return store.dispatch(openAlert({ message: 'Please install MetaMask', variant: 'warning' }));
  }

  const [user] = await window.ethereum.request({ method: 'eth_requestAccounts' });

  const { isLoggedIn } = store.getState().profile;
  if (isLoggedIn) {
    if (typeof callback === 'function') callback();
  } else {
    try {
      const nonce = await accountService.connect({ public_address: user });
      const message = `login one-time code: ${nonce}`;
      const rawSig = await window.web3.eth.personal.sign(message, user);
      const splitAt = rawSig.length - 2;
      let v = rawSig.slice(-2);
      if (v === '00') {
        v = '1b';
      } else if (v === '01') {
        v = '1c';
      }
      const signature = rawSig.substring(0, splitAt) + v;

      let projectSuffix = pathOr('', ['projectConfig', 'alias'], servicesContext);
      if (!isEmpty(projectSuffix)) {
        projectSuffix = `_${projectSuffix}`;
      }

      const { ...token } = await accountService.login({ public_address: user, signature });
      store.dispatch(
        signInWithSuffix({
          suffix: projectSuffix,
          data: { address: user, ...token },
        }),
      );
      const { name, product_can_buy, discount, min_discount_quantity } = await marketService.getQuota();
      store.dispatch(
        signInWithSuffix({
          suffix: projectSuffix,
          data: { tier: name, isVip: !!name, products: product_can_buy, discount, min_discount_quantity },
        }),
      );

      if (typeof callback === 'function') callback();
    } catch {}
  }
};
