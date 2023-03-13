import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import DateForm from '@components/common/inputForm/date/DateForm';


export default {
    title: 'Form/DateForm',
    component: DateForm,
} as ComponentMeta<typeof DateForm>;

const Template: ComponentStory<typeof DateForm> = (args) => <DateForm {...args} />;

export const Default = Template.bind({});
Default.args = {
    id: "date",
};

export const Error = Template.bind({});
Error.args = {
    id: "date",
    error:true,
    errorMessage:"正しい日付を入力してください"
};