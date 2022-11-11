import { projectAlias } from 'data';
import { projectStatuses } from 'data/project-statuses';
import { BASE_API_URL } from 'env';

export const isTest = false;

export const hardCodeTime = isTest
  ? {
      open_time: '2022-09-20T17:00:00Z',
      close_time: '2022-09-29T17:00:00Z',
    }
  : null;
export const projectData = {
  name: 'Ookeenga',
  alias: projectAlias.ookeengaINO,
  whiteListUrl: 'https://forms.gle/JHZ7daTtGfMK7ASK6',
  apiBaseUrl: `${BASE_API_URL}/${projectAlias.ookeengaINO}`,
  addressReceiver: process.env.REACT_APP_ADDRESS_RECEIVER,
  image: `${process.env.PUBLIC_URL}/assets/imgs/projects/image.png`,
  background: `${process.env.PUBLIC_URL}/assets/imgs/projects/background.png`,
  infoBackground: `${process.env.PUBLIC_URL}/assets/imgs/projects/paperBackground.png`,
  banner: `${process.env.PUBLIC_URL}/assets/imgs/projects/banner.png`,
  bigBanner: `${process.env.PUBLIC_URL}/assets/imgs/projects/big-banner.png`,
  inventory: `${process.env.PUBLIC_URL}/assets/imgs/projects/inventory.png`,
  logo: `${process.env.PUBLIC_URL}/assets/imgs/projects/logo2.png`,
  textLogo: `${process.env.PUBLIC_URL}/assets/imgs/projects/text-logo.png`,
  discountBanner: `${process.env.PUBLIC_URL}/assets/imgs/projects/discount.png`,
  newBackground: `${process.env.PUBLIC_URL}/assets/imgs/projects/background2.png`,
  bigSale: `${process.env.PUBLIC_URL}/assets/imgs/projects/big-sale.png`,
  url: `/${projectAlias.ookeengaINO}`,
  saleType: 'Community Sale',
  acceptedTokens: ['BUSD', 'USDT'],
  totalRaise: 30000,
  meta: [
    {
      label: 'Quantity',
      value: 600,
      prefix: '',
    },
  ],
  starts: '04/20/2022 13:00 UTC',
  enable: true,
  status: projectStatuses.finished,
  tokenName: 'Ookeenga',
  tokenSymbol: 'OKG',
  totalSupply: 500000000,
  initialSupply: 7200000,
  initialMarketCap: 360000,
  tokenListing: 'TBA',
  registration_open_time: '2022-03-23T13:00:00Z',
  registration_close_time: '2022-04-07T13:00:00Z',
  allocation_round_time: '2022-04-20T13:00:00Z',
};
