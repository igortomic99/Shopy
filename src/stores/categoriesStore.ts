import { writable } from 'svelte/store';

export const categories = writable([]);

const fetchCategories = async () => {
	const url = 'https://fakestoreapi.com/products/categories';
	const res = await fetch(url);
	const data = await res.json();
	const loadedCategories = data.map((category) => {
		return category;
	});
	categories.set(loadedCategories);
};

fetchCategories();