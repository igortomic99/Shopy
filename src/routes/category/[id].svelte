<script context="module">
	export async function load({ page }) {
		const id = page.params.id;
		const url = `https://fakestoreapi.com/products/category/${id}`;
		const res = await fetch(url);
		const category = await res.json();
		return { props: { category, id } };
	}
</script>

<script>
	import { fade } from 'svelte/transition';
	import ProductCard from '../../components/ProductCard.svelte';
	export let category;
	export let id;
	let searchTerm = '';
	let filteredProducts = [];
	$: {
		if (searchTerm) {
			filteredProducts = category.filter((product) =>
				product.title.toLowerCase().includes(searchTerm.toLowerCase())
			);
		} else {
			filteredProducts = [...category];
		}
	}
</script>

<div class="flex justify-center mt-5 mb-10 -ml-10">
	<span class="font-semibold text-gray-500 text-5xl">{id}</span>
</div>
<input
	class="w-full rounded-md text-md p-2 border-2 border-gray-200 mb-5"
	type="text"
	placeholder="Search product"
	bind:value={searchTerm}
/>
<div class="grid gap-4 md:grid-cols-3 grid-cols-1 py-4">
	{#each filteredProducts as product}
		<ProductCard {product} />
	{/each}
</div>
