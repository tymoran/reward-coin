import { contracts, signerAddress } from 'svelte-ethers-store';
import { get, writable } from 'svelte/store';

export const reward = writable<number>(0);
export const loading = writable<boolean>(false);

export async function update() {
  loading.set(true);
  try {
    reward.set(parseInt(await (get(contracts).RewardCoin.rewardOf(get(signerAddress)))));
  } catch(e) {
    console.error('Failed to update rewards', e);
  }
  loading.set(false);
}


export async function claim() {
  loading.set(true);
  try {
    await (get(contracts).RewardCoin.claim(get(reward)));
  } catch(e) {
    console.error('Failed to claim rewards', e);
  }
  await update();
  loading.set(false);
}