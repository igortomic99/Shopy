<script context="module">
	export async function load({ page }) {
		const id = page.params.id;
		const url = `https://fakestoreapi.com/products/${id}`;
		const res = await fetch(url);
		const product = await res.json();
		return { props: { product } };
	}
</script>

<script lang="ts">
	import { cart } from '../../stores/cartStore';
	import { id } from '../../stores/idStore';
	import { get } from 'svelte/store';
	import authStore from '../../stores/authStore';
	import 'firebase/compat/firestore';
	import firebase from 'firebase/compat/app';
	import { collection, addDoc, doc, updateDoc } from 'firebase/firestore';
	import { cartL } from '../../stores/cartLocalS';

	let cartID = get(id);
	const db = firebase.firestore();
	const user = get(authStore);
	export let product;
	let count = 1;
	const handleIncrease = () => {
		count += 1;
	};
	const handleDecrease = () => {
		if (count != 1) {
			count -= 1;
		}
	};
	let added = false;
	const cartItems = get(cart);
	const addToCart = () => {
		cart.update((p) => {
			return {
				userId: user.user.uid,
				products: [
					...p.products,
					{
						product,
						productCount: count
					}
				]
			};
		});
		added = true;
		if (cartItems.userId !== '') {
			const update = db.collection('carts').doc(cartID).update({
				cartItems
			});
		} else {
			addToDB();
		}
		persistCart();
	};
	const addToDB = async () => {
		const docRef = await addDoc(collection(db, 'carts'), {
			cartItems
		});
		id.set(docRef.id);
	};
	const persistCart = () => {
		const ci = get(cart);
		cartL.set(ci);
	};
</script>

