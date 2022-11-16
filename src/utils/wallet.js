import Web3 from 'web3';
import Web3Modal from 'web3modal';
import WalletConnectProvider from '@walletconnect/web3-provider';

import { web3 } from 'contracts/contract';
import { store } from 'reducers';
import { signOut } from 'reducers/profileSlice';

export const connectProvider = async () => {
  const providerOptions = {
    walletconnect: {
      package: WalletConnectProvider,
      options: {
        rpc: {
          97: 'https://data-seed-prebsc-1-s1.binance.org:8545',
          1: 'https://mainnet.infura.io/v3/',
          56: 'https://bsc-dataseed.binance.org',
          4: 'https://rinkeby.infura.io',
        },
      },
    },
  };
  const web3Modal = new Web3Modal({
    providerOptions,
    theme: 'dark',
    cacheProvider: false,
  });

  const provider = Web3.givenProvider || (await web3Modal.connect());
  provider.on('accountsChanged', () => store.dispatch(signOut()));
  provider.on('disconnect', () => store.dispatch(signOut()));

  web3.setProvider(provider);
};

export const connectAddress = async () => {
  try {
    await connectProvider();
    let address;
    try {
      [address] = await web3.eth.requestAccounts();
    } catch {
      [address] = await web3.eth.getAccounts();
    }
    return address.toLowerCase();
  } catch (error) {
    console.log(error);
  }
};
