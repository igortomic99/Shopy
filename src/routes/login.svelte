<script lang="ts">
	import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
	import authStore from '../stores/authStore';
	import { onDestroy } from 'svelte';
	import { goto } from '$app/navigation';
	let email = '';
	let password = '';

	const login = async () => {
		const auth = getAuth();
		await signInWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				const user = userCredential.user;
				authStore.set({user:user,isLoggedIn:true})
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
			});
	};
	/////////////////////////// RESITI VALIDACIJU ZA FORME SA ERROR KODOM ////////////////////////////
	///////////////////////////                                           ////////////////////////////
	///////////////////////////                                           ////////////////////////////

	const sub = authStore.subscribe(async (info) => {
		if (info.isLoggedIn) {
			await goto('/');
		}
	});
	onDestroy(() => {
		sub();
	});
</script>

<svelte:head>
  <script src="https://apis.google.com/js/platform.js" async defer></script>
</svelte:head>


<div class="flex items-center justify-center mt-20 ">
	<div class="w-full max-w-sm mx-auto">
		<form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
			<div class="mb-4">
				<h1 class="mb-8 text-3xl text-center">Login</h1>
				<input
					class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
					id="email"
					type="text"
					placeholder="Email"
					bind:value={email}
				/>
			</div>
			<div class="mb-6">
				<input
					class="shadow appearance-none border w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
					id="password"
					type="password"
					placeholder="******************"
					bind:value={password}
				/>
			</div>
			<div>
				<div class="g-signin2" data-onsuccess="onSignIn" data-theme="dark"></div>
			</div>
			<div class="flex items-center justify-between">
				<button
					class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
					type="button"
					on:click={login}
				>
					Sign In
				</button>
				<a
					class="inline-block align-baseline font-bold text-sm text-green-500 hover:text-green-800"
					href="/"
				>
					Forgot Password?
				</a>
			</div>
		</form>
		<p class="text-center text-gray-500 text-xs">&copy;2021 Shopy. All rights reserved.</p>
	</div>
</div>

