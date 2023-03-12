import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import sampleImage from '@assets/images/sampleImage.jpg'
import GameCardPresenter from '@components/common/cards/gameCard/GameCardPresenter';

export default {
    title: 'GameCard',
    component: GameCardPresenter,
} as ComponentMeta<typeof GameCardPresenter>;

const Template: ComponentStory<typeof GameCardPresenter> = (args) => <GameCardPresenter {...args} />;

const mock = async (testUseId: number, testGameId: number) => {
    console.log({ testUseId })
    console.log({ testGameId })
}

export const Default = Template.bind({});
Default.args = {
    gameId: "0",
    title: "テストタイトル",
    auther: "私です",
    image: `/${sampleImage}`,
    playTime: 90,
    minPlayer: 3,
    maxPlayer: 7,
    note: "備考が好きにかけます",
    isPlayed: true,
    userId: "0",
    updateGame: mock
};