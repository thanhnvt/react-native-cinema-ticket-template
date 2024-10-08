import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ScreenKey from "../constants/ScreenKey";
import MainTabNavigator from "./MainTabNavigation";
import { RootStackParamList } from "../types/NavigationType";
import TicketBookingCinemaScreen from "../screens/ticket-booking-cinema/TicketBookingCinemaScreen";
import TicketBookingSeatsScreen from "../screens/ticket-booking-seat/TicketBookingSeatsScreen";
import PaymentScreen from "../screens/payment/PaymentScreen";
import TicketDetailScreen from "../screens/ticket-detail/TicketDetailScreen";

const Stack = createNativeStackNavigator<RootStackParamList>();

const MainStackNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Group
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name={ScreenKey.MAIN_TAB} component={MainTabNavigator} />
      </Stack.Group>
      <Stack.Group
        screenOptions={{
          headerBackTitleVisible: false,
          headerTintColor: "black",
        }}
      >
        <Stack.Screen
          options={{
            headerTitle: "Cinema",
          }}
          name={ScreenKey.TICKETS_BOOKING_CINEMA_SCREEN}
          component={TicketBookingCinemaScreen}
        />
        <Stack.Screen
          options={{
            headerTitle: "Seats",
          }}
          name={ScreenKey.TICKETS_BOOKING_SEAT_SCREEN}
          component={TicketBookingSeatsScreen}
        />
        <Stack.Screen
          name={ScreenKey.PAYMENT_SCREEN}
          component={PaymentScreen}
          options={{
            headerTitle: "Payment",
          }}
        />
        <Stack.Screen
          name={ScreenKey.TICKET_DETAIL_SCREEN}
          component={TicketDetailScreen}
          options={{
            headerTitle: "Ticket detail",
          }}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default MainStackNavigation;
