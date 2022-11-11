import { Add, Remove } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import {
  DialogActions,
  Grid,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { DesignButton } from 'components';
import { erc20Contract, web3 } from 'contracts/contract';
import { useSnackbar } from 'notistack';
import React from 'react';
import NumberFormat from 'react-number-format';
import { useMutation } from 'react-query';
import { useSelector } from 'react-redux';
import { marketService } from 'services/market';
import { storageService } from 'services/storage';
import { formatNumber } from 'utils/common';

const PopupBuy = ({ products = [], index: currentIndex, onClose, onSuccess, onRefresh }) => {
  const { enqueueSnackbar } = useSnackbar();
  const { address, discount, min_discount_quantity } = useSelector(({ profile }) => profile);
  const [amounts, setAmounts] = React.useState([0, 0]);

  const currentPrice = products[0].prices[currentIndex];
  const currentSymbol = currentPrice.payment_token.symbol;
  const totalAmount = amounts.reduce((sum, item) => sum + item || 0, 0);

  const isDiscount = totalAmount >= min_discount_quantity;
  const totalDiscount = totalAmount * currentPrice.price * (isDiscount ? discount : 0);
  const totalPrice = totalAmount * currentPrice.price * (1 - (isDiscount ? discount : 0));

  const setAmount = (index, value) => {
    setAmounts((array) => {
      array[index] = value;
      return array.slice();
    });
  };

  const { mutate: checkout, isLoading } = useMutation(marketService.checkout, {
    onSuccess: (data, body) => {
      const { order } = data;
      storageService.saveOrder({
        orderId: order.id,
        createdAt: order.CreatedAt,
        ...body,
        currentPrice,
        totalDiscount,
        discount: discount,
        totalPrice: Number(order.total_amount),
      });

      setTimeout(() => {
        onClose();
        onSuccess();
        onRefresh();
      }, 0);
    },
  });

  const handleClickCheckout = async () => {
    const { payment_token } = currentPrice;
    const balance = payment_token.address
      ? await erc20Contract(payment_token.address).methods.balanceOf(address).call()
      : await web3.eth.getBalance(address);
    const isEnough = Number(balance) >= totalPrice * 10 ** (payment_token.decimal || 18);
    if (!isEnough) {
      enqueueSnackbar('Your balance is insufficient', { variant: 'error' });
      return;
    }

    checkout({
      products: products.map((item, index) => ({
        product_id: item.product_id,
        amount: amounts[index],
        name: products[index].name,
      })),
      currency: currentSymbol,
    });
  };

  return (
    <div className='box-border text-white p-10 overflow-x-hidden'>
      <Typography
        variant='h3'
        className='flex items-center justify-center'
        style={{
          width: 'calc(100% + 80px)',
          height: 60,
          backgroundColor: '#4E4462',
          margin: '-40px -40px 24px',
          borderBottom: '2px solid #624266',
          borderTopLeftRadius: 14,
          borderTopRightRadius: 14,
        }}
      >
        CHECKOUT
      </Typography>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell className='border-0 w-60 text-base'>Item</TableCell>
            <TableCell className='border-0 w-40 text-right text-base'>Price</TableCell>
            <TableCell className='border-0 w-48 text-center text-base'>Quantity</TableCell>
            <TableCell className='border-0 w-40 text-right text-base'>Amount</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {products.map((product, index) => {
            const price = product.prices[currentIndex];
            return (
              <TableRow key={index}>
                <TableCell className='flex border-0'>
                  <img
                    src={require(`assets/projects/americanmcgee/checkout-item${index + 1}.png`).default}
                    className='w-14 mr-6'
                  />
                  <div className='self-center'>
                    <Typography>{product.name}</Typography>
                    <Typography variant='body2' color='silver'>
                      Remaining: {formatNumber(price.remain)}
                    </Typography>
                  </div>
                </TableCell>
                <TableCell className='border-0 text-right text-base'>
                  {formatNumber(currentPrice.price)} {currentSymbol}
                </TableCell>

                <TableCell className='border-0'>
                  <div className='flex items-center rounded p-1' style={{ backgroundColor: '#201831' }}>
                    <IconButton
                      size='small'
                      className='mx-1'
                      onClick={() => setAmount(index, Math.max(0, amounts[index] - 1))}
                    >
                      <Remove className='text-white' />
                    </IconButton>
                    <div className='box-border rounded font-medium p-1' style={{ borderColor: '#5E6484' }}>
                      <NumberFormat
                        value={amounts[index]}
                        onValueChange={({ floatValue: value }) => setAmount(index, value)}
                        onBlur={() => {
                          if (!amounts[index]) setAmount(index, 0);
                          if (amounts[index] > price.remain) setAmount(index, price.remain);
                        }}
                        maxLength={3}
                        allowNegative={false}
                        className='w-16 text-center bg-transparent'
                      />
                    </div>
                    <IconButton
                      size='small'
                      className='mx-1'
                      onClick={() => setAmount(index, Math.min(price.remain, amounts[index] + 1))}
                    >
                      <Add className='text-white' />
                    </IconButton>
                  </div>
                </TableCell>

                <TableCell className='border-0 text-right text-base'>
                  {formatNumber(currentPrice.price * (amounts[index] || 0))} {currentSymbol}
                </TableCell>
              </TableRow>
            );
          })}

          <TableRow>
            <TableCell className='border-0 bg-transparent' component='th' scope='row'>
              TOTAL
            </TableCell>
            <TableCell align='right' className='bg-transparent' style={{ border: '0px' }}></TableCell>
            <TableCell align='right' className='bg-transparent' style={{ border: '0px' }}>
              <div className='flex justify-center' style={{ fontSize: '16px', fontWeight: '400' }}>
                {totalAmount}
              </div>
            </TableCell>
            <TableCell
              align='right'
              className='bg-transparent'
              style={{ fontSize: '16px', fontWeight: '700', border: '0px' }}
            >
              {formatNumber(totalAmount * currentPrice.price)} {currentSymbol}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>

      <Grid container style={{ background: '#4E4462' }} className='rounded-lg w-72 ml-auto px-4 py-1'>
        <Grid item xs={12} className='flex justify-between py-1'>
          <Typography variant='body2'>VIP discount</Typography>
          <Typography className='font-black'>
            {formatNumber(totalDiscount)} {currentSymbol}
          </Typography>
        </Grid>
        <Grid item xs={12} className='flex justify-between py-1'>
          <Typography variant='body2'>Total Amount</Typography>
          <Typography style={{ color: '#FFD975', fontSize: '16px', fontWeight: '700' }}>
            {formatNumber(totalPrice)} {currentSymbol}
          </Typography>
        </Grid>
      </Grid>

      <DialogActions className='flex justify-end mt-6'>
        <LoadingButton size='large' color='inherit' className='px-6' disabled={isLoading} onClick={onClose}>
          Cancel
        </LoadingButton>
        <DesignButton size={160} loading={isLoading} onClick={handleClickCheckout}>
          CHECKOUT
        </DesignButton>
      </DialogActions>
    </div>
  );
};

export default PopupBuy;
