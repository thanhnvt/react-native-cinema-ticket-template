import { useDispatch } from "react-redux";
import api from "../services";
import { setFavoriteMovies, setMovies } from "../stores/slices/movies.slice";
import { setTickets } from "../stores/slices/ticket.slice";

export const useInitData = () => {
  const dispatch = useDispatch();
  const getMovies = async () => {
    const [movies, favoriteMovies, tickets] = await Promise.all([
      await api.movie.getMovies(100, 100),
      await api.movie.getFavoriteMovies(),
      await api.cinema.getTickets(),
    ]);
    if (movies?.length) {
      dispatch(setMovies({ movies }));
    }
    if (favoriteMovies?.length) {
      setFavoriteMovies({ favoriteMovies });
    }
    if (tickets?.length) {
      setTickets({ tickets });
    }
  };
  return {
    getMovies,
  };
};
