import React from 'react';
import { useDispatch } from 'react-redux';
import { Button, CircularProgress, Dialog, Typography } from '@mui/material';
import { BlockOutlined } from '@mui/icons-material';
import { openAlert } from 'reducers/alertSlice';
import { signOut } from 'reducers/profileSlice';
import { NETWORK_CHAIN_IDS } from 'env';

const ethAssets = {
  icon: <img src={require('assets/icons/coins/coin-ethereum.svg').default} />,
  backgroundIcon: <img src={require('assets/icons/coins/coin-ethereum.svg').default} height={24} />,
  backgroundImage: require('assets/icons/coins/coin-ethereum-frame.png'),
  color: '#FFFFFF',
};
const bscAssets = {
  icon: <img src={require('assets/icons/coins/coin-binance.svg').default} />,
  backgroundIcon: <img src={require('assets/icons/coins/coin-binance-black.svg').default} height={24} />,
  backgroundImage: require('assets/icons/coins/coin-binance-frame.png'),
  color: '#242424',
};

export const NETWORK_BARS = [
  {
    ...ethAssets,
    name: 'Ethereum Mainnet',
    chainId: '0x1',
    viewTrans: (txHash) => `https://etherscan.io/tx/${txHash}`,
    viewTokenID: (address, tokenID) => `https://etherscan.io/token/${address}?a=${tokenID}`,
  },
  {
    ...ethAssets,
    name: 'Ethereum Rinkeby',
    chainId: '0x4',
    viewTrans: (txHash) => `https://rinkeby.etherscan.io/tx/${txHash}`,
    viewTokenID: (address, tokenID) => `https://rinkeby.etherscan.io/token/${address}?a=${tokenID}`,
  },
  {
    ...bscAssets,
    name: 'BNB Chain',
    chainId: '0x38',
    rpcUrls: ['https://bsc-dataseed.binance.org/'],
    blockExplorerUrls: ['https://bscscan.com/'],
    nativeCurrency: { name: 'BNB', symbol: 'BNB', decimals: 18 },
    viewTrans: (txHash) => `https://bscscan.com/tx/${txHash}`,
    viewTokenID: (address, tokenID) => `https://bscscan.com/token/${address}?a=${tokenID}`,
  },
  {
    ...bscAssets,
    name: 'BNB Chain',
    chainId: '0x61',
    rpcUrls: ['https://data-seed-prebsc-1-s1.binance.org:8545/'],
    blockExplorerUrls: ['https://testnet.bscscan.com/'],
    nativeCurrency: { name: 'BNB', symbol: 'BNB', decimals: 18 },
    viewTrans: (txHash) => `https://testnet.bscscan.com/tx/${txHash}`,
    viewTokenID: (address, tokenID) => `https://testnet.bscscan.com/token/${address}?a=${tokenID}`,
  },
].filter((item) => NETWORK_CHAIN_IDS.split('_').includes(item.chainId));
const isMatchNetwork = (chainId) => NETWORK_BARS.some((item) => item.chainId === chainId);

const NetworkBar = ({ visible }) => {
  const dispatch = useDispatch();
  const [chainId, setChainId] = React.useState(window.ethereum?.chainId);

  const handleChangeChainId = async (item) => {
    if (!window.ethereum) {
      return dispatch(openAlert({ message: 'Please install MetaMask', variant: 'warning' }));
    }

    try {
      if (item.chainId !== window.ethereum.chainId)
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: item.chainId }],
        });
      else {
        setChainId(item.chainId);
      }
    } catch (error) {
      if (error.code === 4902) {
        await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [
            {
              chainId: item.chainId,
              chainName: item.name,
              rpcUrls: item.rpcUrls,
              blockExplorerUrls: item.blockExplorerUrls,
              nativeCurrency: item.nativeCurrency,
            },
          ],
        });
      }
    }
  };

  React.useEffect(() => {
    window.ethereum?.request({ method: 'eth_chainId' }).then(setChainId);
    window.ethereum?.on('chainChanged', setChainId);
    window.ethereum?.on('accountsChanged', () => dispatch(signOut()));
  }, [dispatch]);

  const networkChoose = NETWORK_BARS.find((item) => item.chainId === chainId) || {
    icon: <BlockOutlined color='error' style={{ width: 20 }} />,
    name: 'Wrong network',
  };

  return (
    <>
      {visible && (
        <Button variant='outlined' className='hidden lg:flex flex-nowrap text-white border-white'>
          {networkChoose.icon}
          <span className='mr-2.5' />
          {networkChoose.name}
        </Button>
      )}

      <Dialog open={Boolean(chainId) && !isMatchNetwork(chainId)} PaperProps={{ style: { width: 360 } }}>
        <div className='box-border flex flex-col items-center text-white'>
          <CircularProgress className='mb-3' />
          <Typography variant='h3' className='mb-1'>
            Wrong network
          </Typography>
          <Typography variant='h5' color='gray' className='mb-10'>
            Change network to
          </Typography>
          <div className='flex flex-col'>
            {NETWORK_BARS.map((item) => (
              <Button
                key={item.chainId}
                onClick={() => handleChangeChainId(item)}
                className='mb-3 py-3 px-6'
                style={{ backgroundImage: `url(${item.backgroundImage})`, color: item.color }}
                startIcon={item.backgroundIcon}
              >
                {item.name}
              </Button>
            ))}
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default NetworkBar;
