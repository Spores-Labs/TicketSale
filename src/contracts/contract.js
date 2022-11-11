import Web3 from 'web3';
import { erc20Abi, erc721Abi, marketAbi } from './abis';

export const web3 = new Web3(window.ethereum);
export const MAX_INT = '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff';

export const erc20Contract = (address) => new web3.eth.Contract(erc20Abi, address);
export const erc721Contract = (address) => new web3.eth.Contract(erc721Abi, address);
export const marketContract = (address) => new web3.eth.Contract(marketAbi, address);
