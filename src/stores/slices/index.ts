import {combineReducers} from '@reduxjs/toolkit';
import movieReducers from './movies.slice';

const rootReducer = combineReducers({
  movies: movieReducers,
});

export default rootReducer;
