import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import inlangPlugin from "@inlang/sdk-js/adapter-sveltekit"

export default defineConfig({
	plugins: [inlangPlugin(),sveltekit()],
	optimizeDeps: {
		include: [
			'@inlang/sdk-js/runtime',
			'@inlang/sdk-js/adapter-sveltekit/shared',
			'@inlang/sdk-js/adapter-sveltekit/client/shared',
			'@inlang/sdk-js/adapter-sveltekit/client/reactive-workaround',
			'@inlang/sdk-js/detectors/client'
		],
	},
});
