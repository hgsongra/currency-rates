/*
Basic tests for the server skeleton
 */
import "dotenv/config";

import { Server } from "@hapi/hapi";
import * as chai from "chai";
import * as chaiAsPromised from "chai-as-promised";

import * as server from "../lib";

chai.use(chaiAsPromised);
const expect = chai.expect;

let theServer: Server;

describe("Basic server operation tests", () => {


  it ("should not crash when starting the server", async () => {
    return expect(server.start())
      .to.be.fulfilled
      .then((serverObj: Server) => {
        theServer = serverObj;
      });
  });

  it("should be able fetch the currency rates", async () => {
    return expect(theServer.inject({url: "/rates", method: "GET"}))
      .to.be.fulfilled
      .then((res: any) => {
        const payload = JSON.parse(res.payload);
        expect(payload.base).to.not.be.undefined;
        expect(payload.date).to.not.be.undefined;
        expect(payload.rates).to.not.be.undefined;
      });
  });

  it ("should be able to stop the server", async () => {
    return expect(server.stop())
      .to.be.fulfilled;
  });
});
