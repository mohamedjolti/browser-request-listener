/**
 * @jest-environment jsdom
 */
import { FETCH_API, XHR } from "../../../src/Sender";
import { BrowserRequestController } from "../../../src/browserRequestController";
import { expect, jest, test } from '@jest/globals';
import { postXhrSuccess } from "../../calls/postXhrSuccess";
/*
  |--------------------------------------------------------------------------
  | Test scenario
  |--------------------------------------------------------------------------
  |
  | Check that the response of the XHr is passed ot the post listener
  | 
  */


let responseXhr = {};

it("test value chanage after XmlHttp Request", async function () {
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


    browserRequestController.addPostHttpRequestListener(function (response,/**@type {Sender}  */ sender) {
        if (sender.getSenderType() == XHR) {
            responseXhr = JSON.parse(response);
        }
    });

    browserRequestController.apply();

    // Call testing

    response = await postXhrSuccess();
    expect(response.title).toEqual("foo");
    expect(responseXhr.title).toEqual("foo");

})