import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import TextareaForm from '@components/common/inputForm/textarea/TextareaForm';

export default {
    title: 'Form/TextareaForm',
    component: TextareaForm,
} as ComponentMeta<typeof TextareaForm>;

const Template: ComponentStory<typeof TextareaForm> = (args) => <TextareaForm {...args} />;

export const Default = Template.bind({});
Default.args = {
    label:"テストラベル",
    error:false,
    errorMessage:"テストエラー"
};