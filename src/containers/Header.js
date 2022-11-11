import { useCallback } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  ConnectButton,
  NetworkBar,
  // SubscribeEmail,
} from 'components';
import { usePopover } from 'hooks';
import { AppBar, Link as MuiLink, ListItemButton, Popover, Toolbar } from '@mui/material';
import { connectWallet } from 'reducers/profileAction';
import { signOut } from 'reducers/profileSlice';
import { shorten } from 'utils/common';
import { privateRoute } from 'routes';
import { useServicesContext } from 'services/ServicesContext';
import { styled } from '@mui/system';

const StyledPopover = styled(Popover)(({ theme }) => ({
  opacity: 1,
  '& .MuiPaper-elevation': {
    width: '180px',
    fontFamily: 'Avenir !important',
    color: '#F5E6D5 !important',
    borderRadius: '10px !important',
    border: '1px solid #FFFFFF !important',
    backgroundColor: '#544940 !important',
    padding: '8px 0px 8px 0px !important',
  },
}));

const isNetwork = true;

const Header = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { isLoggedIn, address } = useSelector(({ profile }) => profile);
  const servicesContext = useServicesContext();
  const [isOpen, anchor, onClick, onClose] = usePopover();

  const onConnectWallet = useCallback(() => connectWallet(servicesContext), [servicesContext]);

  const onOrderHistoryClicked = () => {
    history.push('/tickets/order-history');
  };
  return (
    <div className='relative'>
      <AppBar className='px-4' position='sticky' elevation={0} style={{ backgroundColor: 'rgba(60, 44, 25, 0.8)' }}>
        <Toolbar>
          <Link to={privateRoute.home.path}>
            <img src={require('assets/icons/Logo_Long version.png')} className='h-10 sm:h-10 lg:ml-40' />
          </Link>
          <MuiLink
            href='https://ookeenga.io/'
            className='sm:inline hidden hover:text-white ml-8 font-bold text-md'
            style={{ color: '#B7A284' }}
          >
            Home
          </MuiLink>
          <MuiLink
            href='https://ookeenga.io/'
            className='sm:inline hidden hover:text-white ml-8 font-bold text-md'
            style={{ color: '#B7A284' }}
          >
            Marketplace
          </MuiLink>
          <div className='mx-6'>{isNetwork && <NetworkBar hidden />}</div>

          <div className='flex-1 flex items-center justify-end'>
            <MuiLink href='https://testnet.ookeenga.io/' className='text-gray-200 hover:text-white mr-3'>
              <img src={require('assets/projects/ookeenga-INO/Play Button.png')} />
            </MuiLink>
            <div className='flex items-center'>
              {!isLoggedIn ? (
                <ConnectButton onClick={onConnectWallet}>Connect wallet</ConnectButton>
              ) : (
                <div>
                  <ConnectButton onClick={onClick} style={{ width: '180px' }}>
                    {shorten(address)} <img className='ml-4' src={require('assets/icons/wallet.png')} />
                  </ConnectButton>
                  <StyledPopover open={isOpen} anchorEl={anchor} onClose={onClose}>
                    <ListItemButton className='text-sm' onClick={onOrderHistoryClicked}>
                      Order history
                    </ListItemButton>
                    <ListItemButton
                      className='text-sm'
                      onClick={() => {
                        onClose();
                        navigator.clipboard.writeText(address);
                      }}
                    >
                      Copy Address
                    </ListItemButton>
                    <ListItemButton
                      className='text-sm'
                      onClick={() => {
                        onClose();
                        dispatch(signOut());
                      }}
                    >
                      Disconnect
                    </ListItemButton>
                  </StyledPopover>
                </div>
              )}
            </div>
          </div>
        </Toolbar>
      </AppBar>
      {/* <SubscribeEmail /> */}
    </div>
  );
};

export default Header;
