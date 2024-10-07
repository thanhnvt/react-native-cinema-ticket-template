import CommonService from "./cinema.services";
import CinemaService from "./cinema.services";

class AppService {
  public cinema: CinemaService;
  public common: CommonService;

  constructor() {
    this.cinema = new CinemaService();
    this.common = new CommonService();
  }
}

const api = new AppService();
export default api;
