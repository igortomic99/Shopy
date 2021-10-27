<script>
	import ProductCard from '../components/ProductCard.svelte';
	import { products } from '../stores/productStore';
	import Logo from '../../static/logo.svg';
	let searchTerm = '';
	let filteredProducts = [];
	$: {
		if (searchTerm) {
			filteredProducts = $products.filter((product) =>
				product.title.toLowerCase().includes(searchTerm.toLowerCase())
			);
		} else {
			filteredProducts = [...$products];
		}
	}
</script>

<div class="flex justify-center mt-5 mb-5 -ml-10">
	<img src={Logo} alt="Logo" class="mr-2 h-20 w-20 -mt-5" />
	<span class="font-semibold text-gray-500 text-5xl">Shopy</span>
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
