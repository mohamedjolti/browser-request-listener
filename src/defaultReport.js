import { Sender } from "./Sender"


/**
 * 
 * @param {{
 *   sender : Sender,
 *   event : Event
 *   error : Error
 *   reportOnError: function()
 * }} params
 */

export const reportConfigOrDefault = function(params){
    console.log(params)
    if(params.reportOnError){
        return Promise.resolve(params.reportOnError(params.error, params.event))
    }
    // Case when event onError of XHR fired
    if(params.event){
        console.error(`${params.event.type}: ${params.event.loaded} bytes transferred\n`);
    }else{
        console.error(params.error)
    }
}