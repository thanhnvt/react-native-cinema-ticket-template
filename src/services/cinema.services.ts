import Cinemas from '../assets/json/cinema.json';
import {CinemaType} from '../types/CinemaTypes';

class CinemaService {
  getCinemaByMovieIdAndDate = async (date: string,movieId: string): Promise<Array<CinemaType>> => {
    return Cinemas;
  };
}

export default CinemaService;