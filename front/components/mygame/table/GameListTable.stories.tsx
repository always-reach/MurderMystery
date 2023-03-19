import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import GameListTable from '@components/mygame/table/GameListTable';
import sampleImage from '@assets/images/sampleImage.jpg'
import testImage from '@assets/images/test.png'

export default {
    title: 'GameListTable',
    component: GameListTable,
} as ComponentMeta<typeof GameListTable>;

const Template: ComponentStory<typeof GameListTable> = (args) => <GameListTable {...args} />;

export const Default = Template.bind({});
Default.args = {
    gameList: [
        { title: "荒廃のマリス", image: sampleImage.src, date: "2022-12-1" },
        { title: "星空のマリス", image: testImage.src, date: "2022-12-2" },
        { title: "九頭竜館の殺人", image: testImage.src, date: "2022-12-3" }
    ]
};

export const NoGame = Template.bind({}); 
NoGame.args = {
    gameList: null
};
