/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./BrowserRequestListener.js":
/*!***********************************!*\
  !*** ./BrowserRequestListener.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   BrowserRequestListener: () => (/* binding */ BrowserRequestListener),\n/* harmony export */   setIsAlreadyApplied: () => (/* binding */ setIsAlreadyApplied)\n/* harmony export */ });\n/* harmony import */ var _src_applyForFetchApi__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/applyForFetchApi */ \"./src/applyForFetchApi.js\");\n/* harmony import */ var _src_applyForXmlHttpRequest__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./src/applyForXmlHttpRequest */ \"./src/applyForXmlHttpRequest.js\");\n/* harmony import */ var _src_messages__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./src/messages */ \"./src/messages.js\");\n/* harmony import */ var _src_postSubscribers__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./src/postSubscribers */ \"./src/postSubscribers.js\");\n/* harmony import */ var _src_preSubscribers__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./src/preSubscribers */ \"./src/preSubscribers.js\");\n\n\n\n\n\n\n\n\n/**\n* @var {boolean} isAlreadyApplied the change of native function should be singelton\n*/\nlet isAlreadyApplied = false;\n\n\nconst setIsAlreadyApplied = function (status) {\n    isAlreadyApplied = status;\n}\n\nclass BrowserRequestListener {\n\n    /**\n     * @param {{\n     * reportOnError:function(),\n     * filters : {{\n     *   disableForFetch : boolean,\n     *   disableForXHr: boolean\n     * }}\n     * \n     * }} configuration\n     */\n    constructor(configuration) {\n        this.configuration = configuration;\n\n    }\n\n    /**\n     * @param {function} callBack\n     * \n     */\n    addPreHttpRequestListener(callBack) {\n        (0,_src_preSubscribers__WEBPACK_IMPORTED_MODULE_4__.addNewPreSubscriber)(callBack);\n    }\n\n    /**\n    * @param {function} callBack\n    */\n    addPostHttpRequestListener(callBack) {\n        (0,_src_postSubscribers__WEBPACK_IMPORTED_MODULE_3__.addNewPostSubscriber)(callBack)\n    }\n\n    async apply() {\n        if (!isAlreadyApplied || this.configuration.test) {\n            if (!this.configuration.filters?.disableForFetch) {\n                (0,_src_applyForFetchApi__WEBPACK_IMPORTED_MODULE_0__.applyForFetchAPi)(this.configuration);\n            }\n            if (!this.configuration.filters?.disableForXHr) {\n                (0,_src_applyForXmlHttpRequest__WEBPACK_IMPORTED_MODULE_1__.applyForXMlHttpRequest)(this.configuration);\n            }\n        } else {\n            throw new Error(_src_messages__WEBPACK_IMPORTED_MODULE_2__.CXTR_ERROR_APPLY_CALLED_MORE_THAN_ONCE);\n        }\n    }\n}\n\n\n\n//# sourceURL=webpack://browser-request-listener/./BrowserRequestListener.js?");

/***/ }),

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _BrowserRequestListener__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BrowserRequestListener */ \"./BrowserRequestListener.js\");\n\n\n \n\nconst browserRequestListener = new _BrowserRequestListener__WEBPACK_IMPORTED_MODULE_0__.BrowserRequestListener({\n  reportOnError: function (error, event) {\n    console.log(\"report error\", error);\n  },\n  filters: {\n    // disableForXHr : true\n    // disableForFetch : true, \n  }\n});\n\nbrowserRequestListener.addPreHttpRequestListener(function (params,/**@type {Sender}  */ sender) {\n  if (sender.getSenderType() == \"XHR\") {\n    console.log(\"called before XHR\", params, sender);\n  } else if (sender.getSenderType() == \"FETCH_API\") {\n    console.log(\"called before Fetch API\", params, sender);\n  }\n});\n\n  browserRequestListener.addPostHttpRequestListener(function (response, /**@type {Sender}  */ sender) {\n  if (sender.getSenderType() == \"XHR\") {\n    console.log(\"called after XML http request\", response, sender);\n  } else if (sender.getSenderType() == \"FETCH_API\") {\n    response.then(function(res){\n        console.log(res.ok)\n    })\n    console.log(\"called after Fetch API\", response, sender);\n  }\n});\n\nbrowserRequestListener.apply();\n\n\n\nfetch('https://jsonplaceholder.typicode.com/todos/1')\n      .then(function(response){\n        if(response.ok){\n            return response.json();\n        }\n        throw new Error(\"error to fetch from\");\n      }).then(function(reponseJson){\n         console.log(reponseJson);\n      }).catch(function(error){\n        console.log(\"hi\" + error);\n      })\n\n//# sourceURL=webpack://browser-request-listener/./index.js?");

