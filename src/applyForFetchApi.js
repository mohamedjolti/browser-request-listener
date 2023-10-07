import { FETCH_API, Sender } from "./Sender";
import { setIsAlredyApplied } from "./browserRequestController";
import { reportConfigOrDefault } from "./defaultReport";
import { dispatchPostSubscribers } from "./postSubscribers";
import { dispatchPreSubscribers } from "./preSubscribers";

export const applyForFetchAPi = function(configuration) {
    /*  Create the sender   */
    const sender = new Sender();
    sender.setSenderType(FETCH_API);
    /*  Store the old fetch api  */
    const OLD_FETCH = window.fetch;
    /*  Calling our calbacks   */
    window.fetch = function () {
        try {
            sender.setSenderIntance(this);
            dispatchPreSubscribers(arguments, sender, configuration.reportOnError);
        } catch (error) {
            reportConfigOrDefault({
                sender,
                error,
                reportOnError:configuration.reportOnError
            });
        }
        /*  calling the old fetch api   */
        const callOldFetch = OLD_FETCH.apply(this, arguments);
        callOldFetch.then(function (result) {
            /*  avoid chaning the original result  */
            const playableResult = Promise.resolve(result.clone());
            try {
                sender.setSenderIntance(this);
                dispatchPostSubscribers(playableResult, sender, configuration.reportOnError);
            } catch (error) {
                reportConfigOrDefault({
                    sender,
                    error,
                    reportOnError:configuration.reportOnError
                });
            }
        })
        setIsAlredyApplied(true);
        return callOldFetch;
    };
}