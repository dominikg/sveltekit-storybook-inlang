<script>
    import {setContext} from "svelte";
    import {inlangSymbol} from "../node_modules/@inlang/sdk-js/dist/adapter-sveltekit/runtime/shared/utils.js";
    export let runtime; // set via storybook loader
    setContext(inlangSymbol,runtime);
</script>
<slot/>

