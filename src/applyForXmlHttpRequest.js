import {  setIsAlreadyApplied } from "../BrowserRequestListener";
import { reportConfigOrDefault } from "./defaultReport";
import { dispatchPostSubscribers } from "./postSubscribers";
import { dispatchPreSubscribers } from "./preSubscribers";
import { Sender, XHR } from "./Sender";

const XHR_REQUEST_DONE = 4;


export const applyForXMlHttpRequest = function (configuration) {
    const sender = new Sender();
    sender.setSenderType(XHR);

    const OLD_SEND = XMLHttpRequest.prototype.send;
    XMLHttpRequest.prototype.send = function () {
        this.addEventListener("readystatechange", function () {
            if (this.readyState == XHR_REQUEST_DONE) {
                sender.setSenderInstance(this);
                dispatchPostSubscribers(this.response, sender, configuration.reportOnError);
            }
        })
        this.addEventListener("error", function(event){            
            reportConfigOrDefault({
                sender,
                error,
                reportOnError: configuration.reportOnError,
                event
            });
        })
        try {
            dispatchPreSubscribers(arguments, sender, configuration.reportOnError);
        } catch (error) {
            reportConfigOrDefault({
                sender,
                error,
                reportOnError: configuration.reportOnError
            });
        } finally {
            setIsAlreadyApplied(true);
            OLD_SEND.apply(this, arguments);
        }
    }
}