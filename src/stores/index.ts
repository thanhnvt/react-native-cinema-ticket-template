import {configureStore} from '@reduxjs/toolkit';
import reducers from './slices';
import {shallowEqual, TypedUseSelectorHook, useSelector} from 'react-redux';

export type RootState = ReturnType<typeof reducers>;

const middlewares: any[] = [];

const store = configureStore({
  reducer: reducers,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      thunk: false,
    }).concat(middlewares),
});

// https://react-redux.js.org/api/hooks#recipe-useshallowequalselector
const useShallowEqualSelector = (
  selector: (state: RootState) => any,
  equalityFn: any,
) => useSelector(selector, equalityFn || shallowEqual);
export const useAppSelector: TypedUseSelectorHook<RootState> =
  useShallowEqualSelector;
export default store;
