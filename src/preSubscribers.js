import { reportConfigOrDefault } from "./defaultReport";

const preSubscribers = [];

export const dispatchPreSubscribers = function (params,/**@type {Sender} */ sender, /**@type {function} */ reportOnError) {
    for (let subscriber of preSubscribers) {
        try {
            subscriber(params, sender);
        } catch (error) {
            reportConfigOrDefault({
                sender,
                error,
                reportOnError
            });
        }
    }
}

/**
 *@function subscriber 
 */
 export const addNewPreSubscriber = function(subscriber){
    if(subscriber){
        preSubscribers.push(subscriber);
    }
}