export type CinemaType = {
  _id: string;
  name: string;
  image: string;
  address: string;
  timeSlots: TimeSlotType[];
};

export type TimeSlotType = {
  _id: string;
  value: string;
};

export type SeatType = {
  name: string;
  price: string;
  isBooked: boolean;
};

export type CinemaSeatsType = {
  single: any;
  couple: any;
};
