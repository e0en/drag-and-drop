import App from './App.svelte';

const app = new App({
	target: document.body,
	props: {
		count: 5
	}
});

export default app;
