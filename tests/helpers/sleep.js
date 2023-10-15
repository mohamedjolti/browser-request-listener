
/**
 * @param {Number} deley
 **/
export const sleep = function (deley) {
    return new Promise(function (resolve) {
       return setTimeout(() => {
            resolve();
        }, deley);
    })
}