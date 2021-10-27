<script>
	import { fade } from 'svelte/transition';
	import { categories } from '../stores/categoriesStore';
</script>
<div class="flex justify-center mt-5 mb-10 -ml-10">
	<span class="font-semibold text-gray-500 text-5xl">Categories</span>
</div>
<div class="grid gap-4 md:grid-cols-3 grid-cols-1 py-4">
	{#each $categories as category}
		<a
			href={`/category/${category}`}
			class="p-6 bg-gray-100 text-center rounded-md shadow-sm hover:shadow-md flex flex-col items-center"
			transition:fade
		>
			{category}</a
		>
	{/each}
</div>
