import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import ErrorCard from '@components/common/cards/errorCard/ErrorCard';


export default {
    title: 'ErrorCard',
    component: ErrorCard,
} as ComponentMeta<typeof ErrorCard>;

const Template: ComponentStory<typeof ErrorCard> = (args) => <ErrorCard {...args} />;



export const Default = Template.bind({});
Default.args = {
    errorMessage:"テストメッセージ"
};