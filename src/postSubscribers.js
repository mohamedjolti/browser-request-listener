import { reportConfigOrDefault } from "./defaultReport";

const postSubscribers = [];


export const dispatchPostSubscribers = function (result,/**@type {Sender} */sender,/**@type {function} */ reportOnError) {
    for (let subscriber of postSubscribers) {
        try {
            subscriber(result, sender);
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
export const addNewPostSubscriber = function(subscriber){
    if(subscriber){
        postSubscribers.push(subscriber);
    }
   
}