import { useDispatch } from "react-redux";
import api from "../services";
import { setFavoriteMovies, setMovies } from "../stores/slices/movies.slice";

export const useInitData = () => {
  const dispatch = useDispatch();
  const getMovies = async () => {
    const [movies, favoriteMovies] = await Promise.all([
      await api.movie.getMovies(100, 100),
      await api.movie.getFavoriteMovies(),
    ]);
    if (movies?.length) {
      dispatch(setMovies({ movies }));
    }
    if (favoriteMovies?.length) {
      setFavoriteMovies({ favoriteMovies });
    }
  };
  return {
    getMovies,
  };
};
