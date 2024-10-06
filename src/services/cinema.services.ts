import Cinemas from "../assets/json/cinema.json";
import Chairs from "../assets/json/chairs.json";

import { ChairType, CinemaChairsType, CinemaType } from "../types/CinemaTypes";

class CinemaService {
  getMovieShow = async (
    date: string,
    movieId: string,
    provincesId?: string,
    streetId?: string,
    wardId?: string
  ): Promise<Array<CinemaType>> => {
    return Cinemas;
  };
  getChairsByMovieShowId = async (
    showTimeId: string
  ): Promise<CinemaChairsType> => {
    return Chairs;
  };
}

export default CinemaService;
