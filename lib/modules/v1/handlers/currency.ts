import * as Boom from "@hapi/boom";
import { Lifecycle, Request, ResponseToolkit } from "@hapi/hapi";

export const getRates = async(request: Request, h: ResponseToolkit): Promise<Lifecycle.ReturnValueTypes> => {
  try {
    return {
      "base": "USD",
      "date": "2018-02-13",
      "rates": {
         "CAD": 1.260046,
         "CHF": 0.933058,
         "EUR": 0.806942,
         "GBP": 0.719154
      }
    }   
  } catch (error) {
    throw Boom.notFound("Something went wrong.", error);
  }
};
