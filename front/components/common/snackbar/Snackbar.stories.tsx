import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Snackbar from '@components/common/snackbar/Snackbar';


export default {
    title: 'Snackbar',
    component: Snackbar,
} as ComponentMeta<typeof Snackbar>;

const Template: ComponentStory<typeof Snackbar> = (args) => <Snackbar {...args} />;

export const Default = Template.bind({});
Default.args = {
    isShow:true,
    message:"テストメッセージ"
};