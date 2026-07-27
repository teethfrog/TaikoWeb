<script lang="ts">
import { onMount } from 'svelte';
import { render } from '$lib/engine/renderNotes';
  let trackElement: HTMLDivElement;

  onMount(() => {
    render(trackElement);
  });
</script>

<div bind:this={trackElement} id="track" class="relative h-32 w-full border-t-4 border-b-4 border-black bg-gray-800 shadow-xl">
  <div class="track_hit absolute ml-10 h-full w-1 bg-gray-300 opacity-50"></div>
</div>