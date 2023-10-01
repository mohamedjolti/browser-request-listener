
export const CALLED_BY_FETCH_REQUEST = "CALLED_BY_FETCH_REQUEST";
export const CALLED_BY_XHR = "CALLED_BY_XHR";

export class Sender
{

    /** 
     * @returns {Sender}
     **/
    setSenderType(type){
         this.type = type;
    }

    getSenderType(){
        return this.type;
    }
}