/***/ }),

/***/ "./src/Sender.js":
/*!***********************!*\
  !*** ./src/Sender.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   FETCH_API: () => (/* binding */ FETCH_API),\n/* harmony export */   Sender: () => (/* binding */ Sender),\n/* harmony export */   XHR: () => (/* binding */ XHR)\n/* harmony export */ });\n\nconst FETCH_API = \"FETCH_API\";\nconst XHR = \"XHR\";\n\nclass Sender\n{\n\n    /** \n     * @returns {Sender}\n     **/\n    setSenderType(type){\n         this.type = type;\n         return this;\n    }\n\n    getSenderType(){\n        return this.type;\n    }\n\n    setSenderInstance(senderInstance){\n        this.senderInstance = senderInstance;\n    }\n    getSenderInstance(){\n        return this.senderInstance;\n    }\n}\n\n//# sourceURL=webpack://browser-request-listener/./src/Sender.js?");

/***/ }),

/***/ "./src/applyForFetchApi.js":
/*!*********************************!*\
  !*** ./src/applyForFetchApi.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   applyForFetchAPi: () => (/* binding */ applyForFetchAPi)\n/* harmony export */ });\n/* harmony import */ var _Sender__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Sender */ \"./src/Sender.js\");\n/* harmony import */ var _BrowserRequestListener__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../BrowserRequestListener */ \"./BrowserRequestListener.js\");\n/* harmony import */ var _defaultReport__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./defaultReport */ \"./src/defaultReport.js\");\n/* harmony import */ var _postSubscribers__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./postSubscribers */ \"./src/postSubscribers.js\");\n/* harmony import */ var _preSubscribers__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./preSubscribers */ \"./src/preSubscribers.js\");\n\n\n\n\n\n\nconst applyForFetchAPi = function(configuration) {\n    /*  Create the sender   */\n    const sender = new _Sender__WEBPACK_IMPORTED_MODULE_0__.Sender();\n    sender.setSenderType(_Sender__WEBPACK_IMPORTED_MODULE_0__.FETCH_API);\n    /*  Store the old fetch api  */\n    const OLD_FETCH = fetch;\n    /*  Calling our callbacks   */\n    fetch = function () {\n        try {\n            sender.setSenderInstance(OLD_FETCH);\n            (0,_preSubscribers__WEBPACK_IMPORTED_MODULE_4__.dispatchPreSubscribers)(arguments, sender, configuration.reportOnError);\n        } catch (error) {\n            (0,_defaultReport__WEBPACK_IMPORTED_MODULE_2__.reportConfigOrDefault)({\n                sender,\n                error,\n                reportOnError:configuration.reportOnError\n            });\n        }\n        /*  calling the old fetch api   */\n        const callOldFetch = OLD_FETCH.apply(this, arguments);\n        callOldFetch.then(function (result) {\n            /*  avoid chaining the original result  */\n            const playableResult = Promise.resolve(result.clone());\n            try {\n                sender.setSenderInstance(callOldFetch);\n                (0,_postSubscribers__WEBPACK_IMPORTED_MODULE_3__.dispatchPostSubscribers)(playableResult, sender, configuration.reportOnError);\n            } catch (error) {\n                (0,_defaultReport__WEBPACK_IMPORTED_MODULE_2__.reportConfigOrDefault)({\n                    sender,\n                    error,\n                    reportOnError:configuration.reportOnError\n                });\n            }\n        })\n        ;(0,_BrowserRequestListener__WEBPACK_IMPORTED_MODULE_1__.setIsAlreadyApplied)(true);\n        return callOldFetch;\n    };\n}\n\n//# sourceURL=webpack://browser-request-listener/./src/applyForFetchApi.js?");

