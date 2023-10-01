import { CALLED_BY_FETCH_REQUEST, CALLED_BY_XHR, Sender } from "./Sender";
import { CXTR_ERROR_APPLY_CALLED_MORE_THAN_ONCE, CXTR_ERROR_CALLBACK } from "./messages";


/**
* @var {boolean} isControlXmlHttpRequestUsed
*/
let isControlXmlHttpRequestUsed = false;

const beforeSubscribers = [];
const afterSubscribers = [];

const dispatchAfterSubscribers = function (result,/**@type {Sender} */sender,/**@type {function} */ reportOnError) {
    for (let subscriber of afterSubscribers) {
        try {
            subscriber(result, sender);
        } catch (error) {
            reportOnError(error);
        }
    }
}

const dispatchBeforeSubscribers = function (params,/**@type {Sender} */ sender, /**@type {function} */ reportOnError) {
    for (let subscriber of beforeSubscribers) {
        try {
            subscriber(params, sender);
        } catch (error) {
            reportOnError(error)
        }
    }
}

export class ControlXmlHttpRequest {

    /**
     * @param {{
     *    reportError: {function}
     * }} configuration
     */
    constructor(configuration) {
        this.configuration = configuration;

    }

    /**
     * @param {function} callBack
     * 
     */
    callbackBeforeHttpRequest(callBack) {
        beforeSubscribers.push(callBack);
    }

    /**
    * @param {function} callBack
    */
    callbackAfterHttpRequest(callBack) {
        afterSubscribers.push(callBack);
    }

    async apply() {
        if (!isControlXmlHttpRequestUsed) {
            this.applyForXMlHttpRequest();
            this.applyForFetchAPi();
        } else {
            throw new console.warn(CXTR_ERROR_APPLY_CALLED_MORE_THAN_ONCE);
        }
    }


    applyForFetchAPi() {
        /*  Store the old fetch api  */
        const OLD_FETCH = window.fetch;
        const sender = new Sender();
        sender.setSenderType(CALLED_BY_FETCH_REQUEST);
        const configuration = this.configuration
        /*  Calling our calbacks   */
        window.fetch = function () {
            try {
                dispatchBeforeSubscribers(arguments, sender, configuration.reportOnError);
            } catch (error) {
                configuration.reportError(error);
            }
            /*  calling the old fetch api   */
            const callOldFetch = OLD_FETCH.apply(this, arguments);
            callOldFetch.then(function (result) {
                /*  avoid chaning the original result  */
                const playableResult = Promise.resolve(result.clone());
                try {
                    dispatchAfterSubscribers(playableResult, sender, configuration.reportOnError);
                } catch (error) {
                    configuration.reportError(error);
                }
            })
            return callOldFetch;
        };
    }

    applyForXMlHttpRequest() {
        const OLD_SEND = window.XMLHttpRequest.prototype.send;
        const configuration = this.configuration
        const sender = new Sender();
        sender.setSenderType(CALLED_BY_XHR);
        window.XMLHttpRequest.prototype.send = function () {
            try {
                dispatchBeforeSubscribers(arguments, sender, configuration.reportOnError);
            } catch (error) {
                configuration.reportError(error);
            } finally {
                isControlXmlHttpRequestUsed = true;
                OLD_SEND.apply(this, arguments);
            }
        }
    }


}