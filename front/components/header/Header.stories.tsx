import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { HeaderPresenter } from '@components/header/HeaderPresenter';

export default {
  title: 'Header',
  component: HeaderPresenter,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof HeaderPresenter>;

const Template: ComponentStory<typeof HeaderPresenter> = (args) => <HeaderPresenter {...args} />;

export const LoggedIn = Template.bind({});
LoggedIn.args = {
  isSignin: true,
  signout: () => { },
  router: () => { }
};

export const LoggedOut = Template.bind({});
LoggedOut.args = {
  isSignin: false,
};
