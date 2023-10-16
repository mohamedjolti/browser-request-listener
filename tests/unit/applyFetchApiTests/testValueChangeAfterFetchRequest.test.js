import { FETCH_API, XHR } from "../../../src/Sender";
import { BrowserRequestListener } from "../../../index";
import { expect, jest, test } from '@jest/globals';

/*
  |--------------------------------------------------------------------------
  | Test scenario
  |--------------------------------------------------------------------------
  |
  | The counter has an intial value of 0 
  | In the fetch request we will change it to 1
  | In the post listener we will multily the counter by 5;
  | So the exepected behaviour is the value of counter after the post Listener should be 1 * 5 = 5
  |
  */

let counter = 0;

beforeEach(() => {
  counter = 0;
  global.fetch = jest.fn(() => {
    counter = counter + 1
    return Promise.resolve({
      json: () => {
        return Promise.resolve({ counterResponse: counter })
      },
      clone: () => Promise.resolve({ counterResponse: counter }),
    })
  }
  );
});


it("Test value chanage after fetch request", async function () {
  const browserRequestListener = new BrowserRequestListener({
    reportOnError: function (error, event) {
      console.log("report error", error);
    },
    filters: {
      disableForXHr: true,
      // disableForFetch: true
    },
    test: true
  });


  browserRequestListener.addPostHttpRequestListener(function (response,/**@type {Sender}  */ sender) {
    if (sender.getSenderType() == FETCH_API) {
      counter = counter * 5;
    }
  });

  browserRequestListener.apply();

  expect(counter).toEqual(0);
  let counterResponse = await fetch('URL').then(response => response.json()).then(data => data.counterResponse);
  expect(counter).toEqual(5);
})