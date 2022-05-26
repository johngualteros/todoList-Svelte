import {writable} from 'svelte/store';
export let count= writable(0);
export let darkmode= writable(false);