<script>
  import { onDestroy } from 'svelte';

  export let preloading; // Currently preloading?

  let interval; // SetInterval handle
  let progress = 0; // Current progress on the loading bar, from 0 to 100
  let startTime; // When preloading started

  /**
   * Full speed up to 50%
   * Half speed from 50%-90%
   * 1/10 speed from 90%-95%
   * Slower from 95-97%
   * Slower still from 97-99%
   * Stop advancing at 95%
   */
  function slowdown() {
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
   * Show the loader when we start preloading.
   */
  $: if (!startTime && preloading) {
    startTime = Date.now();
    interval = setInterval(() => slowdown(), 10);
  }

  /**
   * Stop the loader when preloading is done. If preloading took >200ms, make
   * the loader momentarily go to 100 to show that the page is done loading.
   * Otherwise the page loaded quickly, like hitting the Back button.
   */
  $: if (startTime && !preloading) {
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

<!-- Show progress bar if loading has taken >50ms -->
{#if progress > 5}
  <svg height="1" width="100%">
    <line x1="0%" y1="0%" x2="{progress}%" y2="100%" style="stroke:red;stroke-width:1" />
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