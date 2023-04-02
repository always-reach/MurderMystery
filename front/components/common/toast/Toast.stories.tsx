import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Toast from '@components/common/toast/Toast';


export default {
    title: 'Toast',
    component: Toast,
} as ComponentMeta<typeof Toast>;

const Template: ComponentStory<typeof Toast> = (args) => <Toast {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    children:"テストメッセージ",
    color:"primary"
};

export const Warning = Template.bind({});
Warning.args = {
    children:"テストメッセージ",
    color:"warning"
};