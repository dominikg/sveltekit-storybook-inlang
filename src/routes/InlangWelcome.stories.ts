import type { Meta, StoryObj } from '@storybook/svelte';

import InlangWelcome from './InlangWelcome.svelte';

const meta = {
    title: 'InlangWelcome',
    component: InlangWelcome,
    tags: ['autodocs'],
    argTypes: {},
} satisfies Meta<InlangWelcome>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
