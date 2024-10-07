import { PAYMENT_METHOD } from "../constants/AppConstants";
import { PaymentType } from "../types/CommonTypes";

class AppService {
  getPaymentMethod = async (): Promise<Array<PaymentType>> => {
    return PAYMENT_METHOD;
  };
}

export default AppService;
