import {  setIsAlredyApplied } from "./browserRequestController";
import { reportConfigOrDefault } from "./defaultReport";
import { dispatchPostSubscribers } from "./postSubscribers";
import { dispatchPreSubscribers } from "./preSubscribers";
import { Sender, XHR } from "./Sender";

const XHR_REQUEST_DONE = 4;


export const applyForXMlHttpRequest = function (configuration) {
    const sender = new Sender();
    sender.setSenderType(XHR);

    const OLD_SEND = window.XMLHttpRequest.prototype.send;
    window.XMLHttpRequest.prototype.send = function () {
        this.addEventListener("readystatechange", function () {
            if (this.readyState == XHR_REQUEST_DONE) {
                sender.setSenderIntance(this);
                dispatchPostSubscribers(this.response, sender, configuration.reportOnError);
            }
        })
        this.addEventListener("error", function(event){            
            reportConfigOrDefault({
                sender,
                error,
                reportOnError,
                event
            });
        })
        try {
            dispatchPreSubscribers(arguments, sender, configuration.reportOnError);
        } catch (error) {
            reportConfigOrDefault({
                sender,
                error,
                reportOnError
            });
        } finally {
            setIsAlredyApplied(true);
            OLD_SEND.apply(this, arguments);
        }
    }
}