import React from 'react';
import { projectData } from './Data';

const OokeengaINORestricted = () => {
  return (
    <div
      sx={{ flexGrow: 1 }}
      className='bg-no-repeat bg-cover flex-1 flex items-center h-screen justify-center'
      style={{ backgroundImage: `url(${projectData.backgroundBlur})` }}
    >
      <div style={{ border: '1px solid #53443C', background: 'rgba(23, 10, 2, 0.8)' }} className='py-9 px-18 sm:px-14 flex flex-col justify-center item-center gap-1 rounded-[10px]'>
        <div className='font-skadi font-bold text-2xl text-[#F1E9DC] flex justify-center'>Oops!</div>
        <div className='text-[#DEC5AD] font-normal'>This Champion League is restricted in your country</div>
      </div>
    </div>
  );
};

export default OokeengaINORestricted;
