<script lang="ts">
  import { Router, navigate, Route } from 'svelte-routing';

  import Home from './pages/Home.svelte';
  import Rewards from './pages/Rewards.svelte';

  import './Tailwind.svelte';

  export let url = '';
</script>

<div class="w-full h-screen p-4">
  <Router {url}>
    <Route path="/rewards" component={Rewards} />
    <Route path="*">
      <Home on:launch={() => navigate('/rewards')} />
    </Route>
  </Router>
</div>

<style>
  :global(body) {
    background-image: linear-gradient(
      to top,
      #f3e7e9 0%,
      #e3eeff 99%,
      #e3eeff 100%
    );
    background-attachment: fixed;
  }
</style>
