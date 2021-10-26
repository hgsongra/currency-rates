import "dotenv/config";

import { compose, Options as GlueOptions } from "@hapi/glue";
import { Server } from "@hapi/hapi";

import { ServerManifest } from "./config";
import {scheduleCronJob} from "./modules/service/currency-cache";

const glueOptions: GlueOptions = {
  relativeTo: `${__dirname}/modules`
};

let finalServer: Server;

//
// Expose separate composeServer() and start() functions to make composeServer available for unit tests
//
export async function composeServer(): Promise<Server> {
  const server = await compose(ServerManifest, glueOptions);
  return server;
}

export async function start(): Promise<Server> {
  finalServer = await composeServer();
  await finalServer.start();
  scheduleCronJob();
  console.log(`Server running @ ${finalServer.info.uri}`);
  return finalServer;
}

export async function stop(): Promise<void> {
  await finalServer.stop();
}
