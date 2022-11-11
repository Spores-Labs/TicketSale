import React, { useEffect } from 'react';
import { useQuery } from 'react-query';
import { Container, Table, TableHead, TableBody, TableCell, TableRow, Typography } from '@mui/material';
import { DateTime } from 'luxon';
import { shorten } from 'utils/common';
import { formatNumber } from 'utils/common';
import { useServicesContext } from 'services/ServicesContext';
import { projectData } from './Data';
import { useSelector } from 'react-redux';

const STATUS_MAP = {
  1: { name: 'PENDING', color: '#FF991F' },
  2: { name: 'PENDING', color: '#FF991F' },
  3: { name: 'SUCCESS', color: '#00875A' },
  4: { name: 'FAILED', color: '#DE350B' },
};

const OokeengaINOOrder = () => {
  const { isLoggedIn } = useSelector(({ profile }) => profile);
  const { projectConfig, marketService } = useServicesContext();
  const { data: dataList = [] } = useQuery([`${projectConfig.alias}_marketService.searchSales`], () =>
    marketService.fetchOrders(),
  );
  useEffect(() => {
    if (isLoggedIn) return;
    window.location.href = '/tickets';
  }, [isLoggedIn]);
  return (
    <div
      className='bg-no-repeat bg-fixed flex-1'
      style={{ backgroundImage: `url(${projectData.background})`, backgroundSize: '100% 100%', height: '100vh' }}
    >
      <div
        className='bg-cover flex flex-col items-center justify-center'
        style={{ backgroundPosition: 'center center' }}
      >
        <div
          className='p-8 mt-8 w-full md:w-5/6'
          style={{
            backgroundColor: 'rgba(23, 10, 2, 0.8)',
            borderRadius: '16px',
            overflowX: 'auto',
            overflowY: 'auto',
          }}
        >
          <div className='mb-6 font-skadi font-bold' style={{ fontSize: '32px', color: '#E0C685' }}>
            ORDER HISTORY
          </div>

          <Table>
            <TableHead>
              <TableRow>
                <TableCell>TRANSACTION ID</TableCell>
                <TableCell>DATE</TableCell>
                <TableCell>ITEM</TableCell>
                <TableCell>PRICE</TableCell>
                <TableCell>QUANTITY</TableCell>
                <TableCell>AMOUNT</TableCell>
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
                      <TableCell>{item.product_name[0]}</TableCell>
                      <TableCell rowSpan={2}>
                        {formatNumber(Math.round(item.product_price[0]))} {item.currency}
                      </TableCell>
                      <TableCell rowSpan={2}>{formatNumber(item.total_amount / item.product_price[0])}</TableCell>
                      <TableCell rowSpan={2}>
                        {formatNumber(item.total_amount)} {item.currency}
                      </TableCell>
                      <TableCell rowSpan={2}>
                        <span
                          className='text-white text-sm rounded px-4 py-1.5'
                          style={{ backgroundColor: STATUS_MAP[item.status].color }}
                        >
                          {STATUS_MAP[item.status].name}
                        </span>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      {/* <TableCell>{item.product_name[1]}</TableCell>
                    <TableCell>
                      {formatNumber(item.product_price[1])} {item.currency}
                    </TableCell>
                    <TableCell>{item.product_quantity[1]}</TableCell> */}
                    </TableRow>
                  </React.Fragment>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default OokeengaINOOrder;
