import { projectStatuses } from 'data/project-statuses';
import { projectAlias } from 'data';

export const wizardiaProjectData = {
  name: 'Wizardia',
  alias: projectAlias.wizardia,
  banner: process.env.PUBLIC_URL + `/assets/imgs/projects/${projectAlias.wizardia}/banner.png`,
  logo: process.env.PUBLIC_URL + `/assets/imgs/projects/${projectAlias.wizardia}/logo.png`,
  textLogo: process.env.PUBLIC_URL + `/assets/imgs/projects/${projectAlias.wizardia}/text-logo.png`,
  url: `/${projectAlias.wizardia}`,
  saleType: 'IDO',
  // saleStatus: 'Sold out',
  acceptedTokens: ['BUSD', 'USDT'],
  totalRaise: 30000,
  meta: [
    {
      label: 'Price',
      value: 0.12,
      prefix: '$',
    },
  ],
  starts: '03/15/2022 13:00 UTC',
  enable: false,
  status: projectStatuses.completed,
};

export const bitHotelProjectData = {
  name: 'Bit Hotel',
  banner: process.env.PUBLIC_URL + '/assets/imgs/projects/bit-hotel/banner.png',
  logo: process.env.PUBLIC_URL + '/assets/imgs/projects/bit-hotel/logo.png',
  textLogo: process.env.PUBLIC_URL + '/assets/imgs/projects/bit-hotel/text-logo.png',
  // url: '/bit-hotel',
  saleType: 'IRO',
  // saleStatus: 'Sold out',
  acceptedTokens: ['BUSD'],
  totalRaise: 123400,
  meta: [
    {
      label: 'Quantity',
      value: 96,
    },
  ],
  starts: '02/15/2022 13:00 UTC',
  enable: false,
  status: projectStatuses.completed,
};

export const animaliaProjectData = {
  name: 'Animalia',
  banner: process.env.PUBLIC_URL + '/assets/imgs/projects/animalia/banner.png',
  logo: process.env.PUBLIC_URL + '/assets/imgs/projects/animalia/logo.png',
  textLogo: process.env.PUBLIC_URL + '/assets/imgs/projects/animalia/text-logo.png',
  // url: '/animalia',
  saleType: 'INO',
  // saleStatus: 'Sold out',
  acceptedTokens: ['BUSD', 'USDC', 'USDT'],
  totalRaise: 14790,
  meta: [
    {
      label: 'Quantity',
      value: 150,
    },
  ],
  starts: '01/03/2022 03:00 UTC',
  enable: false,
  status: projectStatuses.completed,
};

export const plushieDreadfulsProjectData = {
  name: 'Plushie Dreadfuls',
  banner: process.env.PUBLIC_URL + '/assets/imgs/projects/plushie-dreadfuls/banner.png',
  logo: process.env.PUBLIC_URL + '/assets/imgs/projects/plushie-dreadfuls/logo.png',
  textLogo: process.env.PUBLIC_URL + '/assets/imgs/projects/plushie-dreadfuls/text-logo.png',
  // url: '/plushie-dreadfuls',
  saleType: 'Presale',
  // saleStatus: 'Sold out',
  acceptedTokens: ['ETH', 'SPO'],
  totalRaise: 12635,
  meta: [
    {
      label: 'Quantity',
      value: 500,
    },
  ],
  starts: '12/17/2021 02:00 UTC',
  enable: false,
  status: projectStatuses.completed,
};

export const superBoomiProjectData = {
  name: 'SUPER BOOMi',
  banner: process.env.PUBLIC_URL + '/assets/imgs/projects/super-boomi/banner.png',
  logo: process.env.PUBLIC_URL + '/assets/imgs/projects/super-boomi/logo.png',
  textLogo: process.env.PUBLIC_URL + '/assets/imgs/projects/super-boomi/text-logo.png',
  // url: '/super-boomi',
  saleType: 'Presale',
  // saleStatus: 'Sold out',
  acceptedTokens: ['USDT', 'USDC', 'BUSD', 'SPO'],
  totalRaise: 58475,
  meta: [
    {
      label: 'Quantity',
      value: 2000,
    },
  ],
  starts: '11/26/2021 13:00 UTC',
  enable: false,
  status: projectStatuses.completed,
};

export const polkaFantasyLandProjectData = {
  name: 'PolkaFantasy Land',
  banner: process.env.PUBLIC_URL + '/assets/imgs/projects/polka-fantasy-land/banner.png',
  logo: process.env.PUBLIC_URL + '/assets/imgs/projects/polka-fantasy-land/logo.png',
  textLogo: process.env.PUBLIC_URL + '/assets/imgs/projects/polka-fantasy-land/text-logo.png',
  // url: '/polka-fantasy-land',
  saleType: 'Presale',
  // saleStatus: 'Sold out',
  acceptedTokens: ['USDT', 'USDC'],
  totalRaise: 162900,
  meta: [
    {
      label: 'Quantity',
      value: 445,
    },
  ],
  starts: '11/11/2021 02:00 UTC',
  enable: false,
  status: projectStatuses.completed,
};

export const netVRkTransportProjectData = {
  name: 'NetVRk Transport',
  banner: process.env.PUBLIC_URL + '/assets/imgs/projects/netvrk-transport/banner.png',
  logo: process.env.PUBLIC_URL + '/assets/imgs/projects/netvrk-transport/logo.png',
  textLogo: process.env.PUBLIC_URL + '/assets/imgs/projects/netvrk-transport/text-logo.png',
  // url: '/netvrk-transport',
  saleType: 'Presale',
  // saleStatus: 'Sold out',
  acceptedTokens: ['USDT', 'USDC'],
  totalRaise: 1341000,
  meta: [
    {
      label: 'Quantity',
      value: 980,
    },
  ],
  starts: '10/21/2021 02:00 UTC',
  enable: false,
  status: projectStatuses.completed,
};

export const netVRkLandProjectData = {
  name: 'NetVRk Land',
  banner: process.env.PUBLIC_URL + '/assets/imgs/projects/netvrk-land/banner.png',
  logo: process.env.PUBLIC_URL + '/assets/imgs/projects/netvrk-land/logo.png',
  textLogo: process.env.PUBLIC_URL + '/assets/imgs/projects/netvrk-land/text-logo.png',
  // url: '/netvrk-Land',
  saleType: 'Presale',
  // saleStatus: 'Sold out',
  acceptedTokens: ['USDT', 'USDC'],
  totalRaise: 826500,
  meta: [
    {
      label: 'Quantity',
      value: 560,
    },
  ],
  starts: '09/29/2021 02:00 UTC',
  enable: false,
  status: projectStatuses.completed,
};

export const dinoXLandProjectData = {
  name: 'DinoX Land',
  banner: process.env.PUBLIC_URL + '/assets/imgs/projects/dinoX-land/banner.svg',
  logo: process.env.PUBLIC_URL + '/assets/imgs/projects/dinoX-land/logo.svg',
  textLogo: process.env.PUBLIC_URL + '/assets/imgs/projects/dinoX-land/text-logo.svg',
  // url: '/netvrk-Land',
  saleType: 'Presale',
  // saleStatus: 'Sold out',
  acceptedTokens: ['USDT', 'USDC', 'BUSD'],
  totalRaise: 18480,
  meta: [
    {
      label: 'Quantity',
      value: 325,
    },
  ],
  starts: '03/03/2022 13:00 UTC',
  enable: false,
  status: projectStatuses.completed,
};
