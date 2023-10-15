import { BrowserRequestController } from "./src/browserRequestController";
import { FETCH_API, Sender, XHR } from "./src/Sender";
import { postXhrSuccess } from "./tests/calls/postXhrSuccess";



const browserRequestController = new BrowserRequestController({
  reportOnError: function (error, event) {
    console.log("report error", error);
  },
  filters: {
    // disableForXHr : true
    // disableForFetch : true, 
  }
});


browserRequestController.addPreHttpRequestListener(function (params,/**@type {Sender}  */ sender) {
  if (sender.getSenderType() == XHR) {
    console.log("called before XHR", params, sender);
  } else if (sender.getSenderType() == FETCH_API) {
    console.log("called before Fetch API", params, sender);
  }
});



browserRequestController.addPostHttpRequestListener(function (response, /**@type {Sender}  */ sender) {
  if (sender.getSenderType() == XHR) {
    const XHR_INSTANCE = sender.getSenderIntance();
    console.log("called after XML http request", response)
    if (XHR_INSTANCE.status != 201) {
      console.log("error : ", XHR_INSTANCE.status)
    }

  } else if (sender.getSenderType() == FETCH_API) {
    console.log("called after Fetch API", response, sender);
  }
}); 

browserRequestController.apply();

postXhrSuccess();