{#if added}
	<div class="bg-green-900 text-center py-4 lg:px-4">
		<div
			class="p-2 bg-gree-800 items-center text-indigo-100 leading-none lg:rounded-full flex lg:inline-flex"
			role="alert"
		>
			<span class="flex rounded-full bg-green-500 uppercase px-2 py-1 text-xs font-bold mr-3"
				>Cool!</span
			>
			<span class="font-semibold mr-2 text-left flex-auto">You added item to your cart</span>
			<a href="/cart">
				<svg
					class="fill-current opacity-75 h-4 w-4"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 20 20"
					><path
						d="M12.95 10.707l.707-.707L8 4.343 6.586 5.757 10.828 10l-4.242 4.243L8 15.657l4.95-4.95z"
					/></svg
				>
			</a>
		</div>
	</div>
{/if}
<div class="bg-white">
	<main class="my-8">
		<div class="container mx-auto px-6">
			<div class="md:flex md:items-center">
				<div class="w-full h-64 md:w-1/2 lg:h-96">
					<img
						class="h-full w-full rounded-md object-cover max-w-lg mx-auto shadow-md"
						src={product.image}
						alt={product.title}
					/>
				</div>
				<div class="w-full max-w-lg mx-auto mt-5 md:ml-8 md:mt-0 md:w-1/2">
					<h3 class="text-gray-700 uppercase text-lg">{product.title}r</h3>
					<span class="text-gray-500 mt-3">{product.price}e</span>
					<hr class="my-3" />
					<div class="mt-2">
						<label class="text-gray-700 text-sm" for="count">Count:</label>
						<div class="flex items-center mt-1">
							<button
								on:click={handleIncrease}
								class="text-gray-500 focus:outline-none focus:text-gray-600"
							>
								<svg
									class="h-5 w-5"
									fill="none"
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									viewBox="0 0 24 24"
									stroke="currentColor"
									><path d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg
								>
							</button>
							<span class="text-gray-700 text-lg mx-2">{count}</span>
							<button
								on:click={handleDecrease}
								class="text-gray-500 focus:outline-none focus:text-gray-600"
							>
								<svg
									class="h-5 w-5"
									fill="none"
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									viewBox="0 0 24 24"
									stroke="currentColor"><path d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg
								>
							</button>
						</div>
					</div>
					<div class="mt-3">
						<label class="text-gray-700 text-sm" for="count">Color:</label>
						<div class="flex items-center mt-1">
							<button
								class="h-5 w-5 rounded-full bg-blue-600 border-2 border-blue-200 mr-2 focus:outline-none"
							/>
							<button class="h-5 w-5 rounded-full bg-teal-600 mr-2 focus:outline-none" />
							<button class="h-5 w-5 rounded-full bg-pink-600 mr-2 focus:outline-none" />
						</div>
					</div>
					<div class="flex items-center mt-6">
						<button
							class="px-8 py-2 bg-indigo-600 text-white text-sm font-medium rounded hover:bg-indigo-500 focus:outline-none focus:bg-indigo-500"
							>Order Now</button
						>
						<button
							class="mx-2 text-gray-600 border rounded-md p-2 hover:bg-gray-200 focus:outline-none"
							on:click={addToCart}
						>
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
						</button>
					</div>
				</div>
			</div>
			<div class="mt-16">
				<h3 class="text-gray-600 text-2xl font-medium">More Products</h3>
				<div class="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-6">
					<div class="w-full max-w-sm mx-auto rounded-md shadow-md overflow-hidden">
						<div
							class="flex items-end justify-end h-56 w-full bg-cover"
							style="background-image: url('https://images.unsplash.com/photo-1563170351-be82bc888aa4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=376&q=80')"
						>
							<button
								on:click={addToCart}
								class="p-2 rounded-full bg-blue-600 text-white mx-5 -mb-4 hover:bg-blue-500 focus:outline-none focus:bg-blue-500"
							>
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
							</button>
						</div>
						<div class="px-5 py-3">
							<h3 class="text-gray-700 uppercase">Chanel</h3>
							<span class="text-gray-500 mt-2">$12</span>
						</div>
					</div>
					<div class="w-full max-w-sm mx-auto rounded-md shadow-md overflow-hidden">
						<div
							class="flex items-end justify-end h-56 w-full bg-cover"
							style="background-image: url('https://images.unsplash.com/photo-1544441893-675973e31985?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80')"
						>
							<button
								class="p-2 rounded-full bg-blue-600 text-white mx-5 -mb-4 hover:bg-blue-500 focus:outline-none focus:bg-blue-500"
							>
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
							</button>
						</div>
						<div class="px-5 py-3">
							<h3 class="text-gray-700 uppercase">Man Mix</h3>
							<span class="text-gray-500 mt-2">$12</span>
						</div>
					</div>
					<div class="w-full max-w-sm mx-auto rounded-md shadow-md overflow-hidden">
						<div
							class="flex items-end justify-end h-56 w-full bg-cover"
							style="background-image: url('https://images.unsplash.com/photo-1532667449560-72a95c8d381b?ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80')"
						>
							<button
								class="p-2 rounded-full bg-blue-600 text-white mx-5 -mb-4 hover:bg-blue-500 focus:outline-none focus:bg-blue-500"
							>
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
							</button>
						</div>
						<div class="px-5 py-3">
							<h3 class="text-gray-700 uppercase">Classic watch</h3>
							<span class="text-gray-500 mt-2">$12</span>
						</div>
					</div>
					<div class="w-full max-w-sm mx-auto rounded-md shadow-md overflow-hidden">
						<div
							class="flex items-end justify-end h-56 w-full bg-cover"
							style="background-image: url('https://images.unsplash.com/photo-1590664863685-a99ef05e9f61?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=345&q=80')"
						>
							<button
								class="p-2 rounded-full bg-blue-600 text-white mx-5 -mb-4 hover:bg-blue-500 focus:outline-none focus:bg-blue-500"
							>
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
							</button>
						</div>
						<div class="px-5 py-3">
							<h3 class="text-gray-700 uppercase">woman mix</h3>
							<span class="text-gray-500 mt-2">$12</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	</main>
</div>
