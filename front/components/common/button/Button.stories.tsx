import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Button from '@components/common/button/Button';


export default {
    title: 'Button',
    component: Button,
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} >{args.children}</Button>;



export const Default = Template.bind({});
Default.args = {
    children: "サンプルボタン"
};