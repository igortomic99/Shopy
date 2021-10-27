<script lang="ts">
	import { get } from 'svelte/store';
	import { cartL } from '../stores/cartLocalS';
	import CartItemCard from '../components/CartItemCard.svelte';
	import Logo from '../../static/logo.svg';
	import { onMount } from 'svelte';
	import authStore from '../stores/authStore';

	const user = get(authStore);
	onMount(() => {
		loadPrice();
	});
	let cartItems = get(cartL);
	let totalPrice = 0;
	const loadPrice = () => {
		cartItems.products.forEach((p) => {
			totalPrice = totalPrice + p.productCount * parseFloat(p.product.price);
		});
	};
	const removeItem = ({ id }) => {
		const prods = cartItems.products;
		const filtered = prods.filter((p) => p.product.id !== id);
		if (user.isLoggedIn) {
			cartL.update((p) => {
				totalPrice = totalPrice - parseFloat(p.products[id]);
				console.log(totalPrice)
				return {
					userId: user.user.uid,
					products: filtered
				};
			});
		};
		cartItems = get(cartL);
	};
</script>

<div class="flex justify-center mt-5 mb-5 -ml-2">
	<span class="font-semibold text-gray-500 text-5xl mr-3">Your</span>
	<img src={Logo} alt="Logo" class="mr-2 h-20 w-20 -mt-5" />
	<span class="font-semibold text-gray-500 text-5xl">Shopy cart</span>
</div>
{#if cartItems != undefined}
	<div class="grid gap-4 md:grid-cols-1 grid-cols-1 py-4">
		{#each cartItems.products as product}
			<CartItemCard product={product.product} count={product.productCount} />
			<button
				on:click={() => {
					removeItem({ id: product.product.id });
				}}
				class="mb-0 ml-5 -mt-5"
				><svg
					width="16"
					height="16"
					viewBox="0 0 16 16"
					xmlns="http://www.w3.org/2000/svg"
					fill="currentColor"
					><path
						fill-rule="evenodd"
						clip-rule="evenodd"
						d="M7.116 8l-4.558 4.558.884.884L8 8.884l4.558 4.558.884-.884L8.884 8l4.558-4.558-.884-.884L8 7.116 3.442 2.558l-.884.884L7.116 8z"
					/></svg
				></button
			>
		{/each}
	</div>
	<div>
		<h2 class="text-lg mt-5 float-right">Total price: {totalPrice}e</h2>
	</div>
{:else}
	<h2 class="text-lg mt-10 text-center">You dont have any items in cart</h2>
{/if}
