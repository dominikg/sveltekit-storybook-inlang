# reproduction

```shell
pnpm i
pnpm storybook
```

loads storybook but rendering the story shows an error 
```shell
Error: Cannot destructure property 'i' of 'getRuntimeFromContext(...)' as it is undefined.
  at init (/node_modules/.cache/sb-vite/deps/chunk-4IM3CZD6.js?v=8d286565:2166:23))
  at new InlangWelcome (/src/routes/InlangWelcome.svelte:91:3))
  at createProxiedComponent (/node_modules/.pnpm/svelte-hmr@0.15.3_svelte@4.2.0/node_modules/svelte-hmr/runtime/svelte-hooks.js?v=8d286565:341:9))
  at new ProxyComponent (/node_modules/.pnpm/svelte-hmr@0.15.3_svelte@4.2.0/node_modules/svelte-hmr/runtime/proxy.js?v=8d286565:242:7))
  at new Proxy<InlangWelcome> (/node_modules/.pnpm/svelte-hmr@0.15.3_svelte@4.2.0/node_modules/svelte-hmr/runtime/proxy.js?v=8d286565:349:11))
  at construct_svelte_component_dev (/node_modules/.cache/sb-vite/deps/chunk-4IM3CZD6.js?v=8d286565:2604:22))
  at Array.create_else_block (/node_modules/.cache/sb-vite/deps/chunk-3DFUKF5G.js?v=8d286565:75:23))
  at create_fragment (/node_modules/.cache/sb-vite/deps/chunk-3DFUKF5G.js?v=8d286565:400:95))
  at init (/node_modules/.cache/sb-vite/deps/chunk-4IM3CZD6.js?v=8d286565:2179:35))
```

cause is that storybook doesn't do full ssr sveltekit initialization and as a result inlangs i import isn't properly initialized here

# steps taken to set up this repo

```shell
pnpm create svelte@latest sveltekit-storybook-inlang
cd sveltekit-storybook-inlang
pnpm i
pnpm dlx storybook init
rm -rf src/stories
pnpm add -D @inlang/sdk-js
# edit vite.config.ts to add inlang plugin according to https://inlang.com/documentation/sdk/sveltekit
pnpm dev # inlang generates languages
# add InlangWelcome.svelte and InlangWelcome.stories.ts
pnpm storybook
```


