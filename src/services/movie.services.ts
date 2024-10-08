import { PAYMENT_METHOD } from "../constants/AppConstants";
import { PaymentType } from "../types/CommonTypes";
import { MovieType } from "../types/MovieTypes";
import Movies from "../assets/json/movies.json";

class MoviesService {
  getMovies = async (page: number, size: number): Promise<Array<MovieType>> => {
    return Movies;
  };
  getFavoriteMovies = async (): Promise<Array<MovieType>> => {
    return [];
  };
  onFavorite = async (movie: MovieType): Promise<MovieType> => {
    return movie
  };
}

export default MoviesService;
