import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import NumberForm from '@components/common/inputForm/number/NumberForm';


export default {
    title: 'Form/NumberForm',
    component: NumberForm,
} as ComponentMeta<typeof NumberForm>;

const Template: ComponentStory<typeof NumberForm> = (args) => <NumberForm {...args} />;

export const Default = Template.bind({});
Default.args = {
    id: "number",
};


export const Error = Template.bind({});
Error.args = {
    id: "number",
    error:true,
    errorMessage:"正しい数値を入力してください"
};