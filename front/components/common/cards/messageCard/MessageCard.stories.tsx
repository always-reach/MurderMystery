import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import MessageCard from '@components/common/cards/messageCard/MessageCard';

export default {
    title: 'MessageCard',
    component: MessageCard,
} as ComponentMeta<typeof MessageCard>;

const Template: ComponentStory<typeof MessageCard> = (args) => <MessageCard {...args} />;


export const Default = Template.bind({});
Default.args = {
    className:"",
    message:"テストメッセージ"
};