/***/ }),

/***/ "./src/applyForXmlHttpRequest.js":
/*!***************************************!*\
  !*** ./src/applyForXmlHttpRequest.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   applyForXMlHttpRequest: () => (/* binding */ applyForXMlHttpRequest)\n/* harmony export */ });\n/* harmony import */ var _BrowserRequestListener__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../BrowserRequestListener */ \"./BrowserRequestListener.js\");\n/* harmony import */ var _defaultReport__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./defaultReport */ \"./src/defaultReport.js\");\n/* harmony import */ var _postSubscribers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./postSubscribers */ \"./src/postSubscribers.js\");\n/* harmony import */ var _preSubscribers__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./preSubscribers */ \"./src/preSubscribers.js\");\n/* harmony import */ var _Sender__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Sender */ \"./src/Sender.js\");\n\n\n\n\n\n\nconst XHR_REQUEST_DONE = 4;\n\n\nconst applyForXMlHttpRequest = function (configuration) {\n    const sender = new _Sender__WEBPACK_IMPORTED_MODULE_4__.Sender();\n    sender.setSenderType(_Sender__WEBPACK_IMPORTED_MODULE_4__.XHR);\n\n    const OLD_SEND = XMLHttpRequest.prototype.send;\n    XMLHttpRequest.prototype.send = function () {\n        this.addEventListener(\"readystatechange\", function () {\n            if (this.readyState == XHR_REQUEST_DONE) {\n                (0,_postSubscribers__WEBPACK_IMPORTED_MODULE_2__.dispatchPostSubscribers)(this.response, sender, configuration.reportOnError);\n            }\n        })\n        this.addEventListener(\"error\", function(event){            \n            ;(0,_defaultReport__WEBPACK_IMPORTED_MODULE_1__.reportConfigOrDefault)({\n                sender,\n                error: 'ERROR', // hard coding a value here, because there is no error defined\n                reportOnError: configuration.reportOnError,\n                event\n            });\n        })\n        try {\n            sender.setSenderInstance(this);\n            (0,_preSubscribers__WEBPACK_IMPORTED_MODULE_3__.dispatchPreSubscribers)(arguments, sender, configuration.reportOnError);\n        } catch (error) {\n            (0,_defaultReport__WEBPACK_IMPORTED_MODULE_1__.reportConfigOrDefault)({\n                sender,\n                error,\n                reportOnError: configuration.reportOnError\n            });\n        } finally {\n            (0,_BrowserRequestListener__WEBPACK_IMPORTED_MODULE_0__.setIsAlreadyApplied)(true);\n            OLD_SEND.apply(this, arguments);\n        }\n    }\n}\n\n//# sourceURL=webpack://browser-request-listener/./src/applyForXmlHttpRequest.js?");

/***/ }),

