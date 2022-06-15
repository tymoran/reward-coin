<script lang="ts">
  import Icon from '@iconify/svelte';

  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  function dispatchLaunch() {
    dispatch('launch');
  }
</script>

<div class="flex flex-col items-center justify-center w-full h-screen hero">
  <div class="flex flex-col items-center mb-16 text-5xl">
    <span class="block my-4">💰</span>
    <span
      class="font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-amber-600 to-amber-300 text-shadow"
      >RewardCoin</span
    >
  </div>
  <div
    class="w-64 mb-4 text-xl font-medium text-center text-transparent bg-clip-text bg-gradient-to-br from-blue-600 via-blue-500 to-blue-700"
  >
    RewardCoin is a token rewarding early adopters.
  </div>

  <div class="mt-8 mb-20">
    <button
      on:click={dispatchLaunch}
      type="button"
      class="text-white flex items-center bg-gradient-to-r from-blue-500 via-blue-700 to-blue-600 hover:bg-gradient-to-br focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
    >
      <Icon class="inline mr-2 text-lg" icon="bx:atom" />
      <span>Enter app</span></button
    >
  </div>
  
  <div>&copy; 2022 Tymoran/0xTy.</div>
</div>

<style>
  .hero {
    position: relative;
  }

  .text-shadow {
    text-shadow: 0 1px 16px rgba(0, 0, 0, 0.05);
  }

  .text-shadow-md {
    text-shadow: 0 4px 8px rgba(0, 0, 0, 0.12), 0 2px 4px rgba(0, 0, 0, 0.08);
  }

  .text-shadow-lg {
    text-shadow: 0 15px 30px rgba(0, 0, 0, 0.11), 0 5px 15px rgba(0, 0, 0, 0.08);
  }

  .text-shadow-none {
    text-shadow: none;
  }
</style>
