<script lang="ts">
  export let chainId: string;

  const coinNames = {
    '31337': 'TEST',
    '56': 'BNB',
    '97': 'BNB'
  };
</script>

{chainId && coinNames[chainId] ? coinNames[chainId] : '-'}
