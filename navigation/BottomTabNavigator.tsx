import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as React from "react";
import CnpjAndCpfValidator from "../screens/CnpjAndCpfValidator";
import { AntDesign } from "@expo/vector-icons";
import { createStackNavigator } from "@react-navigation/stack";
import WebViewCpf from "../screens/CnpjAndCpfValidator/WebViewCpf";


const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Validador"
        options={{
          tabBarLabel: "Validador",
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="checkcircle" color={"green"} size={size} />
          ),
        }}
        component={ProjectsStackNavigator}
      />
    </Tab.Navigator>
  );
}

const screenOptionStyle = {
  headerStyle: {
    backgroundColor: "#0a0742",
  },
  headerTintColor: "white",
  headerBackTitle: "Back",
};

const Stack = createStackNavigator();

const ProjectsStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen
        name="Validador"
        component={CnpjAndCpfValidator}
        options={{
          headerTitle: "Validador",
        }}
      />
      <Stack.Screen name="Validar Cpf" component={WebViewCpf} />
    </Stack.Navigator>
  );
};
