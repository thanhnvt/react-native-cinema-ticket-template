import {createSlice} from '@reduxjs/toolkit';
import {MovieType} from '../../types/MovieTypes';
import movies from '../../assets/json/movies.json';

export interface MovieStates {
  movies: Array<MovieType>;
}

const defaultState: MovieStates = {
  movies: movies,
};

const movieSlice = createSlice({
  name: 'movies',
  initialState: defaultState,
  reducers: {},
});

export const {} = movieSlice.actions;
export default movieSlice.reducer;
