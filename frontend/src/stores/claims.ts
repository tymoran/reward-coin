import type { Contract } from 'ethers';
import { writable } from 'svelte/store';

const claims = writable<any>([]);

let subscribed = false;

export async function setup(contracts: { [key: string]: Contract }) {
  if (!subscribed && contracts.RewardCoin) {
    subscribed = true;
    contracts.RewardCoin.on(
      'Claim',
      (address, amount) => {
        claims.update((data) => {
          return [
            ...data,
            {
              type: 'erc20',
              address,
              amount
            }
          ];
        });
      }
    );
  }

  if (subscribed && !contracts.RewardCoin) {
    subscribed = false;
  }
}

export default claims;
