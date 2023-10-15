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
  | If an error onccured in one of listener , the Xhr should not be affected
  | 
  */

let argsXhr = {};

it("Test Xhr not affected by a callback throwing an error", async function () {
    let response = {};
    // Create the instance of BrowserRequestController
    const browserRequestController = new BrowserRequestController({
        reportOnError: function (error, event) {
            console.log("callback error : ", error);
        },
        filters: {
            // disableForXHr: true,
            disableForFetch: true
        },
        test: true
    });


    browserRequestController.addPreHttpRequestListener(function (args,/**@type {Sender}  */ sender) {
        throw Error("Error in Callback");
    });

    browserRequestController.apply();

    // Call testing
    response = await postXhrSuccess();
    expect(response.title).toEqual("foo");
    
})