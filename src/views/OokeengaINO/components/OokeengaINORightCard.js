import {
  Button,
  Dialog,
  LinearProgress,
  IconButton,
  linearProgressClasses,
  Typography,
  Select,
  MenuItem,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { erc20Contract, web3 } from 'contracts/contract';
import { usePopup, useCountdown } from 'hooks';
import { DateTime } from 'luxon';
import React, { useCallback, useEffect, useMemo } from 'react';
import NumberFormat from 'react-number-format';
import { useMutation, useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import { formatNumber } from 'utils/common';
import { PopupCart, PopupDone } from 'views/Checkout';
import { ReactComponent as WarningImg } from 'assets/icons/warning.svg';
import { Add, Remove } from '@mui/icons-material';
import { formatTwoDigits } from 'utils/common';
import { useDebounce } from 'use-debounce';
import { useServicesContext } from 'services/ServicesContext';
import { isNil, pathOr } from 'ramda';
import { projectData } from '../Data';
import { DesignButton } from 'components';
import { ReactComponent as KeyboardArrowDownIcon } from '../../../assets/projects/dinoX/KeyboardArrowDownIcon.svg';
import { connectWallet } from 'reducers/profileAction';
import { createUseStyles } from 'react-jss';
import clsx from 'clsx';

export const TotalRaiseProgress = styled(LinearProgress)(({ theme }) => ({
  height: 8,
  borderRadius: 18,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    background: '#463024',
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 18,
    background: '#DA8B14',
  },
}));

const styles = (theme) => ({
  icon: {
    fill: '#ffffff',
  },
});

export const ButtonCurrency = styled(Button)(({ theme }) => ({
  background: '#281B11',
  '&:hover': {
    background: '#281B11',
  },
  height: '36px',
  width: '75px',
  boxSizing: 'border-box',
  borderRadius: '8px',
  color: '#8F7A6E',
  fontSize: '14px',
  border: '1px solid #8F7A6E',
  '&.active': {
    borderColor: '#F5E6D5',
    color: '#F5E6D5',
    background: '#463024',
  },
}));

function OokeengaINORightCard({ time }) {
  const { isLoggedIn, address } = useSelector(({ profile }) => profile);
  const [currency, setCurrency] = React.useState('OKG');
  const { projectConfig, marketService, storageService } = useServicesContext();

  //get Quota of user level
  const { data: quota = {}, refetch: refetchQuota } = useQuery(
    [`${projectConfig.alias}_marketService.getQuota`],
    () => marketService.getQuota(),
    {
      refetchOnMount: 'always',
      enabled: isLoggedIn,
      refetchInterval: 60 * 1000,
      staleTime: 0,
    },
  );

  const vipLevel = quota.name;

  const isAdmin = useMemo(() => vipLevel === 'VIP 0', [vipLevel]);

  //get user allocation can buy
  const { data: amount = {}, refetch: refetchAmount } = useQuery(
    [`${projectConfig.alias}_marketService.getMaxAmount`],
    () => marketService.getMaxAmount(),
    {
      refetchOnMount: 'always',
      enabled: isLoggedIn,
      refetchInterval: 60 * 1000,
      staleTime: 0,
    },
  );

  // start: time countdown
  const isStarted = useMemo(() => new Date(time.open_time).getTime() <= Date.now(), [time.open_time]);
  const isFinished = useMemo(() => new Date(time.close_time).getTime() <= Date.now(), [time.close_time]);
  const currentRound = useMemo(() => {
    if (!isStarted) return -1;
    else if (!isFinished) {
      return 1;
    }
    return 0;
  }, [isStarted, isFinished]);
  const times = useMemo(() => {
    switch (currentRound) {
      case -1: // not started
        return [new Date().toISOString(), time.open_time];
      case 0: // finished
        return [];
      default:
        // finished
        return [];
      case 1: // step 1
        return [time.open_time, time.close_time];
    }
  }, [time, currentRound]);
  const countdownLabel = useMemo(() => {
    switch (currentRound) {
      case -1: // not started
        return 'Sale starts in';
      case 0: // finished
        return 'SALE HAS ENDED';
      default:
        // finished
        return 'SALE HAS ENDED';
      case 1: // step 1
        return 'Sale ends in';
    }
  }, [currentRound]);
  const countdownData = useCountdown(times[0], times[1]);
  // end: time countdown

  //get list Product
  const { data = [], refetch: refetchProduct } = useQuery(
    [`${projectConfig.alias}_marketService.fetchProducts`],
    () => marketService.fetchProducts(),
    {
      refetchOnMount: 'always',
    },
  );

  const products = React.useMemo(() => {
    return data
      .sort((a, b) => a.product_id - b.product_id)
      .map((item) => {
        return {
          product_id: item?.product_id,
          prices: item?.product?.price,
          name: item?.product.name,
          remain_amount: item?.remain_quantity,
          amount: item?.product.amount,
        };
      });
  }, [data]);

  const remainSPOItems = useMemo(() => pathOr(0, [1, 'remain_amount'], products), [products]);
  const remainUSDTItems = useMemo(() => pathOr(0, [0, 'remain_amount'], products), [products]);
  const totalRemainItems = useMemo(() => remainSPOItems + remainUSDTItems, [remainSPOItems, remainUSDTItems]);
  const totalItems = useMemo(() => pathOr(0, [0, 'amount'], products) + pathOr(0, [1, 'amount'], products), [products]);
  const [item, setItem] = React.useState('Champion League Ticket');
  const selectedProduct = useMemo(
    () => products.find((selectedItem) => selectedItem.prices.some((token) => token.payment_token.name === currency)),
    [currency, products],
  );
  const productName = item;

  //get product selected
  const product = React.useMemo(() => {
    let arr = products;
    return { ...arr[0] };
  }, [products]);
  //fetch new user level and product
  const onRefresh = () => {
    refetchQuota();
    refetchProduct();
    refetchAmount();
  };
  //amount quantity of item
  const [amounts, setAmounts] = React.useState(1);
  const price = selectedProduct?.prices[0]?.price;
  const totalPrice = amounts * price;
  //dialog
  const [isOpenCart, onOpenCart, onCloseCart] = usePopup(() => {
    let { createdAt, isContinue = false } = storageService.getOrder();
    if (createdAt) {
      const endTime = DateTime.fromISO(createdAt).plus({ minutes: 15 });
      isContinue = endTime > DateTime.now();
    }
    if (!isContinue) storageService.clearOrder();
  });
  const [isOpenDone, onOpenDone, onCloseDone] = usePopup();
  //checkout
  const currentPrice = selectedProduct?.prices.find((item) => item.payment_token.name === currency);
  const { mutate: checkout } = useMutation(marketService.checkout, {
    onSuccess: (data, body) => {
      const { order } = data;
      storageService.saveOrder({
        orderId: order.id,
        createdAt: order.CreatedAt,
        ...body,
        discount: 0,
        totalDiscount: 0,
        currentPrice,
        totalPrice: totalPrice,
        productName: productName,
      });

      setTimeout(() => {
        onOpenCart();
        onRefresh();
      }, 0);
    },
  });
  const [isEnoughBalance, setIsEnoughBalance] = React.useState(true);

  const [debouncedAmounts] = useDebounce(amounts, 500);
  const checkBalance = useCallback(async () => {
    const { payment_token } = currentPrice;
    const balance = payment_token?.address
      ? await erc20Contract(payment_token?.address).methods.balanceOf(address).call()
      : await web3.eth.getBalance(address);
    const isEnough = Number(balance) >= totalPrice * 10 ** (payment_token.decimal || 18);
    return isEnough;
  }, [address, currentPrice, totalPrice]);

  const updateUiStateAfterCheckBalance = () => {
    setIsEnoughBalance(false);
    setTimeout(() => {
      setIsEnoughBalance(true);
    }, 5000);
  };

  useEffect(() => {
    if (!debouncedAmounts) return;
    checkBalance().then((isEnough) => {
      if (!isEnough && !isAdmin) {
        updateUiStateAfterCheckBalance();
      }
    });
  }, [debouncedAmounts, checkBalance, isAdmin]);
  const handleClickCheckout = async () => {
    const isEnough = await checkBalance();
    if (!isEnough && !isAdmin) {
      updateUiStateAfterCheckBalance();
      return;
    }
    checkout({
      products: [
        {
          product_id: selectedProduct.product_id,
          amount: amounts,
          name: currency,
        },
      ],
      currency: currency,
    });
  };
  const onBlur = useCallback(() => {
    if (!amounts) setAmounts(0);
  }, [amounts, setAmounts]);

  const isSoldOut = useMemo(() => totalRemainItems <= 0 || isFinished, [totalRemainItems, isFinished]);
  const correctAmounts = useMemo(() => {
    if (!isNil(amounts)) return true;
    if (isAdmin) return true;
    if (currentRound === 3 && amounts <= totalRemainItems) return true;
    return false;
  }, [amounts, currentRound, isAdmin, totalRemainItems]);

  const cantBuy = useMemo(() => {
    const canBuy = isEnoughBalance && correctAmounts;
    return !canBuy;
  }, [isEnoughBalance, correctAmounts]);

  const servicesContext = useServicesContext();
  const onConnectWallet = useCallback(() => connectWallet(servicesContext), [servicesContext]);
  return (
    <div>
      <div className='p-3 sm:p-7 rounded-lg' style={{ backgroundColor: 'rgba(23, 10, 2, 0.8)', color: '#F5E6D5' }}>
        <div className='flex space-x-4 mb-4 justify-center xl:justify-start'>
          <img src={projectData.logo} className='h-12 w-12 rounded-lg border-2 border-white' />
          <div className='flex flex-col justify-center content-start items-start'>
            <div className='font-skadi font-bold text-md md:text-lg xl:text-lg 2xl:text-2xl'>
              Champion League Ticket
            </div>
          </div>
        </div>

        <div className='mt-6'>
          <div>
            {!isFinished ? (
              isStarted ? (
                <div className='flex text-base justify-between mt-8'>
                  <div className='text-[#F5E6D5]'>{countdownLabel}</div>

                  <div className='text-base text-[#F5E6D5] font-bold'>
                    {formatTwoDigits(countdownData.countdown.days)}d {formatTwoDigits(countdownData.countdown.hours)}h{' '}
                    {formatTwoDigits(countdownData.countdown.minutes)}m{' '}
                    {formatTwoDigits(Math.floor(countdownData.countdown.seconds))}s
                  </div>
                </div>
              ) : (
                <div className='flex flex-col justify-between mt-4 items-center'>
                  <span className='text-xl font-bold mb-4 text-[#F5E6D5]'>{countdownLabel}</span>

                  <span className='text-[#F5E6D5] font-bold text-xl'>
                    {formatTwoDigits(countdownData.countdown.days)}d {formatTwoDigits(countdownData.countdown.hours)}h{' '}
                    {formatTwoDigits(countdownData.countdown.minutes)}m{' '}
                    {formatTwoDigits(Math.floor(countdownData.countdown.seconds))}s
                  </span>
                </div>
              )
            ) : (
              <div className='flex text-base justify-center'>
                {totalRemainItems !== 0 ? <div className='font-bold text-[#DA8B14] mt-8'>{countdownLabel}</div> : <></>}
              </div>
            )}
          </div>
          {!isLoggedIn && (
            <DesignButton
              design='yellow'
              size='large'
              className='h-14 text-base font-semibold mt-4 w-full'
              onClick={onConnectWallet}
            >
              Connect wallet
            </DesignButton>
          )}
        </div>

        <Dialog open={isOpenCart} maxWidth='md'>
          <PopupCart onClose={onCloseCart} onSuccess={onOpenDone} onRefresh={onRefresh} />
        </Dialog>
        <Dialog open={isOpenDone} onClose={onCloseDone} maxWidth='md'>
          <PopupDone onDone={onCloseDone} />
        </Dialog>
      </div>
      {isStarted && isLoggedIn && !isFinished && !isSoldOut ? (
        <div className='p-3 sm:p-7 mt-4 rounded-lg' style={{ backgroundColor: 'rgba(23, 10, 2, 0.8)', color: '#F5E6D5' }}>
          <div className='flex flex-col w-full'>
            <div className='flex w-full gap-4 bg-[#463024] rounded-lg p-3'>
              <img className='' src={require('assets/projects/item.png')} />
              <div className='flex flex-col justify-between'>
                <span className='text-[#F5E6D5] font-bold text-md md:text-lg'>Champion League Ticket</span>
                <div className='flex gap-2 items-center'>
                  <span className='text-[#F5E6D5] text-base'>360 OKG</span>
                </div>
              </div>
            </div>

            <div className='flex justify-between items-center text-white mt-6 mb-6'>
              <span className='' style={{ color: '#F5E6D5' }}>Quantity</span>
              <div className='flex items-center rounded p-1' style={{ backgroundColor: '#463024' }}>
                <IconButton size='small' className='mx-1' onClick={() => setAmounts(Math.max(0, amounts - 1))}>
                  <Remove className='text-[#F5E6D5] ' />
                </IconButton>
                <div
                  className='rounded font-medium p-1 border'
                  style={{ borderColor: '#636366', background: 'rgba(23, 10, 2, 0.8)' }}
                >
                  <NumberFormat
                    value={amounts}
                    onValueChange={({ floatValue: value }) => setAmounts(value)}
                    onBlur={onBlur}
                    maxLength={3}
                    allowNegative={false}
                    className='w-11 text-center bg-transparent'
                  />
                </div>
                <IconButton
                  size='small'
                  className='mx-1'
                  onClick={() => setAmounts(Math.min(product.remain_amount, amounts + 1))}
                >
                  <Add className='text-[#F5E6D5]' />
                </IconButton>
              </div>
            </div>

            <div className='flex flex-row justify-between mb-6 bg-[#463024] px-3 py-5 rounded-lg'>
              <span className='text-[#F5E6D5]'>Total</span>
              <span className='font-bold text-[#DA8B14] text-xl'>
                {`${amounts ? formatNumber(Math.round(totalPrice)) : 0} ${currency}`}
              </span>
            </div>

            {!isEnoughBalance ? (
              <div className='flex justify-center mb-4'>
                <WarningImg className='mr-1' />
                <span className='text-error'>Insufficient balance</span>
              </div>
            ) : !correctAmounts ? (
              <div className='flex justify-center mb-4'>
                <WarningImg className='mr-1' />
                <span className='text-error'>Incorrect amount</span>
              </div>
            ) : null}
            <DesignButton
              design='orange'
              size='large'
              disabled={!amounts}
              className='h-14 text-base font-semibold'
              onClick={handleClickCheckout}
            >
              CHECK OUT
            </DesignButton>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default OokeengaINORightCard;
