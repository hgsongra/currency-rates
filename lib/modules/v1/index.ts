import { Plugin, Server } from "@hapi/hapi";
import { getRates } from "./handlers";

interface PluginOptions { }

export const plugin: Plugin<PluginOptions> = {
  name: "currency-rates",
  version: "1.0.0",
  register: async (server: Server, options: PluginOptions): Promise<void> => {
    server.route({
      method: 'GET',
      path: '/rates',
      options: {
        handler: getRates
      }
    });
  }
};
