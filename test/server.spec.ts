/*
Basic tests for the server skeleton
 */
import "dotenv/config";

import { Server } from "@hapi/hapi";
import * as chai from "chai";
import * as chaiAsPromised from "chai-as-promised";

import * as server from "../lib";
import sinon = require("sinon");
import axios from "axios";
import NodeCache = require("node-cache");

chai.use(chaiAsPromised);
const expect = chai.expect;

let theServer: Server;
const sandbox = sinon.createSandbox();
const fakeCache = new NodeCache();



describe("Basic server operation tests", () => {

  afterEach(() => {
    fakeCache.flushAll();
    sandbox.restore();
  });

  it ("should not crash when starting the server", async () => {
    return expect(server.start())
      .to.be.fulfilled
      .then((serverObj: Server) => {
        theServer = serverObj;
      });
  });

  it("should be able fetch the currency rates from oracle api when not cached", async () => {
    sandbox.stub(axios,"get").resolves({data: {
      "base": "USD",
      "date": "2018-02-13",
      "rates": {
         "JPY": 0.719154
      }
    }});
    return expect(theServer.inject({url: "/rates?base=USD&target=JPY", method: "GET"}))
      .to.be.fulfilled
      .then((res: any) => {
        const payload = JSON.parse(res.payload);
        expect(payload.base).to.not.be.undefined;
        expect(payload.target).to.not.be.undefined;
        expect(payload.rates).to.not.be.undefined;
      });
  });

  it("should return undefined rates when not cached and API fails", async () => {
    sandbox.stub(axios,"get").rejects(new Error("API fails"));
    return expect(theServer.inject({url: "/rates?base=USD&target=BTC", method: "GET"}))
      .to.be.fulfilled
      .then((res: any) => {
        const payload = JSON.parse(res.payload);
        expect(payload.base).to.not.be.undefined;
        expect(payload.target).to.not.be.undefined;
        expect(payload.rates).to.be.empty;
      });
  });


  it("should be able fetch the currency rates from cache store", async () => {
    sandbox.stub(fakeCache,"has").resolves(true);
    sandbox.stub(fakeCache,"get").resolves({"JPY": 0.71000});
    return expect(theServer.inject({url: "/rates?base=USD&target=JPY", method: "GET"}))
      .to.be.fulfilled
      .then((res: any) => {
        const payload = JSON.parse(res.payload);
        expect(payload.base).to.not.be.undefined;
        expect(payload.target).to.not.be.undefined;
        expect(payload.rates).to.not.be.undefined;
        expect(payload.rates.JPY).to.not.be.eq(0.71000);
      });
  });


  it ("should be able to stop the server", async () => {
    return expect(server.stop())
      .to.be.fulfilled;
  });
});
