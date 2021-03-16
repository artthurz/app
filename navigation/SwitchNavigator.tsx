import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import * as React from 'react';
import Login from '../screens/SignIn';
import CreatePerson from '../screens/CreatePerson'

const Switch = createAppContainer(createSwitchNavigator(
  {
    Auth: Login,
    Person: CreatePerson
  },
  {
    initialRouteName: 'Person',
  }
));

export default function SwitchNavigator() {
  return (
    <Switch/>
  );
}

