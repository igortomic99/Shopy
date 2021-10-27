import { writable } from "svelte/store";
import type firebase from "firebase/compat/app";

const authStore = writable<{
  isLoggedIn: boolean;
  user?: firebase.UserInfo;
}>({
  isLoggedIn: false,
});

export default {
  subscribe: authStore.subscribe,
  set: authStore.set,
};