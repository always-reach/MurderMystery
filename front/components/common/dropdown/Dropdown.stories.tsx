import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Dropdown from '@components/common/dropdown/Dropdown';
export default {
    title: 'Dropdown',
    component: Dropdown,
} as ComponentMeta<typeof Dropdown>;

const Template: ComponentStory<typeof Dropdown> = (args) => <Dropdown {...args} />;

export const Default = Template.bind({});
Default.args = {
    id: "1",
    isVisible: true,
    menu: [
        { text: "1stMenu", url: "" },
        { text: "2ndMenu", url: "" },
        { text: "3rdMenu", url: "" }]
};
