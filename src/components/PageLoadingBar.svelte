<script>
  import { onDestroy } from 'svelte';

  export let loading; // Boolean: currently loading?
  export let color = 'red'; // E.g., 'blue' or '#3399ff'

  let interval; // SetInterval handle
  let progress = 0; // Current progress on the loading bar, from 0 to 100
  let startTime; // When loading started

  /**
   * Start out fast and get progressively slower. Stop at 99%.
   */
  function advance() {
    if (progress < 50) {
      progress += 0.5;
    } else if (progress < 90) {
      progress += 0.25;
    } else if (progress < 95) {
      progress += 0.1;
    } else if (progress < 97) {
      progress += 0.01;
    } else if (progress < 99) {
      progress += 0.005;
    }
  }

  /**
   * Show the loader when we start loading.
   */
  $: if (!startTime && loading) {
    startTime = Date.now();
    interval = setInterval(() => advance(), 10);
  }

  /**
   * Stop the loader when loading is done. If loading took >200ms, make
   * the loader momentarily go to 100 to show that the page is done loading.
   * Otherwise the page loaded quickly, like hitting the Back button.
   */
  $: if (startTime && !loading) {
    clearInterval(interval);
    interval = undefined;
    if (Date.now() - startTime > 200) {
      progress = 100;
      setTimeout(() => { progress = 0; }, 500);
    } else {
      progress = 0;
    }
    startTime = undefined;
  }

  onDestroy(() => {
    if (interval) {
      clearInterval(interval);
    }
  });
</script>

<!-- Show progress bar if loading has taken >100ms -->
{#if progress > 5}
  <svg height="1" width="100%">
    <line x1="0%" y1="0%" x2="{progress}%" y2="100%" style="stroke:{color};stroke-width:1" />
  </svg>
{/if}

<style>
  svg {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;
  }
</style>