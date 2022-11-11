import { Link as MuiLink } from '@mui/material';
import React from 'react';

const OokeengaINOInventory = () => {
  return (
    <div style={{ color: '#F5E6D5', fontSize: '18px' }}>
      <div>
        Ookeenga Web3 Game is the first product of a long-term visionary project of the Ookeenga franchise, including
        Web2 games, mobile games, and merchandise that revolve around the world of Ookeenga.
        <br />
        Inspired by the hit game Clash Royale which has easy but addictive gameplay, Ookeenga is set in a world where
        insects have evolved and built a massive civilization. The game is a combination of 3 genres that are common in
        the gaming community: Real-time Strategy, Collectible Card, and Tower Defense. This makes the game easy to pick
        up but takes time to master.
      </div>

      <div className='flex mt-6 mb-12 items-center'>
        <MuiLink
          href='https://ookeenga.com/#home'
          className='hover:text-white mr-3 opacity-50 hover:opacity-100'
          title='Official Website'
        >
          <img src={require('assets/icons/media/website.svg').default} />
        </MuiLink>
        <MuiLink
          href='https://twitter.com/ookeenga'
          className='hover:text-white mr-3 opacity-50 hover:opacity-100'
          title='Twitter'
        >
          <img src={require('assets/icons/media/twitter.svg').default} />
        </MuiLink>
        <MuiLink
          href='https://www.facebook.com/ookeenga.official'
          className='hover:text-white mr-3 opacity-50 hover:opacity-100'
          title='Facebook'
        >
          <img src={require('assets/icons/media/facebook.svg').default} />
        </MuiLink>
        <MuiLink
          href='https://t.me/ookeenga_global'
          className='hover:text-white mr-3 opacity-50 hover:opacity-100'
          title='Telegram'
        >
          <img src={require('assets/icons/media/telegram.svg').default} />
        </MuiLink>
        <MuiLink
          href='https://discord.com/invite/B3SXUcrhC4'
          className='hover:text-white mr-3 opacity-50 hover:opacity-100'
          title='Discord'
        >
          <img src={require('assets/icons/media/discord.svg').default} />
        </MuiLink>
        <MuiLink
          href='https://www.youtube.com/channel/UCqQpViSkkAq_aFP3hj3GL8w'
          className='text-gray-200 hover:text-white mr-3 opacity-50 hover:opacity-100'
          title='Youtube'
        >
          <img src={require('assets/icons/media/youtube.svg').default} />
        </MuiLink>
      </div>

      <div className='font-bold mb-8' style={{ fontSize: '36px', color: '#F5E6D5' }}>
      Official Game Release on October 20th
      </div>
      <iframe
        className='w-full xl:h-[720px] md:h-[640px] h-[400px]'
        src='https://www.youtube.com/embed/XQqMKLmxwVA'
        title='YouTube video player'
        frameborder='0'
        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
        allowfullscreen
      />
      <div className='font-bold mb-8' style={{ fontSize: '36px' }}>
        Why Genesis Cocoons Are So Valuable
      </div>

      <p className='font-bold mb-4'>Genesis Cocoons are limited-edition with special pricing.</p>
      <p className='mb-4'>To start the journey in Ookeenga, player will need 3 Heroes.</p>
      <span className='mb-4'>
        In the INO, players can buy <span className='font-bold'>Genesis Cocoons</span> (NFT Heroes Box) to start the
        journey in Ookeenga. A cocoon in Ookeenga World contains a baby hero inside. The full-grown hero will break the
        cocoon and come out, ready for action. The Heroes in each Cocoon are unique and can help players to gain victory
        more easily.{' '}
      </span>
      <div
        className='w-full my-6 p-2 sm:p-4 md:p-6'
        style={{
          backgroundImage: `url(${require('assets/projects/ookeenga-INO/frame.png')})`,
          backgroundSize: '100% 100%',
        }}
      >
        <video
          src={
            'https://spores-marketplace-assets-dev.s3.ap-southeast-1.amazonaws.com/fac5fba0-a7ff-45bb-8d35-d647892b3ffb'
          }
          className='w-full rounded-lg'
          autoPlay
          loop
          muted
        />
      </div>

      <div className='font-bold mb-8' style={{ fontSize: '36px' }}>
        Gameplay
      </div>
      <img className='mb-12 w-full' src={require('assets/projects/ookeenga-INO/info8.png')} />

      <div className='font-bold mb-8' style={{ fontSize: '36px' }}>
        Unique Features
      </div>
      <div className='mb-6'>
        {[
          {
            title: 'Battle - and - Earn: ',
            info: `Fight intense battles against insect monsters (PvE) or other players in real time (PvP) and earn handsome rewards.`,
            img: require('assets/projects/ookeenga-INO/item1.png'),
          },
          {
            title: 'Breeding: ',
            info: `Breed two unique NFT Heroes to create a more powerful Hero - increase your army size!`,
            img: require('assets/projects/ookeenga-INO/item2.png'),
          },
          {
            title: 'Crafting: ',
            info: `Craft weapons using various resources earned in-game and boost your Heroes’ Power.`,
            img: require('assets/projects/ookeenga-INO/item3.png'),
          },
          {
            title: 'Land & Farm: ',
            info: `Own an unique piece of land in Ookeenga and enjoy generous passive income.`,
            img: require('assets/projects/ookeenga-INO/item4.png'),
          },
        ].map((item, index) => (
          <div key={index} className='flex p-6 items-center' style={{ color: '#F5E6D5' }}>
            <img src={item.img} />
            <div className='ml-6'>
              <span className='font-bold'>{item.title}</span>
              {item.info}
            </div>
          </div>
        ))}
      </div>

      <div className='font-bold mb-8' style={{ fontSize: '36px' }}>
        NFT Road map
      </div>
      <img className='mb-12 w-full' src={require('assets/projects/ookeenga-INO/roadmap.jpg')} />

      <div className='font-bold mb-8' style={{ fontSize: '36px' }}>
        Game Ecosystem
      </div>
      <img className='mb-12 w-full' src={require('assets/projects/ookeenga-INO/eco1.png')} />
      <img className='mb-12 w-full' src={require('assets/projects/ookeenga-INO/eco2.png')} />

      <div className='font-bold mb-8' style={{ fontSize: '36px' }}>
        Partners
      </div>
      <img className='mb-12 w-full' src={require('assets/projects/ookeenga-INO/partner.png')} />
    </div>
  );
};

export default OokeengaINOInventory;
