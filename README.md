# browser-request-listener
Execute callbacks before or after each **fetch api** call  or **XMlHttprequest** call
(Note that the real fetch api and XmlHttpRequest calls are not affected ) 
# Install
```
npm install browser-request-listener
```

# Usage & Api
- 1 Create an instance of the BrowserRequestListener :    
  The **reportOnError** is a callback used when an error occured in a listner 
  ,the argument **filters.disableForXHr** allow you to disable listneres (pre and post)  for Xhr calls
  the argument **filters.disableForFetch** allow you to disable listneres (pre and post)  for Fetch api calls
 
   

```javascript

import { BrowserRequestListener } from "browser-request-listener";

 

const browserRequestListener = new BrowserRequestListener({
  reportOnError: function (error, event) {
    console.log("report error", error);
  },
  filters: {
    // disableForXHr : true
    // disableForFetch : true, 
  }
});


```
- 2 Add a PreListener for each request :    
  the **params** argument contains the payload of the request,
  the **sender** is an object that allows you to check if the request has been performed by Fetch or Xhr and the sender instance is the XHr instance or the fetch call 

```javascript
browserRequestListener.addPreHttpRequestListener(function (params,/**@type {Sender}  */ sender) {
  if (sender.getSenderType() == "XHR") {
    console.log("called before XHR", params, sender);
  } else if (sender.getSenderType() == "FETCH_API") {
    console.log("called before Fetch API", params, sender);
  }
});

  ```
- 3 Add a PostListener for each request :   
  The **response** argument contains the response of the request
  the **sender** is an object that allows you to check if the request has been performed by Fetch or Xhr and the sender instance is the XHr instance or the fetch call 
  
```javascript

  browserRequestListener.addPostHttpRequestListener(function (response, /**@type {Sender}  */ sender) {
  if (sender.getSenderType() == "XHR") {
    console.log("called after XML http request", response, sender))

  } else if (sender.getSenderType() == "FETCH_API") {
    console.log("called after Fetch API", response, sender);
  }
});

  ```
- 4 Finally call the medthod apply , this method should be called once
```javascript

  browserRequestListener.apply();

  ```
 done , all the request in your page will be tracked with your listeners.