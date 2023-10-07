
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

    setSenderIntance(senderInstance){
        this.senderInstance = senderInstance;
    }
    getSenderIntance(){
        return this.senderInstance;
    }
}