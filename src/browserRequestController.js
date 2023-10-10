import { applyForFetchAPi } from "./applyForFetchApi";
import { applyForXMlHttpRequest } from "./applyForXmlHttpRequest";
import { CXTR_ERROR_APPLY_CALLED_MORE_THAN_ONCE } from "./messages";
import { addNewPostSubscriber } from "./postSubscribers";
import { addNewPreSubscriber } from "./preSubscribers";



/**
* @var {boolean} isAlredyApplied the change of native function should be singelton
*/
let isAlredyApplied = false;


export const setIsAlredyApplied = function (status) {
    isAlredyApplied = status;
}

export class BrowserRequestController {

    /**
     * @param {{
     * reportOnError:function(),
     * filters : {{
     *   disabelForFetchApi : boolean,
     *   disabelForXhr: boolean
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
            if (!this.configuration.filters?.disabelForFetchApi) {
                applyForFetchAPi(this.configuration);
            }
            if (!this.configuration.filters?.disabelForXhr) {
                applyForXMlHttpRequest(this.configuration);
            }
        } else {
            throw new Error(CXTR_ERROR_APPLY_CALLED_MORE_THAN_ONCE);
        }
    }
}
