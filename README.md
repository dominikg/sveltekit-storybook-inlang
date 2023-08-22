# Demo of how to use inlang with storybook

injects a custom Decorator to make the inlang runtime available on context

Credits to Jeppe Reinhold from storybook and Ivan Hofer from inlang for pointing in the right direction!

# Warning

This is not production ready and can break any time inlang internals change. 
There will be a nicer way to do this in the future


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
# notice some errors, fiddle around for a while
# add inlang-runtime.ts and InlangContextWrapper
```


