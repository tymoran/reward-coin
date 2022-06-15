<script lang="ts">
  import Icon from '@iconify/svelte';
  import { setup } from '../stores/claims';
  import {
    connected,
    chainId,
    signerAddress,
    contracts
  } from 'svelte-ethers-store';
  import { init } from '../sdk';
  import Chain from './Chain.svelte';
  import Copyable from './Copyable.svelte';

  $: $contracts.RewardCoin && setup($contracts);
</script>

{#if $connected && $signerAddress}
  <div class="flex">
    <div class="p-2 mr-4 font-extrabold">
      <Chain chainId={$chainId} />
    </div>
    <div class="p-2 mr-4 font-extrabold">
      <Copyable
        iconClass="text-blue-500 opacity-75"
        text="{$signerAddress.slice(0, 5)}...{$signerAddress.slice(-3)}"
        textToCopy={$signerAddress}
      />
    </div>
  </div>
{:else}
  <button
    type="button"
    class="flex items-center px-3 py-2 text-sm font-medium text-center text-white rounded-lg bg-gradient-to-r from-blue-600 via-blue-700 to-blue-600 hover:bg-gradient-to-br focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800"
    on:click={init}
  >
    <Icon class="inline mr-2" icon="bx:wallet" /> Connect wallet
  </button>
{/if}
