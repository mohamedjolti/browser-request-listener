import { ControlXmlHttpRequest } from "./src/ControlXmlHttpRequest";
import { CALLED_BY_FETCH_REQUEST, CALLED_BY_XHR, Sender } from "./src/Sender";



const controlXMLHttpRequest = new ControlXmlHttpRequest({
  reportOnError :function(error){
      console.log(error);
  }
});


controlXMLHttpRequest.callbackBeforeHttpRequest(function (params,/**@type {Sender}  */ sender) {
   if(sender.getSenderType() == CALLED_BY_XHR){
     console.log("called before XHR");
   }else{
    console.log("called before Fetch API");
     
   }
});



controlXMLHttpRequest.callbackAfterHttpRequest(function (response) {
    console.log("after")
});

controlXMLHttpRequest.apply();

fetch('https://jsonplaceholder.typicode.com/posts', {
  method: 'POST',
  body: JSON.stringify({
    title: 'foo',
    body: 'bar',
    userId: 1,
  }),
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  },
})
  .then((response) => response.json())
  .then((json) => console.log(json));


fetch('https://jsonplaceholder.typicode.com/posts')
  .then((response) => response.json())
  .then((json) => console.log(json));



const apiUrl = 'https://jsonplaceholder.typicode.com/todos';
const xhr = new XMLHttpRequest();
xhr.onreadystatechange = function () {
  if (this.readyState === 4 && this.status === 200) {
    console.log(JSON.parse(xhr.responseText));
  }
};
xhr.open('GET', apiUrl, true);
xhr.send();