import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import FileForm from '@components/common/inputForm/file/FileForm';


export default {
    title: 'Form/FileForm',
    component: FileForm,
} as ComponentMeta<typeof FileForm>;

const Template: ComponentStory<typeof FileForm> = (args) => <FileForm {...args} />;

export const Default = Template.bind({});
Default.args = {
    id: "file",
    label:"画像アップロード"
};

export const Error = Template.bind({});
Error.args = {
    id: "file",
    error:true,
    errorMessage:"不正なメールアドレスです"
};