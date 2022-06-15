<script lang="ts">
  export let chainId: string;

  const chainNames = {
    '31337': 'Localnet',
    '97': 'BSC Testnet'
  };
</script>

{chainId && chainNames[chainId] ? chainNames[chainId] : '⚠ BSC Testnet only'}
