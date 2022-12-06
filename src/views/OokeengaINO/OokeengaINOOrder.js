import React, { useEffect } from 'react';
import { useQuery } from 'react-query';
import {
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  Box,
  TableContainer,
  IconButton,
  Snackbar,
  Alert,
} from '@mui/material';
import { DateTime } from 'luxon';
import { shorten } from 'utils/common';
import { formatNumber } from 'utils/common';
import { useServicesContext } from 'services/ServicesContext';
import { projectData } from './Data';
import { useSelector } from 'react-redux';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const STATUS_MAP = {
  1: { name: 'PENDING', color: '#564A26', textColor: '#FFD65B' },
  2: { name: 'PENDING', color: '#564A26', textColor: '#FFD65B' },
  3: { name: 'SUCCESS', color: '#154635', textColor: '#42E366' },
  4: { name: 'FAILED', color: '#5B2D36', textColor: '#FF5757' },
};

const OokeengaINOOrder = () => {
  const [openSnackBar, setOpenSnackBar] = React.useState(false);
  const [isVisible, setIsVisible] = React.useState(false);
  const { isLoggedIn } = useSelector(({ profile }) => profile);
  const { projectConfig, marketService } = useServicesContext();
  const { data: dataList = [] } = useQuery([`${projectConfig.alias}_marketService.searchSales`], () =>
    marketService.fetchOrders(),
  );
  const { data: dataAccount = [] } = useQuery(
    [`${projectConfig.alias}_marketService.fetchAccountInfo`],
    () => marketService.fetchAccountInfo(),
    {
      isVisible: false,
    },
  );
  console.log(dataAccount);
  useEffect(() => {
    if (isLoggedIn) return;
    window.location.href = '/tickets';
  }, [isLoggedIn]);
  const handleClose = () => {
    setOpenSnackBar(false);
  };
  return (
    <div
      sx={{ flexGrow: 1 }}
      className='bg-no-repeat bg-cover flex-1 flex items-center lg:items-start flex-col lg:pl-12 h-screen'
      style={{ backgroundImage: `url(${projectData.background})` }}
    >
      <div
        className='p-4 sm:p-8 mt-8 w-full md:w-11/12'
        style={{
          backgroundColor: 'rgba(23, 10, 2, 0.8)',
          borderRadius: '16px',
          overflowX: 'auto',
          overflowY: 'auto',
        }}
      >
        <div className='mb-6 font-skadi font-bold text-xl sm:text-3xl text-[#F5E6D5]'>ORDER HISTORY</div>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>TRANSACTION ID</TableCell>
                <TableCell>DATE</TableCell>
                <TableCell>TOTAL VALUE</TableCell>
                <TableCell>STATUS</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {dataList.map((item, index) => {
                if (!item.product_name[1]) {
                  item.product_name[1] = '-';
                  if (item.product_name[0] === 'Anxiety Rabbit') item.product_name[1] = 'Goth Rabbit';
                  if (item.product_name[0] === 'Goth Rabbit') item.product_name[1] = 'Anxiety Rabbit';
                  item.product_price[1] = item.product_price[0];
                  item.product_quantity[1] = 0;
                }
                return (
                  <React.Fragment key={index}>
                    <TableRow>
                      <TableCell rowSpan={2}>
                        <span title={item.transaction_hash}>{shorten(item.transaction_hash, 12, 10)}</span>
                      </TableCell>
                      <TableCell rowSpan={2}>
                        {DateTime.fromISO(item.order_time).toFormat('HH:mm dd/MM/yyyy')}
                      </TableCell>
                      <TableCell rowSpan={2}>
                        <span className='font-black'>
                          {formatNumber(item.total_amount)} {item.currency}
                        </span>
                      </TableCell>
                      <TableCell rowSpan={2}>
                        <span
                          className='text-sm rounded-lg px-4 py-1.5'
                          style={{
                            backgroundColor: STATUS_MAP[item.status].color,
                            color: STATUS_MAP[item.status].textColor,
                          }}
                        >
                          {STATUS_MAP[item.status].name}
                        </span>
                      </TableCell>
                    </TableRow>
                    <TableRow></TableRow>
                  </React.Fragment>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <div
        className='p-4 sm:p-8 mt-8 w-full md:w-11/12 lg:w-6/12'
        style={{
          backgroundColor: 'rgba(23, 10, 2, 0.8)',
          borderRadius: '16px',
          overflowX: 'auto',
          overflowY: 'auto',
        }}
      >
        <div className='mb-6 font-skadi font-bold text-xl sm:text-3xl text-[#F5E6D5]'>Account Information</div>
        <TableContainer className=''>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>No.</TableCell>
                <TableCell>USER NAME</TableCell>
                <TableCell></TableCell>
                <TableCell>PASSWORD</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {dataAccount.map((item, index) => {
                return (
                  <React.Fragment key={index}>
                    <TableRow>
                      <TableCell rowSpan={2}>
                        <span>#{index+1}</span>
                      </TableCell>
                      <TableCell rowSpan={2} className='w-[130px]'>{item.username}</TableCell>
                      <TableCell rowSpan={2}>
                        <IconButton
                          color='primary'
                          onClick={() => {
                            setOpenSnackBar(true);
                            navigator.clipboard.writeText(item.username);
                          }}
                        >
                          <ContentCopyIcon className='text-[#F5E6D5]' />
                        </IconButton>
                      </TableCell>
                      <TableCell rowSpan={2} className='w-[130px]'>
                        {isVisible ? (
                          <span className='font-black'>{item.password}</span>
                        ) : (
                          <span className='font-black'>********</span>
                        )}
                      </TableCell>
                      <TableCell rowSpan={2}>
                        <IconButton
                          color='primary'
                          onClick={() => {
                            setOpenSnackBar(true);
                            navigator.clipboard.writeText(item.password);
                          }}
                        >
                          <ContentCopyIcon className='text-[#F5E6D5]' />
                        </IconButton>

                        {isVisible ? (
                          <IconButton color='primary' onClick={() => setIsVisible(false)}>
                            <VisibilityOffIcon className='text-[#F5E6D5]' />
                          </IconButton>
                        ) : (
                          <IconButton color='primary' onClick={() => setIsVisible(true)}>
                            <VisibilityIcon className='text-[#F5E6D5]' />
                          </IconButton>
                        )}
                      </TableCell>
                    </TableRow>
                    <TableRow></TableRow>
                  </React.Fragment>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        onClose={handleClose}
        open={openSnackBar}
        autoHideDuration={2000}
        message='Copied'
      >
        <Alert className='bg-[#463024] text-white' severity='success' sx={{ width: '100%' }}>
          Copied
        </Alert>
      </Snackbar>
    </div>
  );
};

export default OokeengaINOOrder;
