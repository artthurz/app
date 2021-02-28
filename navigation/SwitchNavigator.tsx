import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import * as React from 'react';
import Login from '../screens/SignIn';

const Switch = createAppContainer(createSwitchNavigator(
  {
    Auth: Login,
  },
  {
    initialRouteName: 'Auth',
  }
));

export default function SwitchNavigator() {
  return (
    <Switch/>
  );
}

