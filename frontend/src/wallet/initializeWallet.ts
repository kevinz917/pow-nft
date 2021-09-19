import { ethers } from 'ethers';
import { InjectedConnector } from '@web3-react/injected-connector';
import { Web3Provider } from '@ethersproject/providers';

declare global {
  interface Window {
    ethereum: any;
  }
}

enum ConnectorNames {
  Injected = 'Injected',
  Network = 'Network',
  WalletConnect = 'WalletConnect',
  WalletLink = 'WalletLink',
  Ledger = 'Ledger',
  Trezor = 'Trezor',
  Lattice = 'Lattice',
  Frame = 'Frame',
  Authereum = 'Authereum',
  Fortmatic = 'Fortmatic',
  Magic = 'Magic',
  Portis = 'Portis',
  Torus = 'Torus',
}

export const injected = new InjectedConnector({ supportedChainIds: [1337] });

export const loadWeb3 = async (): Promise<void> => {
  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum, 'any');

    // Prompt user for account connections
    await provider.send('eth_requestAccounts', []);

    const signer = provider.getSigner();

    const address = await signer.getAddress();
    const balance = await signer.getBalance(); // or provider.getBalance(address)
    console.log(address, balance);
  } catch (err) {
    console.log(err);
  }
};

export function getLibrary(provider: any): Web3Provider {
  const library = new Web3Provider(provider);
  library.pollingInterval = 12000;
  return library;
}

// import { SupportedChainId } from '../constants/chains'

// const NETWORK_POLLING_INTERVALS: { [chainId: number]: number } = {
//   [SupportedChainId.ARBITRUM_ONE]: ms`1s`,
//   [SupportedChainId.ARBITRUM_RINKEBY]: ms`1s`,
//   [SupportedChainId.OPTIMISM]: ms`1s`,
//   [SupportedChainId.OPTIMISTIC_KOVAN]: ms`1s`,
// }
