<script lang="ts">
  import Icon from '@iconify/svelte';

  export let text = '';
  export let textToCopy = '';
  export let iconClass = '';

  let copying: boolean;

  function copy() {
    if (navigator && navigator.clipboard && navigator.clipboard.writeText) {
      copying = true;
      setTimeout(() => {
        copying = false;
      }, 70);
      return navigator.clipboard.writeText(textToCopy ? textToCopy : text);
    }
  }
</script>

<div
  class="flex items-center cursor-pointer transition-opacity {copying
    ? 'opacity-25'
    : ''}"
  on:click={copy}
>
  <div>{text}</div>
  <Icon icon="bx:copy" class="inline ml-2 text-lg opacity-25 {iconClass}" />
</div>
