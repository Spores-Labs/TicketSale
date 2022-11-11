import { Link, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { ReactComponent as GateIO } from 'assets/projects/animalia/GateIO.svg';
import { ReactComponent as Uniswap } from 'assets/projects/animalia/Uniswap.svg';
import React from 'react';

export const LinkCustom = styled(Link)(({ theme }) => ({
  '&:hover': {
    color: '#cfb675',
  },
  color: '#ffffff',
  cursor: 'pointer',
}));

export const LinkCustomBtn = styled(LinkCustom)(({ theme }) => ({
  '&:hover': {
    color: '#ffffff',
    backgroundColor: 'rgb(164, 165, 168)',
  },
}));

function PreHeader() {
  return (
    <div
      className='h-16 px-6 hidden lg:flex items-center text-white'
      style={{ backgroundColor: '#232323', boxShadow: 'inset 0px -0.5px 0px rgba(255, 255, 255, 0.25)' }}
    >
      <div className='flex-grow flex'>
        <Typography className='mr-3'>Ethereum Contract:</Typography>
        <LinkCustom href='https://etherscan.io/token/0xcbE771323587EA16dACB6016e269D7F08A7ACC4E' target={'_blank'}>
          0xcbE7713235...F08A7ACC4E
        </LinkCustom>
        <span className='mx-5'>|</span>
        <Typography className='mr-3'>BSC Contract:</Typography>
        <LinkCustom href='https://bscscan.com/token/0x8357c604c5533fa0053beaaa1494da552cea38f7' target={'_blank'}>
          0x8357c604c5...552cea38f7
        </LinkCustom>
      </div>
      <div className='flex items-center'>
        <Typography className='mr-4'>Get SPO:</Typography>
        <LinkCustom
          href='https://app.uniswap.org/#/swap?outputCurrency=0xcbE771323587EA16dACB6016e269D7F08A7ACC4E'
          target={'_blank'}
          className='flex mr-8'
        >
          <Uniswap className='mr-2' /> Uniswap
        </LinkCustom>
        <LinkCustom href='https://www.gate.io/trade/SPO_USDT' target={'_blank'} className='flex mr-8'>
          <GateIO className='mr-2' /> Gate.io
        </LinkCustom>
        <LinkCustomBtn
          target={'_blank'}
          href='https://staking.spores.app/'
          className='rounded-full border-2 border-white px-4 py-2 cursor-pointer'
        >{`Stake & Earn`}</LinkCustomBtn>
      </div>
    </div>
  );
}

export default PreHeader;
