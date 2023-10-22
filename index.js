import { BrowserRequestListener } from "./BrowserRequestListener";

 

const browserRequestListener = new BrowserRequestListener({
  reportOnError: function (error, event) {
    console.log("report error", error);
  },
  filters: {
    // disableForXHr : true
    // disableForFetch : true, 
  }
});

browserRequestListener.addPreHttpRequestListener(function (params,/**@type {Sender}  */ sender) {
  if (sender.getSenderType() == "XHR") {
    console.log("called before XHR", params, sender);
  } else if (sender.getSenderType() == "FETCH_API") {
    console.log("called before Fetch API", params, sender);
  }
});

  browserRequestListener.addPostHttpRequestListener(function (response, /**@type {Sender}  */ sender) {
  if (sender.getSenderType() == "XHR") {
    console.log("called after XML http request", response, sender);
  } else if (sender.getSenderType() == "FETCH_API") {
    response.then(function(res){
        console.log(res.ok)
    })
    console.log("called after Fetch API", response, sender);
  }
});

browserRequestListener.apply();



fetch('https://jsonplaceholder.typicode.com/todos/1')
      .then(function(response){
        if(response.ok){
            return response.json();
        }
        throw new Error("error to fetch from");
      }).then(function(reponseJson){
         console.log(reponseJson);
      }).catch(function(error){
        console.log("hi" + error);
      })