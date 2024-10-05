import CinemaService from './cinema.services';

class AppService {
  public cinema: CinemaService;
  constructor() {
    this.cinema = new CinemaService();
  }
}

const api = new AppService();
export default api;
