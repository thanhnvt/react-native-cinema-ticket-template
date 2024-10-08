import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MovieType } from "../../types/MovieTypes";
import movies from "../../assets/json/movies.json";

export interface MovieStates {
  movies: Array<MovieType>;
  favoriteMovies: Array<MovieType>;
}

const defaultState: MovieStates = {
  movies: movies,
  favoriteMovies: [],
};

const movieSlice = createSlice({
  name: "movies",
  initialState: defaultState,
  reducers: {
    setMovies: (
      state: MovieStates,
      action: PayloadAction<any>
    ): MovieStates => {
      state = {
        ...state,
        ...action.payload,
      };
      return state;
    },
    setFavoriteMovies: (
      state: MovieStates,
      action: PayloadAction<any>
    ): MovieStates => {
      state = {
        ...state,
        ...action.payload,
      };
      return state;
    },
    onFavorites: (
      state: MovieStates,
      action: PayloadAction<any>
    ): MovieStates => {
      const { movie } = action.payload;
      state.movies = state.movies.map((m) => {
        if (m._id !== movie._id) return m;
        return movie;
      });
      if (movie?.isFavorite) {
        state.favoriteMovies = [...state.favoriteMovies, movie];
      } else {
        state.favoriteMovies = state.favoriteMovies.filter(
          (m) => m._id !== movie._id
        );
      }
      console.log("favorite", state.favoriteMovies);
      return state;
    },
    paymentTicketSuccess: (
      state: MovieStates,
      action: PayloadAction<any>
    ): MovieStates => {
      const { movieId } = action.payload;
      const movies = state.movies.filter((movie) => movie._id !== movieId);
      if (state.favoriteMovies.length > 0) {
        const favoriteMovies = state.favoriteMovies.filter(
          (movie) => movie._id !== movieId
        );
        state.favoriteMovies = favoriteMovies;
      }
      state.movies = movies;
      return state;
    },
  },
});

export const {
  paymentTicketSuccess,
  onFavorites,
  setFavoriteMovies,
  setMovies,
} = movieSlice.actions;
export default movieSlice.reducer;
