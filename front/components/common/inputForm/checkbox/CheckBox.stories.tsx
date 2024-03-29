import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import CheckBox from '@components/common/inputForm/checkbox/CheckBox';

export default {
    title: 'Form/CheckBox',
    component: CheckBox,
} as ComponentMeta<typeof CheckBox>;

const Template: ComponentStory<typeof CheckBox> = (args) => <CheckBox {...args} />;

export const Default = Template.bind({});
Default.args = {
    id: "checkbox",
    label: "ラベル"
};