/***/ "./src/defaultReport.js":
/*!******************************!*\
  !*** ./src/defaultReport.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   reportConfigOrDefault: () => (/* binding */ reportConfigOrDefault)\n/* harmony export */ });\n/* harmony import */ var _Sender__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Sender */ \"./src/Sender.js\");\n\n\n\n/**\n * \n * @param {{\n *   sender : Sender,\n *   event : Event,\n *   error : Error,\n *   reportOnError: function()\n * }} params\n */\n\nconst reportConfigOrDefault = function(params){\n    if(params.reportOnError){\n        return Promise.resolve(params.reportOnError(params.error, params.event))\n    }\n    // Case when event onError of XHR fired\n    if(params.event){\n        console.error(`${params.event.type}: ${params.event.loaded} bytes transferred\\n`);\n    }else{\n        console.error(params.error)\n    }\n}\n\n//# sourceURL=webpack://browser-request-listener/./src/defaultReport.js?");

/***/ }),

/***/ "./src/messages.js":
/*!*************************!*\
  !*** ./src/messages.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   CXTR_ERROR_APPLY_CALLED_MORE_THAN_ONCE: () => (/* binding */ CXTR_ERROR_APPLY_CALLED_MORE_THAN_ONCE),\n/* harmony export */   CXTR_ERROR_CALLBACK: () => (/* binding */ CXTR_ERROR_CALLBACK)\n/* harmony export */ });\nconst CXHTR_ERROR = \"Error in BrowserRequestListener : \";\nconst CXTR_ERROR_CALLBACK = CXHTR_ERROR + \"Error while calling Callback\";\nconst CXTR_ERROR_APPLY_CALLED_MORE_THAN_ONCE = CXHTR_ERROR + \"Apply method should be called once\"; \n\n//# sourceURL=webpack://browser-request-listener/./src/messages.js?");

/***/ }),

/***/ "./src/postSubscribers.js":
/*!********************************!*\
  !*** ./src/postSubscribers.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   addNewPostSubscriber: () => (/* binding */ addNewPostSubscriber),\n/* harmony export */   dispatchPostSubscribers: () => (/* binding */ dispatchPostSubscribers)\n/* harmony export */ });\n/* harmony import */ var _defaultReport__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./defaultReport */ \"./src/defaultReport.js\");\n\n\nconst postSubscribers = [];\n\n\nconst dispatchPostSubscribers = function (result,/**@type {Sender} */sender,/**@type {function} */ reportOnError) {\n    for (let subscriber of postSubscribers) {\n        try {\n            subscriber(result, sender);\n        } catch (error) {\n            (0,_defaultReport__WEBPACK_IMPORTED_MODULE_0__.reportConfigOrDefault)({\n                sender,\n                error,\n                reportOnError\n            });\n        }\n    }\n}\n\n\n/**\n *@function subscriber \n */\nconst addNewPostSubscriber = function (subscriber) {\n    if (subscriber) {\n        postSubscribers.push(subscriber);\n    }\n}\n\n//# sourceURL=webpack://browser-request-listener/./src/postSubscribers.js?");

/***/ }),

/***/ "./src/preSubscribers.js":
/*!*******************************!*\
  !*** ./src/preSubscribers.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   addNewPreSubscriber: () => (/* binding */ addNewPreSubscriber),\n/* harmony export */   dispatchPreSubscribers: () => (/* binding */ dispatchPreSubscribers)\n/* harmony export */ });\n/* harmony import */ var _defaultReport__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./defaultReport */ \"./src/defaultReport.js\");\n\n\nconst preSubscribers = [];\n\nconst dispatchPreSubscribers = function (params,/**@type {Sender} */ sender, /**@type {function} */ reportOnError) {\n    for (let subscriber of preSubscribers) {\n        try {\n            subscriber(params, sender);\n        } catch (error) {\n            (0,_defaultReport__WEBPACK_IMPORTED_MODULE_0__.reportConfigOrDefault)({\n                sender,\n                error,\n                reportOnError\n            });\n        }\n    }\n}\n\n/**\n *@function subscriber \n */\n const addNewPreSubscriber = function(subscriber){\n    if(subscriber){\n        preSubscribers.push(subscriber);\n    }\n}\n\n//# sourceURL=webpack://browser-request-listener/./src/preSubscribers.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./index.js");
/******/ 	
/******/ })()
;