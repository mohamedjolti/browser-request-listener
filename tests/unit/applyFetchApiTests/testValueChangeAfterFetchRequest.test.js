import { FETCH_API, XHR } from "../../../src/Sender";
import { BrowserRequestController } from "../../../src/browserRequestController";
import { expect, jest, test } from '@jest/globals';



let counter = 0;

beforeEach(() => {
  counter = 0;
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve({ counterResponse: counter++}),
      clone: () => Promise.resolve({ counterResponse: counter }),
    })
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
  
  
    browserRequestController.addPreHttpRequestListener(function (params,/**@type {Sender}  */ sender) {
      if (sender.getSenderType() == XHR) {
      } else if (sender.getSenderType() == FETCH_API) {
        counter = counter+1;
      }
    });
  
    browserRequestController.apply();
  
    expect(counter).toEqual(0);
    let counterReponse = await fetch('URL').then(response => response.json()).then(data => data.counterResponse);
    expect(counterReponse).toEqual(1);
    expect(counter).toEqual(2);
  })