import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Password from '@components/common/inputForm/password/Password';


export default {
    title: 'Form/Password',
    component: Password,
} as ComponentMeta<typeof Password>;

const Template: ComponentStory<typeof Password> = (args) => <Password {...args} />;

export const Default = Template.bind({});
Default.args = {
    id: "password",
};

export const Error = Template.bind({});
Error.args = {
    id: "password",
    error:true,
    errorMessage:"パスワードが一致しません"
};