import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';
import Login from '../screens/SignIn';
import CreatePerson from '../screens/CreatePerson';
import { FontAwesome, Feather } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();


export default function BottomTabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen 
        name="Login" 
        options={{
          tabBarLabel: 'Login',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="sign-in" color={color} size={size} />
          ),
        }}
        component={Login} />
      <Tab.Screen name="Cadastrar"
        options={{
            tabBarLabel: 'Cadastrar',
            tabBarIcon: ({ color, size }) => (
              <Feather name="user-plus" color={color} size={size} />
            ),
          }}
        component={CreatePerson} />
    </Tab.Navigator>
  );
}

