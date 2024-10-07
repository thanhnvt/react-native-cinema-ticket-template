import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import MainStackNavigation from "./navigation/MainStackNavigation";
import { navigationRef } from "./utils/navigationUtils";

const App = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <MainStackNavigation />
    </NavigationContainer>
  );
};

export default App;
