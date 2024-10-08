import ScreenKey from "../constants/ScreenKey";
import { CinemaType, SeatType, TimeSlotType } from "./CinemaTypes";
import { MovieType } from "./MovieTypes";

export type RootStackParamList = {
  [ScreenKey.TICKETS_BOOKING_CINEMA_SCREEN]: {
    movie: MovieType;
  };
  [ScreenKey.MAIN_TAB]: undefined;
  [ScreenKey.TICKETS_BOOKING_SEAT_SCREEN]: {
    movie: MovieType;
    cinema?: CinemaType;
    showTime: TimeSlotType;
  };
  [ScreenKey.PAYMENT_SCREEN]: {
    movie: MovieType;
    cinema?: CinemaType;
    showTime: TimeSlotType;
    seats: SeatType[];
  };
  [ScreenKey.TICKET_DETAIL_SCREEN]: {
    movie: MovieType;
    cinema?: CinemaType;
    showTime: TimeSlotType;
    seats: SeatType[];
  };
};
