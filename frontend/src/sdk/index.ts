import { ethers } from 'ethers';
import { chainId, defaultEvmStores } from 'svelte-ethers-store';
import { get } from 'svelte/store';
import RewardCoin from './ABI/RewardCoin';

const wasWalletConnected = localStorage.getItem('walletConnected');

function getChainId() {
  const _chainId = get(chainId);

  return ethers.BigNumber.from(_chainId).toString();
}

function getContractAddress() {
  const addresses: { [chainId: string]: string } = {
    '31337': import.meta.env.SNOWPACK_PUBLIC_LOCALNET_FACTORY_ADDRESS,
    '97': import.meta.env.SNOWPACK_PUBLIC_BSC_TESTNET_FACTORY_ADDRESS
  };

  return addresses[getChainId()];
}

export async function init() {
  try {
    //@ts-ignore
    const provider = new ethers.providers.Web3Provider(window.ethereum, 'any');
    // Prompt user for account connections
    await provider.send('eth_requestAccounts', []);
    await defaultEvmStores.setProvider(provider);
  } catch (e) {
    localStorage.setItem('walletConnected', '');

    return;
  }

  //@ts-ignore
  if (defaultEvmStores.$signerAddress) {
    localStorage.setItem('walletConnected', 'y');
  } else {
    localStorage.setItem('walletConnected', '');
  }

  // //@ts-ignore
  if (!isValidChain(getChainId())) {
    await switchNet();
  }

  if (isValidChain(getChainId())) {
    console.log('Loading contract');
    defaultEvmStores.attachContract(
      'RewardCoin',
      getContractAddress(),
      JSON.stringify(RewardCoin)
    );
  }
}

if (wasWalletConnected) {
  init();
}

export function isValidChain(chainId: string) {
  if (!chainId) {
    return false;
  }

  const validChains = ['31337', '97'];

  return validChains.find(
    (_chainId) => _chainId === ethers.BigNumber.from(chainId).toString()
  );
}

export async function switchNet() {
  //@ts-ignore
  await window.ethereum.request({
    method: 'wallet_addEthereumChain',
    params: [
      {
        chainId: '0x61',

        chainName: 'Binance Smart Chain Testnet',

        rpcUrls: ['https://data-seed-prebsc-1-s1.binance.org:8545'],

        nativeCurrency: {
          name: 'Binance Coin',
          symbol: 'BNB',
          decimals: 18
        },

        blockExplorerUrls: ['https://bscscan.com/']
      }
    ]
  });

  //@ts-ignore
  await window.ethereum.request({
    method: 'wallet_switchEthereumChain',
    params: [{ chainId: '0x61' }]
  });

  if (!isValidChain(getChainId())) {
    window.location.reload();
  }
}
