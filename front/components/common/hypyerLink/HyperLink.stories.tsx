import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import HyperLink from '@components/common/hypyerLink/HyperLink';


export default {
    title: 'HyperLink',
    component: HyperLink,
} as ComponentMeta<typeof HyperLink>;

const Template: ComponentStory<typeof HyperLink> = (args) => <HyperLink {...args} />;

export const Default = Template.bind({});
Default.args = {
    children:"メッセージ",
    href:"/"
};