import { applyForFetchAPi } from "./src/applyForFetchApi";
import { applyForXMlHttpRequest } from "./src/applyForXmlHttpRequest";
import { CXTR_ERROR_APPLY_CALLED_MORE_THAN_ONCE } from "./src/messages";
import { addNewPostSubscriber } from "./src/postSubscribers";
import { addNewPreSubscriber } from "./src/preSubscribers";



/**
* @var {boolean} isAlreadyApplied the change of native function should be singelton
*/
let isAlreadyApplied = false;


export const setIsAlreadyApplied = function (status) {
    isAlreadyApplied = status;
}

export class BrowserRequestListener {

    /**
     * @param {{
     * reportOnError:function(),
     * filters : {{
     *   disableForFetch : boolean,
     *   disableForXHr: boolean
     * }}
     * 
     * }} configuration
     */
    constructor(configuration) {
        this.configuration = configuration;

    }

    /**
     * @param {function} callBack
     * 
     */
    addPreHttpRequestListener(callBack) {
        addNewPreSubscriber(callBack);
    }

    /**
    * @param {function} callBack
    */
    addPostHttpRequestListener(callBack) {
        addNewPostSubscriber(callBack)
    }

    async apply() {
        if (!isAlreadyApplied || this.configuration.test) {
            if (!this.configuration.filters?.disableForFetch) {
                applyForFetchAPi(this.configuration);
            }
            if (!this.configuration.filters?.disableForXHr) {
                applyForXMlHttpRequest(this.configuration);
            }
        } else {
            throw new Error(CXTR_ERROR_APPLY_CALLED_MORE_THAN_ONCE);
        }
    }
}

