/**
 * @jest-environment jsdom
 */
import { FETCH_API, XHR } from "../../../src/Sender";
import { BrowserRequestController } from "../../../src/browserRequestController";
import { expect, jest, test } from '@jest/globals';
import { postXhrSuccess } from "../../calls/postXhrSuccess";
import { sleep } from "../../helpers/sleep";

/*
  |--------------------------------------------------------------------------
  | Test scenario
  |--------------------------------------------------------------------------
  |
  | Check that the payload is passed to the pre Listner
  | 
  */

let argsXhr = {};

it("test value change before XmlHttp Request", async function () {
    let response = {};
    // Create the instance of BrowserRequestController
    const browserRequestController = new BrowserRequestController({
        reportOnError: function (error, event) {
            console.log("report error", error);
        },
        filters: {
            // disableForXHr: true,
            disableForFetch: true
        },
        test: true
    });


    browserRequestController.addPreHttpRequestListener(function (args,/**@type {Sender}  */ sender) {
        if (sender.getSenderType() == XHR) {
            argsXhr = JSON.parse(args[0])
        }
    });

    browserRequestController.apply();

    // Call testing
    postXhrSuccess();
    expect(argsXhr.title).toEqual("foo");
})