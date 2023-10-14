import { FETCH_API, XHR } from "../../../src/Sender";
import { BrowserRequestController } from "../../../src/browserRequestController";
import { expect, jest, test } from '@jest/globals';

  /*
    |--------------------------------------------------------------------------
    | Test scenario
    |--------------------------------------------------------------------------
    |
    | The counter has an intial value of 0 
    | In the fetch request we will change it to 1
    | In the post listener we will multily the counter by 5;
    | So the exepected behaviour is the value of counter after the post listner should be 1 * 5 = 5
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


it("test value chanage after fetch request", async function () {
  const browserRequestController = new BrowserRequestController({
    reportOnError: function (error, event) {
      console.log("report error", error);
    },
    filters: {
      disabelForXhr: true,
      // disabelForFetchApi: true
    },
    test: true
  });


  browserRequestController.addPostHttpRequestListener(function (response,/**@type {Sender}  */ sender) {
    if (sender.getSenderType() == XHR) {
    } else if (sender.getSenderType() == FETCH_API) {
      counter = counter * 5;
    }
  });

  browserRequestController.apply();

  expect(counter).toEqual(0);
  let counterResponse = await fetch('URL').then(response => response.json()).then(data => data.counterResponse);
  expect(counter).toEqual(5);
})