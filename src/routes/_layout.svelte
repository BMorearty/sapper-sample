<script>
	import Nav from '../components/Nav.svelte';
	import PageLoadingBar from '../components/PageLoadingBar.svelte';
	import { stores } from '@sapper/app';

	const { preloading } = stores();
	export let segment;
</script>

<style>
	main {
		position: relative;
		max-width: 56em;
		background-color: white;
		padding: 2em;
		margin: 0 auto;
		box-sizing: border-box;
	}
</style>

<PageLoadingBar loading="{$preloading}"/>

<Nav {segment}/>

<main>
	<slot></slot>
</main>