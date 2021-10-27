<script lang="ts">
	import { goto } from '$app/navigation';

	import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
	import { onDestroy } from 'svelte';
	import authStore from '../stores/authStore';
	let email = '';
	let password = '';
	const register = async () => {
		const auth = getAuth();
		await createUserWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				const user = userCredential.user;
				authStore.set({ user: user, isLoggedIn: true });
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

<div class="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2 mt-20">
	<div class="bg-white px-6 py-8 rounded shadow-md text-black w-full">
		<h1 class="mb-8 text-3xl text-center">Register</h1>
		<input
			type="text"
			class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline p-3 mb-4"
			name="fullname"
			placeholder="Full Name"
		/>

		<input
			type="text"
			class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outlinep-3 mb-4"
			name="email"
			placeholder="Email"
			bind:value={email}
		/>

		<input
			type="password"
			class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline p-3 mb-4"
			name="password"
			placeholder="Password"
			bind:value={password}
		/>
		<input
			type="password"
			class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline p-3 mb-4"
			name="confirm_password"
			placeholder="Confirm Password"
		/>

		<button
			type="submit"
			class="w-full text-center py-3 rounded bg-green-500 text-white hover:bg-green-700 focus:outline-none my-1"
			on:click={register}>Create Account</button
		>

		<div class="text-center text-sm text-grey-dark mt-4">
			By signing up, you agree to the
			<a class="no-underline border-b border-grey-dark text-green-500" href="/">
				Terms of Service
			</a>
			and
			<a class="no-underline border-b border-grey-dark text-green-500" href="/"> Privacy Policy </a>
		</div>
	</div>
	<div class="mt-6">
		Already have an account?
		<a class="no-underline border-b border-blue text-blue text-green-500" href="../login/">
			Log in
		</a>.
	</div>
</div>
