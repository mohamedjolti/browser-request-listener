/**
 * @jest-environment jsdom
 */

import { FETCH_API, XHR } from "../../../src/Sender";
import { BrowserRequestListener } from "../../../BrowserRequestListener";
import { expect, jest } from '@jest/globals';




let counter = 0;

beforeEach(() => {
  counter = 0;
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve({ counterResponse: counter + 1 }),
      clone: () => Promise.resolve({ counterResponse: counter }),
    })
  );
});


it("Test value remains the same if apply fetch is disabled", async function () {
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


  browserRequestListener.addPreHttpRequestListener(function (params,/**@type {Sender}  */ sender) {
    if (sender.getSenderType() == FETCH_API) {
      counter = 4;
    }
  });

  browserRequestListener.addPostHttpRequestListener(function (response,/**@type {Sender}  */ sender) {
    if (sender.getSenderType() == FETCH_API) {
      counter = 4;
    }
  });

  browserRequestListener.apply();

  expect(counter).toEqual(0);
  counter = await fetch('URL').then(response => response.json()).then(data => data.counterResponse);
  expect(counter).toEqual(1);

})