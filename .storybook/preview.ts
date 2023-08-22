import type {Preview} from "@storybook/svelte";
import InlangContextWrapper from './InlangContextWrapper.svelte';
import {createRuntime} from "./inlang-runtime";
const preview: Preview = {
    loaders: [
        async () => {
            const runtime = await createRuntime('en')
            return {inlangRuntime:runtime}
        }
    ],
    decorators: [
        (story, storyContext) => {
            return {
                Component: InlangContextWrapper,
                props: {
                    runtime: storyContext.loaded.inlangRuntime
                }
            };
        },
    ],
    parameters: {
        actions: {argTypesRegex: "^on[A-Z].*"},
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/,
            },
        },
    },
};

export default preview;
