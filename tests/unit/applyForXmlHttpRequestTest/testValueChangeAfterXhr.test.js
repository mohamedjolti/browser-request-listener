import { FETCH_API, XHR } from "../../../src/Sender";
import { BrowserRequestController } from "../../../src/browserRequestController";
import { expect, test } from '@jest/globals';
import jest from 'jest-mock';



let counter = 0;

function createXHRmock() {
    const open = jest.genMockFn();

    // be aware we use *function* because we need to get *this* 
    // from *new XmlHttpRequest()* call
    const send = jest.genMockFn().mockImplementationOnce(function(){   
        onload = this.onload.bind(this);
        onerror = this.onerror.bind(this);
    });

    const xhrMockClass = function () {
        return {
            open,
            send
        };
    };

    global.XMLHttpRequest = jest.genMockFn().mockImplementationOnce(xhrMockClass);
}
createXHRmock();

beforeEach(() => {
    counter = 0;
    createXHRmock();
});


it("test value chanage after XmlHttp Request", async function () {
    const browserRequestController = new BrowserRequestController({
        reportOnError: function (error, event) {
            console.log("report error", error);
        },
        filters: {
            // disabelForXhr: true,
            disabelForFetchApi: true
        },
        test: true
    });


    browserRequestController.addPreHttpRequestListener(function (params,/**@type {Sender}  */ sender) {
        if (sender.getSenderType() == XHR) {
            counter = counter + 1;
        } else if (sender.getSenderType() == FETCH_API) {
        }
    });

    browserRequestController.apply();

    expect(counter).toEqual(0);
    const apiUrl = 'https://jsonplaceholder.typicode.com/posts';

    const xhr = new XMLHttpRequest();
    xhr.onload = () => {
        if (xhr.status === 200) {
            const posts = JSON.parse(xhr.responseText);
            counter = counter * 2
        } else {
            console.log('Server response:', xhr.status);
        }
    };
    xhr.onerror = () => {
        console.log('An error occurred, not able to process the request.');
    };
    xhr.open('GET', apiUrl, true);
    let t = xhr.send();
    console.log(t)
    expect(counter).toEqual(2);
})