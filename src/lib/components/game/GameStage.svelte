<script lang="ts">
	import Track from './Track.svelte';
    import { parseTJA } from '../../engine/parseTJA.ts';
	import { onMount } from 'svelte';
    import { playMetronomeTick, playSongAudio } from '../../engine/audioEngine.ts';

    let level: songMetadata = {
        title: "",
        subtitle: "",
        bpm: 0,
        wave: "",
        image: "",
        songStart: {
            offset: 0,
            demoStart: 0
        },
        levels: []
    };

	onMount(async () => {
		level = await parseTJA("/songs/Liberation/Liberation.tja");
        playMetronomeTick(level.bpm);
        playSongAudio(level.wave);
	});

</script>

<div class="flex h-screen w-screen items-center justify-center absolute">
	<div class="Seigaiha absolute inset-0 z-0"></div>
    <div class="relative z-10 w-full h-full flex items-center justify-center">
        <Track />
    </div>
</div>

<style>
    .Seigaiha {
	background-color: rgb(240, 13, 13);
	background-image:
		radial-gradient(
			circle at 100% 150%,
				rgb(190, 0, 0) 24%,
				rgb(255, 120, 120) 24%,
				rgb(255, 120, 120) 28%,
				rgb(190, 0, 0) 28%,
				rgb(190, 0, 0) 36%,
				rgb(255, 120, 120) 36%,
				rgb(255, 120, 120) 40%,
			transparent 40%,
			transparent
		),
		radial-gradient(
			circle at 0 150%,
				rgb(190, 0, 0) 24%,
				rgb(255, 120, 120) 24%,
				rgb(255, 120, 120) 28%,
				rgb(190, 0, 0) 28%,
				rgb(190, 0, 0) 36%,
				rgb(255, 120, 120) 36%,
				rgb(255, 120, 120) 40%,
			transparent 40%,
			transparent
		),
		radial-gradient(
			circle at 50% 100%,
				rgb(255, 120, 120) 10%,
				rgb(190, 0, 0) 10%,
				rgb(190, 0, 0) 23%,
				rgb(255, 120, 120) 23%,
				rgb(255, 120, 120) 30%,
				rgb(190, 0, 0) 30%,
				rgb(190, 0, 0) 43%,
				rgb(255, 120, 120) 43%,
				rgb(255, 120, 120) 50%,
				rgb(190, 0, 0) 50%,
				rgb(190, 0, 0) 63%,
				rgb(255, 120, 120) 63%,
				rgb(255, 120, 120) 71%,
			transparent 71%,
			transparent
		),
		radial-gradient(
			circle at 100% 50%,
				rgb(255, 120, 120) 5%,
				rgb(190, 0, 0) 5%,
				rgb(190, 0, 0) 15%,
				rgb(255, 120, 120) 15%,
				rgb(255, 120, 120) 20%,
				rgb(190, 0, 0) 20%,
				rgb(190, 0, 0) 29%,
				rgb(255, 120, 120) 29%,
				rgb(255, 120, 120) 34%,
				rgb(190, 0, 0) 34%,
				rgb(190, 0, 0) 44%,
				rgb(255, 120, 120) 44%,
				rgb(255, 120, 120) 49%,
			transparent 49%,
			transparent
		),
		radial-gradient(
			circle at 0 50%,
				rgb(255, 120, 120) 5%,
				rgb(190, 0, 0) 5%,
				rgb(190, 0, 0) 15%,
				rgb(255, 120, 120) 15%,
				rgb(255, 120, 120) 20%,
				rgb(190, 0, 0) 20%,
				rgb(190, 0, 0) 29%,
				rgb(255, 120, 120) 29%,
				rgb(255, 120, 120) 34%,
				rgb(190, 0, 0) 34%,
				rgb(190, 0, 0) 44%,
				rgb(255, 120, 120) 44%,
				rgb(255, 120, 120) 49%,
			transparent 49%,
			transparent
		);
    }
</style>
