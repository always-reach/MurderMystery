import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Email from '@components/common/inputForm/email/Email';


export default {
    title: 'Form/Email',
    component: Email,
} as ComponentMeta<typeof Email>;

const Template: ComponentStory<typeof Email> = (args) => <Email {...args} />;

export const Default = Template.bind({});
Default.args = {
    id: "checkbox",
};

export const Error = Template.bind({});
Error.args = {
    id: "checkbox",
    error:true,
    errorMessage:"不正なメールアドレスです"
};