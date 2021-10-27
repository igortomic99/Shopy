<script>
    import {fade} from 'svelte/transition'
    export let product;
</script>

<a href={`/product/${product.id}`} class="p-6 bg-gray-100 text-center rounded-md shadow-sm hover:shadow-md flex flex-col items-center" transition:fade>
    <img src={product.image} alt={product.title} class="h-40 w-40"/>
    <h2 class="text-2xl mb-0">{product.title}</h2>
    <h2 class="text-xl mb-0">{product.price}e</h2>
</a>