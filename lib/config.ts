import { Manifest } from "@hapi/glue";

export const ServerManifest: Manifest = {
  register: {
    plugins: [
      "@hapi/inert",
      "@hapi/vision",
      // NOTE: API Authorisation goes here using the JWT
      "./v1"
    ]
  },
  server: {
    debug: false,
    port: process.env.NODE_PORT,
    routes: {
      cors: {
        origin: ["*"]
      }
    }
  }
};
