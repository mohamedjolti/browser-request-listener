import { FETCH_API, XHR } from "../../../src/Sender";
import { BrowserRequestListener } from "../../../BrowserRequestListener";
import { expect, jest, test } from '@jest/globals';


/*
  |--------------------------------------------------------------------------
  | Test scenario
  |--------------------------------------------------------------------------
  |
  | If an error onccured in one of listener , the Fetch api should not be affected
  | 
  */


let counter = 0;


beforeEach(() => {
    counter = 0;
    global.fetch = jest.fn(() => {
        counter = counter + 5;
        return Promise.resolve({
            json: () => {
                return Promise.resolve({ counterResponse: counter * 2 })
            },
            clone: () => Promise.resolve({ counterResponse: counter }),
        })
    }
    );
});




it("Test that fetch not affected by a Listener throwin an error", async function () {
    const browserRequestListener = new BrowserRequestListener({
        reportOnError: function (error, event) {
            console.log("callback error : ", error);
        },
        filters: {
            disableForXHr: true,
            // disableForFetch : true, 
        },
        test: true
    });


    browserRequestListener.addPreHttpRequestListener(function (params,/**@type {Sender}  */ sender) {
        throw new Error("Unexpected error");
    });

    browserRequestListener.apply();

    expect(counter).toEqual(0);
    const counterReponse = await fetch('URL')
        .then(response => response.json()).then(data => data.counterResponse);
    expect(counterReponse).toEqual(10);
    expect(counter).toEqual(5);

})
