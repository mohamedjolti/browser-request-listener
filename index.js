import { applyForFetchAPi } from "./src/applyForFetchApi";
import { applyForXMlHttpRequest } from "./src/applyForXmlHttpRequest";
import { CXTR_ERROR_APPLY_CALLED_MORE_THAN_ONCE } from "./src/messages";
import { addNewPostSubscriber } from "./src/postSubscribers";
import { addNewPreSubscriber } from "./src/preSubscribers";



/**
* @var {boolean} isAlredyApplied the change of native function should be singelton
*/
let isAlredyApplied = false;


export const setIsAlredyApplied = function (status) {
    isAlredyApplied = status;
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
        if (!isAlredyApplied || this.configuration.test) {
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

