import CommonService from "./cinema.services";
import CinemaService from "./cinema.services";
import MovieService from "./movie.services";

class AppService {
  public cinema: CinemaService;
  public common: CommonService;
  public movie: MovieService;

  constructor() {
    this.cinema = new CinemaService();
    this.common = new CommonService();
    this.movie = new MovieService();
  }
}

const api = new AppService();
export default api;
