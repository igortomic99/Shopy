import { writable } from 'svelte/store';
interface Cart {
	userId: string;
	products: any[];
}
export const cart = writable<Cart>({ userId: '', products: [] });
