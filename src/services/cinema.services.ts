import Cinemas from "../assets/json/cinema.json";
import Seats from "../assets/json/seats.json";

import { CinemaSeatsType, CinemaType } from "../types/CinemaTypes";

class CommonService {
  getMovieShow = async (
    date: string,
    movieId: string,
    provincesId?: string,
    streetId?: string,
    wardId?: string
  ): Promise<Array<CinemaType>> => {
    return Cinemas;
  };
  getSeatsByMovieShowId = async (
    showTimeId: string
  ): Promise<CinemaSeatsType> => {
    return Seats;
  };
}

export default CommonService;
