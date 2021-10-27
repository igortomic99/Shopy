import { writable } from 'svelte/store';

export const products = writable([]);

const fetchProducts = async () => {
	const url = 'https://fakestoreapi.com/products?limit=100';
	const res = await fetch(url);
	const data = await res.json();
	const loadedProduct = data.map((product) => {
		return product;
	});
	products.set(loadedProduct);
};

fetchProducts();
