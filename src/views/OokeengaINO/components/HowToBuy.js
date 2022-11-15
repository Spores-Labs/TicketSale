import { Link as MuiLink } from '@mui/material';
import React from 'react';

const HowToBuy = () => {
  return (
    <div style={{ color: '#F5E6D5', fontSize: '18px' }}>
      <div className='font-bold text-4xl mb-6'>I. How to buy INO</div>
      <div className='font-bold mb-4'>1. Logging in</div>
      <ul className='list-disc list-inside'>
        <li className='mb-4'>
          Please use your MetaMask wallet (on BNB Chain) to log in and purchase on Ookeenga Platform. If your MetaMask
          wallet has not been connected to BNB Chain, please follow the instructions <span> </span>
          <MuiLink
            className='hover:underline'
            style={{ color: '#DA8B14' }}
            href='https://metamask.zendesk.com/hc/en-us/articles/360043227612-How-to-add-a-custom-network-RPC'
          >
            HERE.
          </MuiLink>
        </li>
        <li className='mb-4'>
          <span className='font-bold' style={{ color: '#DA8B14' }}>
            DO NOT{' '}
          </span>
          use your cold wallet or multi-signature wallet as you may encounter some unaware troubles.
        </li>
        <li className='mb-4'>
          Please ensure that you have sufficient balance in your wallet before taking part in the sales so you will not
          miss any desired item.
        </li>
      </ul>
      <div className='font-bold mb-4'>2. Buying</div>
      <div className='mb-4'>
        Upon logging in, you will see the countdown to open sale on the left hand side of the screen.
      </div>
      <div className='flex py-4 mb-4'>
        <div>
          <img className='mr-8 mb-4 float-left object-none' src={require('assets/projects/ookeenga-INO/howto2.png')} />

          <p className='mb-6'>
            To start buying, first you need to select the desired items, then sellect the currency (USDT or BUSD). Next,
            input the amount you want to purchase.{' '}
          </p>
          <p className='mb-4'>
            Upon clicking ‘CHECK OUT’, your MetaMask wallet shall automatically open and you will have 10 minutes to
            proceed with your payment to the provided wallet address and submit the order.
          </p>
        </div>
      </div>
      <div className='mb-4'>
        Please make sure that your payment is correct and successfully transferred, your Transaction ID in the pop-up is
        automatically filled, then click ‘SUBMIT’.
      </div>
      <div className='mb-6'>
        Upon confirming your transaction on MetaMask, the system will automatically fill your Transaction ID into the
        Checkout pop-up. Please be patient since the process may take a few minutes to complete.
      </div>
      <div className='flex mb-8 justify-center'>
        <img className='' src={require('assets/projects/ookeenga-INO/howto3.png')} />
      </div>
      <div className='mb-5'>
        Your order will be recorded and delivered to our Operations Team to confirm. Should there be any complications
        during the process, just drop us a note at:
        <span className='font-bold' style={{ color: '#DA8B14' }}>
          {' '}
          support@ookeenga.io{' '}
        </span>
      </div>
      <div className='font-bold mb-4'>3. View Order History</div>
      <div className='mb-4'>
        The Order History page lists all your orders and their status. Click on ‘Order History’ on the header menu to go
        to the page. If there is any incorrect information, please contact Customer Support to verify.
      </div>
      <div className='flex justify-center'>
        <img className='mb-8' src={require('assets/projects/ookeenga-INO/howto4.png')} />
      </div>

      <div className='font-bold text-4xl mb-6'>II. FAQs</div>
      <div className='font-bold mb-4'>1. Payment issues</div>
      <div className='mb-4'>
        1.1. What to do when I underpay the order?<br></br> When you accidentally underpay your order, you can make
        another transaction for the unpaid amount and inform us via support@okglabs.io to secure your items. In case you
        do not take any further action, the order will get rejected and we will refund you in compliance with the refund
        policy.
      </div>
      <div className='mb-4'>
        1.2. What to do when I overpay the order?<br></br> If you overpay for your order, we’ll still accept the order
        and the excessive amount will be transferred back to your wallet in compliance with the refund policy.
      </div>
      <div className='mb-4'>
        1.3. What to do when I pay for the order in the wrong crypto currencies?<br></br>
        For each sale campaign, we’ll accept the payment in one or some specific crypto currencies. If you transfer to
        us in the wrong crypto currency, your order will be rejected and we’ll refund you in compliance with our policy.
        In order to get your favorite items, please make another order and pay for it in the right currency.
      </div>
      <div className='font-bold mb-4'>2. Order confirmation & post-sale information</div>
      <div className='mb-4'>
        2.1. How to check if my order has been confirmed or not? <br></br>
        You can visit the Order History page directly on Ookeenga Platform to check your order status after 30 minutes
        to 1 hour. If every order detail is correct, your order will be confirmed and shown as APPROVED. If there is any
        incorrect information, it will be rejected and displayed accordingly on the Order History page. Ookeenga Team
        will also send you an order confirmation email after the sale ends.
      </div>
      <div className='mb-4'>
        2.2. Where can I get post-sale information?<br></br>
        Any post-sale information will be published on Spores and partners’ website, medium, twitter & social media.
        Please refer to them or contact us via support@okglabs.io.
      </div>
    </div>
  );
};

export default HowToBuy;
