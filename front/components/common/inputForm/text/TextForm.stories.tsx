import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import TextForm from '@components/common/inputForm/text/TextForm';


export default {
    title: 'Form/TextForm',
    component: TextForm,
} as ComponentMeta<typeof TextForm>;

const Template: ComponentStory<typeof TextForm> = (args) => <TextForm {...args} />;

export const Default = Template.bind({});
Default.args = {
    id: "text",
};

export const Error = Template.bind({});
Error.args = {
    id: "text",
    error:true,
    errorMessage:"正しい値を入力してください"
};