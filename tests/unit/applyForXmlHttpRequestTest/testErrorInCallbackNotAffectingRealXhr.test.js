/**
 * @jest-environment jsdom
 */
import { FETCH_API, XHR } from "../../../src/Sender";
import { BrowserRequestListener } from "../../../index";
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
    // Create the instance of BrowserRequestListener
    const browserRequestListener = new BrowserRequestListener({
        reportOnError: function (error, event) {
            console.log("callback error : ", error);
        },
        filters: {
            // disableForXHr: true,
            disableForFetch: true
        },
        test: true
    });


    browserRequestListener.addPreHttpRequestListener(function (args,/**@type {Sender}  */ sender) {
        throw Error("Error in Callback");
    });

    browserRequestListener.apply();

    // Call testing
    response = await postXhrSuccess();
    expect(response.title).toEqual("foo");
    
})