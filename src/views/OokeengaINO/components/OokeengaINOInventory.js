import styled from '@emotion/styled';
import { Link as MuiLink } from '@mui/material';
import React from 'react';

const OokeengaINOInventory = () => {
  return (
    <div className='flex flex-col text-[#481A00]'>
      <img className='w-8/12 self-center' src={require('assets/projects/championLeague.png')} />

      <div className='font-bold text-md md:text-[28px] text-center mt-3 mb-2 md:mb-8' style={{ fontFamily: 'Skranji' }}>
        REGISTER FREE <br />
        To Join Ookeenga Champion League
      </div>

      <span
        className='text-md md:text-2xl text-left flex items-center mt-2 md:mt-8 mb-2'
        style={{ fontFamily: 'Skranji' }}
      >
        <img className='mr-2' src={require('assets/projects/ticketIcon.png')} />
        Registration Schedule
      </span>

      <div className='flex justify-between items-start md:text-left p-2 md:px-6 md:py-4 bg-[#E6BA93] border-[1px] border-[#B37553] rounded-t-2xl font-medium'>
        <div className='font-medium text-sm md:text-base text-[#481A00]'>From</div>
        <div className='font-bold text-right text-[#5C1710] text-sm md:text-base'>10 Dec 2022, 02:00 AM UTC</div>
      </div>
      <div className='flex justify-between items-start md:text-left p-2 md:px-6 md:py-4 bg-[#E6BA93] border-x-[1px] border-[#B37553] font-medium'>
        <div className='font-medium text-sm md:text-base text-[#481A00]'>To</div>
        <div className='font-bold text-right text-[#5C1710] text-sm md:text-base'>16 Dec 2022, 11:00 AM UTC</div>
      </div>
      <div className='flex justify-between items-start md:text-left p-2 md:px-6 md:py-4 bg-[#E6BA93] border-[1px] border-[#B37553] rounded-b-2xl font-medium'>
        <div className='font-medium text-sm md:text-base text-[#481A00]'>Fee</div>
        <div className='font-bold text-right text-[#5C1710] text-sm md:text-base'>FREE TO JOIN</div>
      </div>

      <span
        className='text-md md:text-2xl text-left flex items-center mt-2 md:mt-8 mb-2'
        style={{ fontFamily: 'Skranji' }}
      >
        <img className='mr-2' src={require('assets/projects/trophyIcon.png')} />
        Prize Pool Distribution
      </span>
      <div className='p-2 md:p-5 bg-[#E6BA93] text-[#481A00] border-[1px] border-[#B37553] rounded-2xl font-medium mb-2 text-sm md:text-base'>
        <ul className='list-disc list-outside ml-5'>
          <li className=''>
            The rewards will be paid in OKG based on the equivalent exchange rate at the payout time.
          </li>
          <li className=''>Champions will receive rewards within one week after the Leaderboard is announced.</li>
          <li className=''>The Prize Pool will be distributed as below.</li>
          <img className='w-full self-center mt-4' src={require('assets/rate.jpeg')} />
        </ul>
      </div>

      <span className='text-md md:text-2xl text-left flex items-center mt-6 mb-2' style={{ fontFamily: 'Skranji' }}>
        <img className='mr-2' src={require('assets/projects/ruleBookIcon.png')} />
        Champion League Information
      </span>
      <div className='p-2 md:p-5 bg-[#E6BA93] border-[1px] border-[#B37553] rounded-2xl font-medium text-sm md:text-base'>
        <span className='font-extrabold mb-2 text-sm md:text-base'>Organizer</span>
        <ul className='list-disc list-outside ml-5 mb-4'>
          <li className=''>Ookeenga Lab</li>
        </ul>

        <span className='font-extrabold mb-2 text-sm md:text-base'>Who can join this Champion League?</span>
        <ul className='list-disc list-outside ml-5 mb-4'>
          <li className=''>
            Everyone can enter the Champion League. No NFT is required, all players will be given a same pool of non-NFT
            Heroes to play.
          </li>
          <li className=''>
            Members of Ookeenga Dev Team and Champion League Organizers are forbidden to participate in this event.
          </li>
          <li className=''>
            Members of Ookeenga Dev Team and Champion League Organizers are forbidden to participate in this event.
          </li>
        </ul>

        <span className='font-extrabold mb-2 text-sm md:text-base'>Limit of participants</span>
        <ul className='list-disc list-outside ml-5 mb-4'>
          <li className=''>No limit</li>
        </ul>

        <span className='font-extrabold mb-2 text-sm md:text-base'>Date and Time</span>
        <ul className='list-disc list-outside ml-5 mb-4'>
          <li className=''>00:00 AM Saturday 17 Dec - 00:00 AM UTC Sunday 18 Dec</li>
        </ul>

        <span className='font-extrabold mb-2 text-sm md:text-base'>Champion League Venue:</span>
        <ul className='list-disc list-outside ml-5 mb-4'>
          <li className=''>
            The Champion League will take place in a downloadable version specially created for this event. The link to
            download Champion League Version will be sent to participants via registered emails.
          </li>
          <li className=''>
            Please note that the downloadable version is only for Champion League. Players won’t be able to login to
            that version before the starting time of the event.
          </li>
        </ul>

        <span className='font-extrabold mb-2 text-sm md:text-base'>
          How to ensure your victory in the champion league?
        </span>
        <ul className='list-disc list-outside ml-5 mb-4'>
          <li className=''>
            Start practice playing Ookeenga in the Free Version at{' '}
            <MuiLink className='hover:underline' style={{ color: '#B74404' }} href='https://play.ookeenga.io/'>
              {' '}
              play.ookeenga.io
            </MuiLink>
            . The pool of non-NFT Heroes and the difficulty level in the Free Version are similar to the Champion League
            Version.
          </li>
        </ul>

        <span className='font-extrabold mb-2 text-sm md:text-base'>Rules</span>
        <ul className='list-disc list-outside ml-5'>
          <li className=''>
            Each player is given an account to log into the Champion League Version. The account information will be
            sent to you after you complete registration. One player has only one account.
          </li>
          <li className=''>
            All players will be given a fixed inventory of 20 Non-NFT Heroes and the same amount of resources, including
            in-game items, EXP and gKAB. You may swap heroes and cards from that inventory only. You may upgrade heroes
            and use given items to optimize their strategy for the game.
          </li>
          <li className=''>Each player has 20 playing turns in the Champion League.</li>
          <li className=''>All players start at the same stage chosen by the Champion League organizer.</li>
          <li className=''>
            The Champion League will open from 00:00 AM Saturday 17 Dec - 00:00 AM UTC Sunday 18 Dec. The Leaderboard
            will be ranked based on the games played during this time.
          </li>
        </ul>
      </div>

      <span
        className='text-md md:text-2xl text-left flex items-center mt-2 md:mt-8 mb-2'
        style={{ fontFamily: 'Skranji' }}
      >
        <img className='mr-2' src={require('assets/projects/rankingIcon.png')} />
        Ranking System
      </span>
      <div className='p-2 md:p-5 bg-[#E6BA93] border-[1px] border-[#B37553] rounded-2xl font-medium text-sm md:text-base'>
        <span className='mb-4'>The Ranks on the Champion League Leaderboard are based on the following criteria:</span>
        <ul className='list-disc list-outside ml-5'>
          <li className=''>The number of stars a player gets in 20 playing turns.</li>
          <li className=''>
            If two players have equal numbers of stars, the player at the lower stages will get a higher rank.
          </li>
          <li className=''>
            If two players have equal numbers of stars and are at the same stage, the player who has a lower Battle Time
            in will get a higher rank. The Battle Time is based on the time the player spends on combats. The time the
            player spends outside the combats doesn’t affect the Ranking.
          </li>
        </ul>
      </div>

      <span
        className='text-md md:text-2xl text-left flex items-center mt-2 md:mt-8 mb-2'
        style={{ fontFamily: 'Skranji' }}
      >
        <img className='mr-2' src={require('assets/projects/faq.png')} />
        FAQ
      </span>
      <div className='p-2 md:p-5 bg-[#E6BA93] border-[1px] border-[#B37553] rounded-2xl font-medium text-sm md:text-base'>
        <span className='font-extrabold mb-2 text-sm md:text-base'>What is Ookeenga Champion League?</span>
        <ul className='list-disc list-outside ml-5 mb-4'>
          <li className=''>
            Ookeenga Champion League is an event for every gamer as players won’t need NFT to play. Champion League
            participants will play in a random PvE map picked by the Host.
          </li>
        </ul>

        <span className='font-extrabold mb-2 text-sm md:text-base'>Who can join in Ookeenga Champion League?</span>
        <ul className='list-disc list-outside ml-5 mb-4'>
          <li className=''>
            Everyone can enter the Champion League. No NFT is required, all players will be given a same pool of non-NFT
            Heroes to play.
          </li>
        </ul>

        <span className='font-extrabold mb-2 text-sm md:text-base'>
          If you’re new to Ookeenga, do you have chances to win in tournament?
        </span>
        <ul className='list-disc list-outside ml-5 mb-4'>
          <li className=''>
            Yes. It’s an absolutely fair game for everyone as all players will be given a fixed inventory of 20 Non-NFT
            Heroes and the same amount of resources, including in-game items, EXP and gKAB. You may swap heroes and
            cards from that inventory only. You may upgrade heroes and use given items to optimize their strategy for
            the game.
          </li>
        </ul>

        <span className='font-extrabold mb-2 text-sm md:text-base'>
          What is the prize for Ookeenga Champion League?
        </span>
        <ul className='list-disc list-outside ml-5 mb-4'>
          <li className=''>
            The Prize Pool takes 70% of all the Ticket Purchase and will be distributed to the Top 20% Winners of the
            Champion League. The exact number of prizes will be announced after Registration Closed on December 17.
          </li>
        </ul>

        <span className='font-extrabold mb-2 text-sm md:text-base'>
          How to participate in Ookeenga Champion League?
        </span>
        <div className='mb-4'>
          Register your slot at: ​
          <MuiLink className='hover:underline' style={{ color: '#B74404' }} href='https://okglabs.com/tickets'>
            ​okglabs.com/tickets.
          </MuiLink>{' '}
          Registration will be closed at 11 AM UTC, Saturday 16 December.
        </div>

        <span className='font-extrabold mb-2 text-sm md:text-base'>How to win in Ookeenga Champion League?</span>
        <div className='mb-4'>There are 4 things you should do to ensure your victory in the Champion League: </div>
        <ul className='list-disc list-outside ml-5 mb-4'>
          <li className=''>
            Practice playing Free Version now at{' '}
            <MuiLink className='hover:underline' style={{ color: '#B74404' }} href='https://play.ookeenga.io/'>
              play.ookeenga.io
            </MuiLink>
            .
          </li>
          <li className=''>
            Find out all information and suggested strategies for your Troop Cards and Spell Cards at{' '}
            <MuiLink
              className='hover:underline'
              style={{ color: '#B74404' }}
              href='https://ookeenga.fandom.com/wiki/Ookeenga_Wiki'
            >
              Ookeenga Wiki
            </MuiLink>
            .
          </li>
          <li className=''>
            Watch{' '}
            <MuiLink
              className='hover:underline'
              style={{ color: '#B74404' }}
              href='https://www.youtube.com/playlist?list=PLxWky5BSAGEW9meZCYxEdxwRP-ofRdUKc'
            >
              Walkthrough Tutorial
            </MuiLink>{' '}
            for PvE Maps
          </li>
          <li className=''>
            Join our{' '}
            <MuiLink className='hover:underline' style={{ color: '#B74404' }} href='https://dsc.gg/ookeenga'>
              Discord
            </MuiLink>{' '}
            for discussion on Gameplay and Weekly Livestream on Ookeenga Playing Tips.
          </li>
        </ul>

        <span className='font-extrabold mb-2 text-sm md:text-base'>
          When will you receive the prizes if you win in Ookeenga Champion League?
        </span>
        <div className='mb-4'>Champions will receive rewards within one week after the Leaderboard is announced.</div>

        <span className='font-extrabold mb-2 text-sm md:text-base'>
          What should you do to make sure you won’t encounter any technical problems while playing in Ookeenga Champion
          League?
        </span>
        <div className='mb-4'>
          We recommend you double-check their Devices and Internet Connection before the tournament starts. We do not
          hold responsibility for technical issues that relate to your Devices and Internet Connection. The recommended
          specs for the best playing experience are:
        </div>
        <ul className='list-disc list-outside ml-5'>
          <li className=''>PC/Laptop Specs: CPU: 2.93 GHz processor (supporting SSE2 instruction set or higher)</li>
          <li className=''>RAM: at least 4GB free</li>
          <li className=''>VRAM: 512MB</li>
          <li className=''>OS: Windows 7 or higher operating system</li>
          <li className=''>DirectX: 9.0c or higher</li>
          <li className=''>Internet Connection: 30mbps</li>
        </ul>
      </div>
    </div>
  );
};

export default OokeengaINOInventory;
