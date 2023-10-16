/**
 * @jest-environment jsdom
 */
import { FETCH_API, XHR } from "../../../src/Sender";
import { BrowserRequestListener } from "../../../index";
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
    // Create the instance of BrowserRequestListener
    const browserRequestListener = new BrowserRequestListener({
        reportOnError: function (error, event) {
            console.log("report error", error);
        },
        filters: {
            // disableForXHr: true,
            disableForFetch: true
        },
        test: true
    });


    browserRequestListener.addPostHttpRequestListener(function (response,/**@type {Sender}  */ sender) {
        if (sender.getSenderType() == XHR) {
            responseXhr = JSON.parse(response);
        }
    });

    browserRequestListener.apply();

    // Call testing

    response = await postXhrSuccess();
    expect(response.title).toEqual("foo");
    expect(responseXhr.title).toEqual("foo");

})