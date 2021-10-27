<script>
	import { fade } from 'svelte/transition';
	export let product;
	export let count;
</script>

<a
	href={`/product/${product.id}`}
	class="p-6 bg-gray-100 rounded-md shadow-sm hover:shadow-md flex transition:fade"
>
	<img src={product.image} alt={product.title} class="h-14 w-14" />
	<h2 class="text-lg mb-0 mt-3 ml-3 mr-40">{product.title}</h2>
	<h2 class="text-md mb-0 mt-3 ml-96">{product.price}e</h2>
	<h2 class="text-md mb-0 ml-11 mt-3">{count}</h2>
</a>
