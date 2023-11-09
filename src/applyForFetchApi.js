import { FETCH_API, Sender } from "./Sender";
import { setIsAlreadyApplied } from "../BrowserRequestListener";
import { reportConfigOrDefault } from "./defaultReport";
import { dispatchPostSubscribers } from "./postSubscribers";
import { dispatchPreSubscribers } from "./preSubscribers";

export const applyForFetchAPi = function(configuration) {
    /*  Create the sender   */
    const sender = new Sender();
    sender.setSenderType(FETCH_API);
    /*  Store the old fetch api  */
    const OLD_FETCH = fetch;
    /*  Calling our callbacks   */
    fetch = async function() {
        try {
            sender.setSenderInstance(OLD_FETCH);
            dispatchPreSubscribers(arguments, sender, configuration.reportOnError);
            let [resource, config] = arguments;
            const result = await OLD_FETCH(resource, config);
            setIsAlreadyApplied(true);
            if (result && result.clone) {
                const playableResult = Promise.resolve(result.clone());
                dispatchPostSubscribers(playableResult, sender, configuration.reportOnError);
            } else if (result && !result.ok) {
                return Promise.reject(result);
            }
            return result;
        } catch (error) {
            reportConfigOrDefault({
                sender,
                error,
                reportOnError:configuration.reportOnError
            });
            return Promise.reject(error);
        }
    };
}