import * as Boom from "@hapi/boom";
import { Lifecycle, Request, ResponseToolkit } from "@hapi/hapi";
import { getRate } from "../../service/currency-cache"

export const getRates = async (request: Request, h: ResponseToolkit): Promise<Lifecycle.ReturnValueTypes> => {
  try {
    const { base, target } = request.query;
    return await getRate(base, target);
  } catch (error) {
    throw Boom.notFound("Something went wrong.", error);
  }
};
