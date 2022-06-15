<script lang="ts">
  import { ethers } from 'ethers';
  import Icon from '@iconify/svelte';
  import {onMount} from 'svelte';

  import {
    contracts
  } from 'svelte-ethers-store';
  import claims from '../stores/claims';
  import {update, loading, reward, claim} from '../stores/reward';
  import Copyable from '../components/Copyable.svelte';
  import Nav from '../components/Nav.svelte';

  $: $contracts.RewardCoin && update();
</script>

<div class="flex flex-col items-center">
  <div class="w-full max-w-4xl">
    <Nav />
  </div>


  <div class="mt-8 text-4xl font-extrabold text-center">🌟 Claim your rewards</div>

  <div class="w-48 p-4 mt-8 text-center bg-white rounded-lg shadow-lg min-h-24">
    <div class="text-xl font-bold">My rewards</div>

    <div class="flex flex-col items-center">
      {#if $loading}
        Loading ...
      {:else}
        {#if $reward}
          <div>{$reward} RWRD</div>
          <button
              type="button"
              class="flex items-center px-3 py-2 mt-4 text-sm font-medium text-center text-white rounded-lg bg-gradient-to-r from-orange-400 via-red-500 to-pink-500 group-hover:from-white group-hover:via-white group-hover:to-white focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800"
              on:click={claim}
            >
              <span class="group-hover:text-red-500"
                ><Icon icon="bx:money" class="inline mr-2 text-xl" />
                  Claim all</span
              >
            </button>
        {:else}
          You have no rewards.
        {/if}
      {/if}
    </div>
  </div>

  <div class="w-24 mt-8 border-b border-gray-300 border-1" />

  <div class="mt-8 mb-4 text-4xl font-extrabold text-center">📜 Past claims</div>

  <div class="flex flex-col mt-8">
    {#each $claims as claim}
      <div
        class="flex flex-row justify-between p-4 mb-4 bg-white rounded-lg shadow"
      >
        <div>
          <div class="text-gray-600 group-hover:text-white">
            {claim.amount} RWRD
          </div>
        </div>

        <div class="flex items-center ml-16">
          <Copyable text={claim.address} />
        </div>
      </div>
    {/each}
  </div>
</div>
