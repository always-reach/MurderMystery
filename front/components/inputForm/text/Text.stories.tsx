import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Text from '@components/inputForm/text/Text';


export default {
    title: 'Text',
    component: Text,
} as ComponentMeta<typeof Text>;

const Template: ComponentStory<typeof Text> = (args) => <Text {...args} />;

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