<script lang="ts">
	import firebase from 'firebase/compat/app';
	import authStore from '../stores/authStore';
	import Logo from '../../static/logo.svg';

	const logout = async () => {
		await firebase.auth().signOut();
	};
</script>

<nav class="bg-white shadow-lg">
	<div class="max-w-6xl mx-auto px-4">
		<div class="flex justify-between">
			<div class="flex space-x-7">
				<div>
					<a href="/" class="flex items-center py-4 px-2">
						<img src={Logo} alt="Logo" class="h-8 w-8 mr-2" />
						<span class="font-semibold text-gray-500 text-lg">Shopy</span>
					</a>
				</div>
				<div class="hidden md:flex items-center space-x-1">
					<a
						href="/"
						class="py-4 px-2 text-green-500 font-semibold hover:text-green-500 transition duration-300 "
						>Home</a
					>
					<a
						href="/categories"
						class="py-4 px-2 text-gray-500 font-semibold hover:text-green-500 transition duration-300"
						>Categories</a
					>
					<a
						href="/contact"
						class="py-4 px-2 text-gray-500 font-semibold hover:text-green-500 transition duration-300"
						>Contact Us</a
					>
				</div>
			</div>
			<div class="hidden md:flex items-center space-x-3 ">
				{#if !$authStore.isLoggedIn}
					<a
						href="/login"
						class="py-2 px-2 font-medium text-gray-500 rounded hover:bg-green-500 hover:text-white transition duration-300"
						>Log In</a
					>
					<a
						href="/register"
						class="py-2 px-2 font-medium text-white bg-green-500 rounded hover:bg-green-400 transition duration-300"
						>Sign Up</a
					>
				{:else}
					<a href="/cart" class=" text-gray-600 border rounded-md p-2 hover:bg-gray-200 focus:outline-none">
						<svg
							class="h-5 w-5"
							fill="none"
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							viewBox="0 0 24 24"
							stroke="currentColor"
							><path
								d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
							/></svg
						>
					</a>
					<a
						href="/"
						class="py-2 px-2 font-medium text-white bg-green-500 rounded hover:bg-green-400 transition duration-300"
						on:click={logout}>Logout</a
					>
				{/if}
			</div>
		</div>
	</div>
</nav>
