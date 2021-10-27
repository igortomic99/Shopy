<script>
	import { fade } from 'svelte/transition';
	import { categories } from '../stores/categoriesStore';
</script>

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
