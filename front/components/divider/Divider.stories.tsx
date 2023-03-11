import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Divider from '@components/divider/Divider';


export default {
    title: 'Divider',
    component: Divider,
} as ComponentMeta<typeof Divider>;

const Template: ComponentStory<typeof Divider> = (args) => <Divider />;

export const Default = Template.bind({});
Default.args = {};