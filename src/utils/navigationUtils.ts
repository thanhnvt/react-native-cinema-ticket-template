import {
  CommonActions,
  createNavigationContainerRef,
} from "@react-navigation/native";

export const navigationRef = createNavigationContainerRef();

export const resetScreen = (screenKey: string) => {
  const resetAction = CommonActions.reset({
    index: 0,
    routes: [
      {
        name: screenKey,
      },
    ],
  });
  navigationRef.dispatch(resetAction);
};
