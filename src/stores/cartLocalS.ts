import { writable } from 'svelte/store';
interface Cart {
	userId: string;
	products: any[];
}

const storedCart = JSON.parse(localStorage.getItem('cart'));

export const cartL = writable<Cart>(storedCart);

if (typeof localStorage !== 'undefined') {
	cartL.subscribe((value) => localStorage.setItem('cart', JSON.stringify(value)));
}
