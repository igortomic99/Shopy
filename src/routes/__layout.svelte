<script context="module" lang="ts">
	import { initFirebase } from '../firebase';
	export async function load({ page, fetch, session, context }) {
		await initFirebase();
		return {
			props: {}
		};
	}
</script>

<script lang="ts">
	var exports = {};
	import NavigarionBar from '../components/NavigationBar.svelte';
	import { onMount } from 'svelte';
	import firebase from 'firebase/compat/app';
	import authStore from '../stores/authStore';
	import 'firebase/compat/auth';

	onMount(() => {
		firebase.auth().onAuthStateChanged((user) => {
			authStore.set({
				isLoggedIn: user !== null,
				user
			});
		});
	});
</script>

<svelte:head><title>Shopy</title></svelte:head>

<NavigarionBar />
<div class="p-8 max-w-6xl mx-auto">
	<slot />
</div>

<style>
	@tailwind base;
	@tailwind components;
	@tailwind utilities;
</style>
