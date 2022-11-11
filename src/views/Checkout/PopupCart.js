import { ContactPageSharp, CreateOutlined } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { DialogActions, FormControl, TextField, Typography } from '@mui/material';
import { CountdownFlip, DesignButton } from 'components';
import { erc20Contract, web3 } from 'contracts/contract';
import { usePopup } from 'hooks';
import { DateTime } from 'luxon';
import React, { useCallback } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { useSelector } from 'react-redux';
import { formatNumber } from 'utils/common';
import { isValidEmail, isValidTransID } from 'utils/validator';
import { PopupConfirm } from './PopupConfirm';
import { useServicesContext } from 'services/ServicesContext';
import { ADDRESS_RECEIVER } from 'env';

const PopupCart = ({ onClose, onSuccess, onRefresh }) => {
  const receiverAddr = ADDRESS_RECEIVER;
  const { projectConfig, marketService, storageService } = useServicesContext();
  const [isOpenConfirm, onOpenConfirm, onCloseConfirm] = usePopup();
  const { address, isVip } = useSelector(({ profile }) => profile);
  const { control, handleSubmit, setValue } = useForm();
  const [countdown] = React.useState(() => {
    const { createdAt } = storageService.getOrder();
    return DateTime.fromISO(createdAt).plus({ minutes: 10 }).diff(DateTime.now(), ['minutes', 'seconds']).toObject();
  });
  const [{ currentPrice, totalDiscount, totalPrice, productName, discount, alloPerX, ...order }] = React.useState(
    storageService.getOrder,
  );
  const currentSymbol = currentPrice.payment_token.symbol;

  const [isEmail, setIsEmail] = React.useState(null);
  const [isTransaction, setIsTransaction] = React.useState(null);

  const { mutate: submitOrder, isLoading } = useMutation(marketService.submitOrder, {
    onSuccess: () => {
      onClose();
      onSuccess();
      onRefresh();
      storageService.clearOrder();
    },
  });

  const handleClickCancel = () => {
    onOpenConfirm();
  };

  const onAnswer = useCallback(
    (answer) => {
      onCloseConfirm();
      if (answer) {
        onClose();
        storageService.clearOrder();
        marketService.cancelOrder({ order_id: order.orderId }).finally(onRefresh);
      }
    },
    [onClose, onRefresh],
  );

  const handleClickSubmit = () => {
    handleSubmit((values) => {
      submitOrder({
        order_id: order.orderId,
        transaction_hash: values.transactionHash,
        email: values.email,
        referral_code: values.referral_code,
      });
    })();
  };
  const transfer = React.useCallback(async () => {
    try {
      const payment_token = currentPrice?.payment_token;
      if (payment_token.address) {
        const price = (totalPrice.toFixed(2) * 10 ** payment_token.decimal).toLocaleString('fullwide', {
          useGrouping: false,
        });
        const tx = erc20Contract(payment_token.address).methods.transfer(receiverAddr, price);
        const transfer = await tx.send({ from: address });

        setValue('transactionHash', transfer.transactionHash);
      } else {
        const transfer = await web3.eth.sendTransaction({
          from: address,
          to: receiverAddr,
          value: web3.utils.toWei(String(totalPrice), 'ether'),
        });
        setValue('transactionHash', transfer.transactionHash);
      }
    } catch (error) {
      console.log(error);
    } finally {
    }
  }, [setValue, address, totalPrice, currentPrice]);

  React.useEffect(() => {
    transfer();
  }, [transfer]);

  return (
    <>
      <div
        className='box-border text-white p-10 overflow-x-hidden'
        style={{
          backgroundImage: `url(${require('assets/projects/ookeenga-INO/frame2.png')})`,
          backgroundSize: '100% 100%',
        }}
      >
        <div className='flex items-center justify-center text-lg' style={{ borderBottom: '1px solid #463024' }}>
          <p className='font-skadi font-bold' style={{ color: '#DA8B14', fontSize: '24px' }}>
            CHECKOUT
          </p>
        </div>
        <div
          className='flex flex-col items-center my-4'
          style={{
            color: '#F5E6D5',
          }}
        >
          <div className='mb-2'>YOUR ORDER WILL EXPIRE IN</div>
          <div className='mb-6'>
            <CountdownFlip name='cart' {...countdown} />
          </div>
        </div>
        <div className='text-center mb-6' style={{ color: '#F5E6D5', fontSize: '14px' }}>
          Please make sure that your payment is successfully transferred within the allowed time frame.
        </div>
        <div className='my-2' style={{ color: '#F5E6D5' }}>
          Order details
        </div>
        <div className='rounded-lg py-4 px-6 mb-4' style={{ backgroundColor: '#463024' }}>
          {order.products.map((item, index) => {
            return (
              <div key={index} className='flex items-center justify-between py-1.5'>
                <div className='flex justify-between w-80'>
                  <Typography variant='subtitle1' style={{ color: '#F5E6D5', fontSize: '18px' }}>
                    {productName}
                  </Typography>
                  <Typography variant='subtitle1'></Typography>
                </div>
                <span className='font-bold' style={{ color: '#DA8B14', fontSize: '20px' }}>
                  {formatNumber(totalPrice)} {currentSymbol}
                </span>
              </div>
            );
          })}
        </div>
        <Controller
          name='transactionHash'
          defaultValue=''
          control={control}
          rules={{
            validate: {
              pattern: (value) => {
                const isOkTransaction = isValidTransID(value);
                setIsTransaction(isOkTransaction);
                return isOkTransaction;
              },
            },
          }}
          render={({ field, fieldState: { invalid, error } }) => (
            <FormControl fullWidth className='mt-6' style={{ color: '#F5E6D5' }}>
              <label>
                Transaction ID <span className='text-red-500'>*</span>
                <span style={{ fontSize: '12px' }}>
                  {' '}
                  (Upon successful payment, the Transaction ID is automatically filled)
                </span>
              </label>
              <TextField
                style={{
                  background: '#463024',
                  border: '1px solid #B7A284',
                  boxSizing: 'border-box',
                  borderRadius: '4px',
                  color: '#F5E6D5',
                }}
                {...field}
                InputProps={{ endAdornment: <CreateOutlined style={{ color: '#B7A284' }} /> }}
                error={invalid}
                helperText={error?.message}
              />
            </FormControl>
          )}
        />
        {isTransaction === false ? (
          <span style={{ color: '#FF4841', fontSize: '14px' }}>Transaction is not valid</span>
        ) : (
          ''
        )}

        <div className='mt-2' style={{ color: '#FEC007', fontSize: '14px' }}>
          Please wait until the Transaction ID is filled
        </div>

        <Controller
          name='email'
          defaultValue=''
          control={control}
          rules={{
            validate: {
              pattern: (value) => {
                const isOkEmail = isValidEmail(value);
                setIsEmail(isOkEmail);
                return isOkEmail;
              },
            },
          }}
          render={({ field, fieldState: { invalid, error } }) => (
            <FormControl fullWidth className='mt-6' style={{ color: '#F5E6D5' }}>
              <label>
                Email <span className='text-red-500'>*</span>
              </label>
              <TextField
                style={{
                  background: '#463024',
                  border: '1px solid #B7A284',
                  boxSizing: 'border-box',
                  borderRadius: '4px',
                  color: '#F5E6D5',
                }}
                {...field}
                InputProps={{ endAdornment: <CreateOutlined style={{ color: '#B7A284' }} /> }}
                error={invalid}
                helperText={error?.message}
              />
            </FormControl>
          )}
        />
        {isEmail === false ? <span style={{ color: '#FF4841', fontSize: '14px' }}>Email is not valid</span> : ''}

        <Controller
          name='referral_code'
          defaultValue=''
          control={control}
          render={({ field, fieldState: { invalid, error } }) => (
            <FormControl fullWidth className='mt-6' style={{ color: '#F5E6D5' }}>
              <label>
              Referral Code
              </label>
              <TextField
                style={{
                  background: '#463024',
                  border: '1px solid #B7A284',
                  boxSizing: 'border-box',
                  borderRadius: '4px',
                  color: '#F5E6D5',
                }}
                {...field}
                InputProps={{ endAdornment: <CreateOutlined style={{ color: '#B7A284' }} /> }}
                error={invalid}
                helperText={error?.message}
              />
            </FormControl>
          )}
        />
        <DialogActions className='flex justify-end mt-6 w-full'>
          <DesignButton
            style={{ height: '80px', width: '160px' }}
            design='gray'
            size='large'
            disabled={isLoading}
            onClick={handleClickCancel}
          >
            CANCEL
          </DesignButton>
          <DesignButton
            style={{ height: '80px', width: '160px' }}
            design='orange'
            size='large'
            loading={isLoading}
            onClick={handleClickSubmit}
          >
            SUBMIT
          </DesignButton>
        </DialogActions>
      </div>
      {isOpenConfirm && (
        <PopupConfirm
          message='Are you sure you want to cancel the order?'
          open={isOpenConfirm}
          onClose={onCloseConfirm}
          onAnswer={onAnswer}
        />
      )}
    </>
  );
};

export default PopupCart;
