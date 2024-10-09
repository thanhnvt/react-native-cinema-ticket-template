import Cinemas from "../assets/json/cinema.json";
import Seats from "../assets/json/seats.json";

import {
  CinemaPaymentRequestType,
  CinemaSeatsType,
  CinemaType,
} from "../types/CinemaTypes";

class CommonService {
  getTickets = async (): Promise<Array<CinemaPaymentRequestType>> => {
    return [];
  };
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

  onPayment = async (params: CinemaPaymentRequestType): Promise<any> => {
    return {
      status: 200,
    };
  };
}

export default CommonService;
