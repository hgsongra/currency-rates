import "dotenv/config";

import { start } from "./lib";

// tslint:disable
start()
  .catch(console.error);
