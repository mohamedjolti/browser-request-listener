import { FETCH_API, XHR } from "../../../src/Sender";
import { BrowserRequestListener } from "../../../BrowserRequestListener";
import { expect, jest, test } from '@jest/globals';


/*
  |--------------------------------------------------------------------------
  | Test scenario
  |--------------------------------------------------------------------------
  |
  | The counter has an intial value of 0 
  | In the  pre Listener we wil change it to 4
  | In the  fetch request we will multiply it by 5 
  | So the exepected behaviour is the value of counter  4 * 5 = 20  
  | And the value resolved by the fetch request will be counter* 2 = 40
  */


let counter = 0;


beforeEach(() => {
  counter = 0;
  global.fetch = jest.fn(() => {
    counter = counter * 5;
    return Promise.resolve({
      json: () => {
        return Promise.resolve({ counterResponse: counter * 2 })
      },
      clone: () => Promise.resolve({ counterResponse: counter }),
    })
  }
  );
});




it("Test value before changed before fetch", async function () {
  const browserRequestListener = new BrowserRequestListener({
    reportOnError: function (error, event) {
      console.log("report error", error);
    },
    filters: {
      disableForXHr: true,
      // disableForFetch : true, 
    },
    test: true
  });


  browserRequestListener.addPreHttpRequestListener(function (params,/**@type {Sender}  */ sender) {
    if (sender.getSenderType() == FETCH_API) {
      counter +=  2;
    }
  });
  browserRequestListener.addPreHttpRequestListener(function (params,/**@type {Sender}  */ sender) {
    if (sender.getSenderType() == FETCH_API) {
      counter +=  2;
    }
  });

  browserRequestListener.apply();

  expect(counter).toEqual(0);
  const counterReponse = await fetch('URL')
    .then(response => response.json()).then(data => data.counterResponse);
  expect(counterReponse).toEqual(40);
  expect(counter).toEqual(20);

})
