<script lang="ts">
  import Icon from '@iconify/svelte';
  import { Link } from 'svelte-routing';
  import { getContext } from 'svelte';
  import { ROUTER } from 'svelte-routing/src/contexts';

  import { ToastContainer, FlatToast } from 'svelte-toasts';

  import ConnectWallet from './ConnectWallet.svelte';

  $: routeStore =
    ROUTER && getContext(ROUTER) ? getContext(ROUTER).activeRoute : null;
  $: activePath =
    (routeStore && routeStore.subscribe && $routeStore && $routeStore.uri) ||
    '';
</script>

<div class="flex justify-between">
  <div class="flex items-center text-xl">
    <Link to="/">
      <span>💰</span>
      <span
        class="ml-1 font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-amber-600 to-amber-400 text-shadow"
      >
        RewardCoin
      </span>
    </Link>
  </div>

  <ConnectWallet />
</div>

<hr class="mt-4 border-gray-300 border-top" />

<ToastContainer placement="top-right" let:data>
  <FlatToast {data} />
</ToastContainer>

<style>
  :global(.toast-container ul) {
    background: white;
  }
</style>
