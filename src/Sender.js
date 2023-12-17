
export const FETCH_API = "FETCH_API";
export const XHR = "XHR";

export class Sender
{

    /** 
     * @returns {Sender}
     **/
    setSenderType(type){
         this.type = type;
         return this;
    }

    getSenderType(){
        return this.type;
    }

    setSenderInstance(senderInstance){
        this.senderInstance = senderInstance;
    }
    getSenderInstance(){
        return this.senderInstance;
    }
}