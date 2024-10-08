/* eslint-disable react/no-unstable-nested-components */
import React from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MoviesScreen from "../screens/movies/MoviesScreen";
import TicketsBookedScreen from "../screens/ticket-booked/TicketsBookedScreen";
import FavoriteMoviesScreen from "../screens/favorites/FavoriteMoviesScreen";
import ScreenKey from "../constants/ScreenKey";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const Tab = createBottomTabNavigator();

const MainTabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name={ScreenKey.MOVIES_SCREEN}
        component={MoviesScreen}
        options={{
          tabBarShowLabel: false,
          tabBarActiveTintColor: "red",
          headerShown: false,
          tabBarIcon: ({ color, size, focused }) => (
            <MaterialCommunityIcons
              name="movie"
              color={color}
              size={focused ? size * 1.4 : size * 1.2}
            />
          ),
        }}
      />
      <Tab.Screen
        name={ScreenKey.FAVORITE_MOVIES_SCREEN}
        component={FavoriteMoviesScreen}
        options={{
          tabBarShowLabel: false,
          tabBarActiveTintColor: "red",
          headerTitle:"Favorite Movies",
          tabBarIcon: ({ color, size, focused }) => (
            <MaterialCommunityIcons
              name="star-box"
              color={color}
              size={focused ? size * 1.4 : size * 1.2}
            />
          ),
        }}
      />
      <Tab.Screen
        name={ScreenKey.TICKETS_BOOKED_SCREEN}
        component={TicketsBookedScreen}
        options={{
          tabBarShowLabel: false,
          tabBarActiveTintColor: "red",
          headerTitle:"Tickets Booked",
          tabBarIcon: ({ color, size, focused }) => (
            <MaterialCommunityIcons
              name="ticket"
              color={color}
              size={focused ? size * 1.4 : size * 1.2}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default MainTabNavigator;
