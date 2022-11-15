import { store } from 'reducers';
import { accountService as defaultAccountService } from 'services/account';
import { marketService as defaultMarketService } from 'services/market';
import { signInWithSuffix } from 'reducers/profileSlice';
import { connectAddress } from 'utils/wallet';
import { web3 } from 'contracts/contract';
import { isEmpty, pathOr } from 'ramda';

export const connectWallet = async (servicesContext, callback) => {
  let marketService, accountService;
  if (!!servicesContext) {
    marketService = servicesContext.marketService || defaultMarketService;
    accountService = servicesContext.accountService || defaultAccountService;
  }

  const addr = await connectAddress();

  const { isLoggedIn } = store.getState().profile;
  if (isLoggedIn) {
    if (typeof callback === 'function') callback();
  } else {
    try {
      const nonce = await accountService.connect({ public_address: addr });
      const message = `login one-time code: ${nonce}`;
      const rawSig = await web3.eth.personal.sign(message, addr); 
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

      const { ...token } = await accountService.login({ public_address: addr, signature });
      store.dispatch(
        signInWithSuffix({
          suffix: projectSuffix,
          data: { address: addr, ...token },
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
