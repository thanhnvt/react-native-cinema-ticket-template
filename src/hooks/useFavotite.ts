import { useDispatch } from "react-redux";
import api from "../services";
import { MovieType } from "../types/MovieTypes";
import { onFavorites } from "../stores/slices/movies.slice";

export const useFavorite = () => {
  const dispatch = useDispatch();
  const onFavorite = async (movie: MovieType) => {
    const result = await api.movie.onFavorite(movie);
    if (result?._id) {
      dispatch(onFavorites({ movie: movie }));
    }
  };
  return {
    onFavorite,
  };
};
