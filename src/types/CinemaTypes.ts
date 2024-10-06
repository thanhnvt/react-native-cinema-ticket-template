export type CinemaType = {
  _id: string;
  name: string;
  image: string;
  address: string;
};

export type ChairType = {
  name: string;
  price: string;
  isBooked: boolean;
};

export type CinemaChairsType = {
  single: any;
  couple: any;
};
