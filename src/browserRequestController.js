import { FETCH_API, XHR, Sender } from "./Sender";
import { applyForFetchAPi } from "./applyForFetchApi";
import { applyForXMlHttpRequest } from "./applyForXmlHttpRequest";
import { reportConfigOrDefault } from "./defaultReport";
import { CXTR_ERROR_APPLY_CALLED_MORE_THAN_ONCE } from "./messages";
import { addNewPostSubscriber } from "./postSubscribers";
import { addNewPreSubscriber } from "./preSubscribers";



/**
* @var {boolean} isAlredyApplied the change of native function should be singelton
*/
let isAlredyApplied = false;


export const setIsAlredyApplied = function(status){
  isAlredyApplied = status;
}

export class BrowserRequestController {

    /**
     * @param {JSON} configuration
     */
    constructor(configuration) {
        this.configuration = configuration;

    }

    /**
     * @param {function} callBack
     * 
     */
    callbackPreHttpRequest(callBack) {
        addNewPreSubscriber(callBack);
    }

    /**
    * @param {function} callBack
    */
    callbackPostHttpRequest(callBack) {
        addNewPostSubscriber(callBack)
    }

    async apply() {
        if (!isAlredyApplied) {
            if (!this.configuration.filters.disabelForFetchApi) {
                applyForFetchAPi(this.configuration);
            }
            if (!this.configuration.filters.disabelForXhr) {
                applyForXMlHttpRequest(this.configuration);
            }
        } else {
            throw new console.warn(CXTR_ERROR_APPLY_CALLED_MORE_THAN_ONCE);
        }
    }


}
