import { NavigationContainer } from "@react-navigation/native";
import React, { useEffect } from "react";
import MainStackNavigation from "./navigation/MainStackNavigation";
import { navigationRef } from "./utils/navigationUtils";
import { useInitData } from "./hooks/useInitData";

const App = () => {
  const { getMovies } = useInitData();
  useEffect(() => {
    getMovies();
  }, []);
  return (
    <NavigationContainer ref={navigationRef}>
      <MainStackNavigation />
    </NavigationContainer>
  );
};

export default App;
