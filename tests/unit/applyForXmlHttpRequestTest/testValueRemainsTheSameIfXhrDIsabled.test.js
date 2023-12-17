/**
 * @jest-environment jsdom
 */
import { FETCH_API, XHR } from "../../../src/Sender";
import { BrowserRequestListener } from "../../../BrowserRequestListener";
import { expect, jest, test } from '@jest/globals';
import { postXhrSuccess } from "../../calls/postXhrSuccess";

let argsXhr = {};

it("test value remains the same after if Xhr disabled", async function () {
    let response = {};
    // Create the instance of BrowserRequestListener
    const browserRequestListener = new BrowserRequestListener({
        reportOnError: function (error, event) {
            console.log("report error", error);
        },
        filters: {
            disableForXHr: true,
            disableForFetch: true
        },
        test: true
    });


    browserRequestListener.addPreHttpRequestListener(function (args,/**@type {Sender}  */ sender) {
        if (sender.getSenderType() == XHR) {
            argsXhr = JSON.parse(args[0])
        }
    });

    browserRequestListener.apply();

    // Call testing
    postXhrSuccess();
    expect(argsXhr.title).toEqual(undefined);
})