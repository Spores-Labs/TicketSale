import styled from '@emotion/styled';
import { Link as MuiLink } from '@mui/material';
import React from 'react';

const OokeengaINOInventory = () => {
  return (
    <div className='flex flex-col text-[#481A00]'>
      <img className='w-8/12 self-center' src={require('assets/projects/championLeague.png')} />
      <img className='w-8/12 self-center mt-2 md:mt-10' src={require('assets/projects/ticket.png')} />

      <div className='font-bold text-md md:text-[28px] text-center mt-3 mb-2 md:mb-8' style={{ fontFamily: 'Skranji' }}>
        Get Ticket <br />
        To Join Ookeenga Champion League
      </div>

      <span
        className='text-md md:text-2xl text-left flex items-center mt-2 md:mt-6 mb-2'
        style={{ fontFamily: 'Skranji' }}
      >
        <img className='mr-2' src={require('assets/projects/ticketIcon.png')} />
        Ticket Sales Schedule
      </span>

      <div className='flex justify-between items-start md:text-left p-2 md:px-6 md:py-4 bg-[#E6BA93] border-[1px] border-[#B37553] rounded-t-2xl font-medium'>
        <div className='font-normal text-sm md:text-base'>From</div>
        <div className='font-bold text-right text-[#5C1710] text-sm md:text-base'>15 Nov 2022, 05:00 PM UTC</div>
      </div>
      <div className='flex justify-between items-start md:text-left p-2 md:px-6 md:py-4 bg-[#E6BA93] border-x-[1px] border-[#B37553] font-medium'>
        <div className='font-normal text-sm md:text-base'>To</div>
        <div className='font-bold text-right text-[#5C1710] text-sm md:text-base'>17 Nov 2022, 05:00 AM UTC</div>
      </div>
      <div className='flex justify-between items-start md:text-left p-2 md:px-6 md:py-45 bg-[#E6BA93] border-[1px] border-[#B37553] rounded-b-2xl font-medium'>
        <div className='font-normal text-sm md:text-base'>Distribution</div>
        <div className='font-bold text-right text-[#5C1710] text-sm md:text-base'>
          Entry Ticket will be sent via email
        </div>
      </div>

      <span className='text-md md:text-2xl text-left flex items-center mt-2 md:mt-6 mb-2' style={{ fontFamily: 'Skranji' }}>
        <img className='mr-2' src={require('assets/projects/trophyIcon.png')} />
        Prize Pool Distribution
      </span>
      <div className='p-2 md:p-5 bg-[#E6BA93] border-[1px] border-[#B37553] rounded-2xl font-medium mb-2 text-sm md:text-base'>
        <ul className='list-disc list-inside'>
          <li className='mb-4'>
            The rewards will be paid in OKG based on the equivalent exchange rate at the payout time.
          </li>
          <li className='mb-4'>Champions will receive rewards within one week after the Leaderboard is announced.</li>
          <li className='mb-4'>The Prize Pool is distributed as below.</li>
        </ul>
      </div>
      <img className='rounded-2xl mb-6' src={require('assets/projects/info1.png')} />

      <span className='text-md md:text-2xl text-left flex items-center mt-6 mb-2' style={{ fontFamily: 'Skranji' }}>
        <img className='mr-2' src={require('assets/projects/ruleBookIcon.png')} />
        Rules
      </span>
      <span className='font-extrabold mb-2 text-sm md:text-base'>Organizer</span>
      <div className='p-2 md:p-5 bg-[#E6BA93] border-[1px] border-[#B37553] rounded-2xl font-medium mb-6 text-sm md:text-base'>
        Ookeenga Lab
      </div>
      <span className='font-extrabold mb-2 text-sm md:text-base'>Who can join this Champion League?</span>
      <div className='p-2 md:p-5 bg-[#E6BA93] border-[1px] border-[#B37553] rounded-2xl font-medium mb-6 text-sm md:text-base'>
        Everyone can enter the Champion League.
      </div>
      <span className='font-extrabold mb-2 text-sm md:text-base'>Limit of participants</span>
      <div className='p-2 md:p-5 bg-[#E6BA93] border-[1px] border-[#B37553] rounded-2xl font-medium mb-6 text-sm md:text-base'>
        No limit
      </div>
      <span className='font-extrabold mb-2 text-sm md:text-base'>Rules and Regulations</span>
      <div className='p-2 md:p-5 bg-[#E6BA93] border-[1px] border-[#B37553] rounded-2xl font-medium mb-6 text-sm md:text-base'>
        <ul className='list-disc list-outside ml-5'>
          <li className='mb-4'>
            Each player is given an account to log into the Champion League. The account information will be sent to you
            after 5 AM UTC on 17 November. One player has only one account.
          </li>
          <li className='mb-4'>
            Each player is given a fixed inventory of 10 Non-NFT Heroes and the same amount of resources, including
            in-game items, EXP and gKAB. You may swap heroes and cards from that inventory only. You may upgrade heroes
            and use given items to optimize their strategy for the game.
          </li>
          <li className='mb-4'>Each player has 10 playing turns in the Champion League.</li>
          <li className='mb-4'>All players start at the same stage chosen by the Champion League organizer.</li>
          <li className='mb-4'>
            The Champion League will open from 12 PM UTC - 3 PM UTC. During this time, players must log in to the
            Champion League game. The Leaderboard will be ranked based on the games played in this 3-hour session.
          </li>
        </ul>
        <span className='mb-4'>
          For detail information: visit
          <MuiLink
            className='hover:underline'
            style={{ color: '#B74404' }}
            href='https://metamask.zendesk.com/hc/en-us/articles/360043227612-How-to-add-a-custom-network-RPC'
          >
            {' '}
            here
          </MuiLink>
        </span>
      </div>

      <span className='text-md md:text-2xl text-left flex items-center mt-2 md:mt-6 mb-2' style={{ fontFamily: 'Skranji' }}>
        <img className='mr-2' src={require('assets/projects/rankingIcon.png')} />
        Ranking System
      </span>
      <div className='p-2 md:p-5 bg-[#E6BA93] border-[1px] border-[#B37553] rounded-2xl font-medium mb-6 text-sm md:text-base'>
        <span className='mb-4'>The Ranks on the Champion League Leaderboard are based on the following criteria:</span>
        <ul className='list-disc list-outside ml-5'>
          <li className='mb-4'>The number of stars a player gets in 10 playing turns.</li>
          <li className='mb-4'>
            If two players have equal numbers of stars, the player at the lower stages will get a higher rank.
          </li>
          <li className='mb-4'>
            If two players have equal numbers of stars and are at the same stage, the player who clears the stages in
            less time will get a higher rank.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default OokeengaINOInventory;
