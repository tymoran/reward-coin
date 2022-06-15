<script>
  import { ethers } from 'ethers';
  import { isValidChain } from '../sdk';

  import { chainId, connected, signerAddress } from 'svelte-ethers-store';
  import ConnectWallet from './ConnectWallet.svelte';
</script>

{#if $connected && $signerAddress && isValidChain($chainId)}
  <slot />
{:else if $connected && $signerAddress && !isValidChain($chainId)}
  Switch to BSC
{:else}
  <ConnectWallet />
{/if}
