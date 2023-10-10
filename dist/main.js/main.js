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

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _src_browserRequestController__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/browserRequestController */ \"./src/browserRequestController.js\");\n/* harmony import */ var _src_Sender__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./src/Sender */ \"./src/Sender.js\");\n/* harmony import */ var _tests_calls_postXhrFailed__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./tests/calls/postXhrFailed */ \"./tests/calls/postXhrFailed.js\");\n\n\n\n\n\n\nconst browserRequestController = new _src_browserRequestController__WEBPACK_IMPORTED_MODULE_0__.BrowserRequestController({\n   reportOnError: function (error, event) {\n      console.log(\"report error\",error);\n   },\n  filters: {\n    // disabelForXhr : true\n    // disabelForFetchApi : true, \n  }\n});\n\n\nbrowserRequestController.addPreHttpRequestListener(function (params,/**@type {Sender}  */ sender) {\n  if (sender.getSenderType() == _src_Sender__WEBPACK_IMPORTED_MODULE_1__.XHR) {\n    console.log(\"called before XHR\", params, sender);\n  } else if (sender.getSenderType() == _src_Sender__WEBPACK_IMPORTED_MODULE_1__.FETCH_API) {\n    console.log(\"called before Fetch API\", params, sender);\n  }\n});\n\n\n\nbrowserRequestController.addPostHttpRequestListener(function (response, /**@type {Sender}  */ sender) {\n  if (sender.getSenderType() == _src_Sender__WEBPACK_IMPORTED_MODULE_1__.XHR) {\n    const XHR_INSTANCE = sender.getSenderIntance();\n    console.log(\"called after XML http request\")\n    if (XHR_INSTANCE.status != 201) {\n      console.log(\"error : \", XHR_INSTANCE.status)\n    }\n\n  } else if (sender.getSenderType() == _src_Sender__WEBPACK_IMPORTED_MODULE_1__.FETCH_API) {\n    console.log(\"called after Fetch API\", response, sender);\n  }\n});\n\nbrowserRequestController.apply();\n\n\n\n\n\n//# sourceURL=webpack://control-xml-http-request/./index.js?");

/***/ }),

/***/ "./src/Sender.js":
/*!***********************!*\
  !*** ./src/Sender.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   FETCH_API: () => (/* binding */ FETCH_API),\n/* harmony export */   Sender: () => (/* binding */ Sender),\n/* harmony export */   XHR: () => (/* binding */ XHR)\n/* harmony export */ });\n\nconst FETCH_API = \"FETCH_API\";\nconst XHR = \"XHR\";\n\nclass Sender\n{\n\n    /** \n     * @returns {Sender}\n     **/\n    setSenderType(type){\n         this.type = type;\n         return this;\n    }\n\n    getSenderType(){\n        return this.type;\n    }\n\n    setSenderIntance(senderInstance){\n        this.senderInstance = senderInstance;\n    }\n    getSenderIntance(){\n        return this.senderInstance;\n    }\n}\n\n//# sourceURL=webpack://control-xml-http-request/./src/Sender.js?");

/***/ }),

/***/ "./src/applyForFetchApi.js":
/*!*********************************!*\
  !*** ./src/applyForFetchApi.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   applyForFetchAPi: () => (/* binding */ applyForFetchAPi)\n/* harmony export */ });\n/* harmony import */ var _Sender__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Sender */ \"./src/Sender.js\");\n/* harmony import */ var _browserRequestController__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./browserRequestController */ \"./src/browserRequestController.js\");\n/* harmony import */ var _defaultReport__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./defaultReport */ \"./src/defaultReport.js\");\n/* harmony import */ var _postSubscribers__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./postSubscribers */ \"./src/postSubscribers.js\");\n/* harmony import */ var _preSubscribers__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./preSubscribers */ \"./src/preSubscribers.js\");\n\n\n\n\n\n\nconst applyForFetchAPi = function(configuration) {\n    /*  Create the sender   */\n    const sender = new _Sender__WEBPACK_IMPORTED_MODULE_0__.Sender();\n    sender.setSenderType(_Sender__WEBPACK_IMPORTED_MODULE_0__.FETCH_API);\n    /*  Store the old fetch api  */\n    const OLD_FETCH = fetch;\n    /*  Calling our calbacks   */\n    fetch = function () {\n        try {\n            sender.setSenderIntance(OLD_FETCH);\n            (0,_preSubscribers__WEBPACK_IMPORTED_MODULE_4__.dispatchPreSubscribers)(arguments, sender, configuration.reportOnError);\n        } catch (error) {\n            (0,_defaultReport__WEBPACK_IMPORTED_MODULE_2__.reportConfigOrDefault)({\n                sender,\n                error,\n                reportOnError:configuration.reportOnError\n            });\n        }\n        /*  calling the old fetch api   */\n        const callOldFetch = OLD_FETCH.apply(this, arguments);\n        callOldFetch.then(function (result) {\n            /*  avoid chaning the original result  */\n            const playableResult = Promise.resolve(result.clone());\n            try {\n                sender.setSenderIntance(callOldFetch);\n                (0,_postSubscribers__WEBPACK_IMPORTED_MODULE_3__.dispatchPostSubscribers)(playableResult, sender, configuration.reportOnError);\n            } catch (error) {\n                (0,_defaultReport__WEBPACK_IMPORTED_MODULE_2__.reportConfigOrDefault)({\n                    sender,\n                    error,\n                    reportOnError:configuration.reportOnError\n                });\n            }\n        })\n        ;(0,_browserRequestController__WEBPACK_IMPORTED_MODULE_1__.setIsAlredyApplied)(true);\n        return callOldFetch;\n    };\n}\n\n//# sourceURL=webpack://control-xml-http-request/./src/applyForFetchApi.js?");

/***/ }),

/***/ "./src/applyForXmlHttpRequest.js":
/*!***************************************!*\
  !*** ./src/applyForXmlHttpRequest.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   applyForXMlHttpRequest: () => (/* binding */ applyForXMlHttpRequest)\n/* harmony export */ });\n/* harmony import */ var _browserRequestController__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./browserRequestController */ \"./src/browserRequestController.js\");\n/* harmony import */ var _defaultReport__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./defaultReport */ \"./src/defaultReport.js\");\n/* harmony import */ var _postSubscribers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./postSubscribers */ \"./src/postSubscribers.js\");\n/* harmony import */ var _preSubscribers__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./preSubscribers */ \"./src/preSubscribers.js\");\n/* harmony import */ var _Sender__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Sender */ \"./src/Sender.js\");\n\n\n\n\n\n\nconst XHR_REQUEST_DONE = 4;\n\n\nconst applyForXMlHttpRequest = function (configuration) {\n    const sender = new _Sender__WEBPACK_IMPORTED_MODULE_4__.Sender();\n    sender.setSenderType(_Sender__WEBPACK_IMPORTED_MODULE_4__.XHR);\n\n    const OLD_SEND = XMLHttpRequest.prototype.send;\n    XMLHttpRequest.prototype.send = function () {\n        this.addEventListener(\"readystatechange\", function () {\n            if (this.readyState == XHR_REQUEST_DONE) {\n                sender.setSenderIntance(this);\n                (0,_postSubscribers__WEBPACK_IMPORTED_MODULE_2__.dispatchPostSubscribers)(this.response, sender, configuration.reportOnError);\n            }\n        })\n        this.addEventListener(\"error\", function(event){            \n            ;(0,_defaultReport__WEBPACK_IMPORTED_MODULE_1__.reportConfigOrDefault)({\n                sender,\n                error,\n                reportOnError: configuration.reportOnError,\n                event\n            });\n        })\n        try {\n            ;(0,_preSubscribers__WEBPACK_IMPORTED_MODULE_3__.dispatchPreSubscribers)(arguments, sender, configuration.reportOnError);\n        } catch (error) {\n            (0,_defaultReport__WEBPACK_IMPORTED_MODULE_1__.reportConfigOrDefault)({\n                sender,\n                error,\n                reportOnError: configuration.reportOnError\n            });\n        } finally {\n            (0,_browserRequestController__WEBPACK_IMPORTED_MODULE_0__.setIsAlredyApplied)(true);\n            OLD_SEND.apply(this, arguments);\n        }\n    }\n}\n\n//# sourceURL=webpack://control-xml-http-request/./src/applyForXmlHttpRequest.js?");

/***/ }),

/***/ "./src/browserRequestController.js":
/*!*****************************************!*\
  !*** ./src/browserRequestController.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   BrowserRequestController: () => (/* binding */ BrowserRequestController),\n/* harmony export */   setIsAlredyApplied: () => (/* binding */ setIsAlredyApplied)\n/* harmony export */ });\n/* harmony import */ var _applyForFetchApi__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./applyForFetchApi */ \"./src/applyForFetchApi.js\");\n/* harmony import */ var _applyForXmlHttpRequest__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./applyForXmlHttpRequest */ \"./src/applyForXmlHttpRequest.js\");\n/* harmony import */ var _messages__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./messages */ \"./src/messages.js\");\n/* harmony import */ var _postSubscribers__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./postSubscribers */ \"./src/postSubscribers.js\");\n/* harmony import */ var _preSubscribers__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./preSubscribers */ \"./src/preSubscribers.js\");\n\n\n\n\n\n\n\n\n/**\n* @var {boolean} isAlredyApplied the change of native function should be singelton\n*/\nlet isAlredyApplied = false;\n\n\nconst setIsAlredyApplied = function (status) {\n    isAlredyApplied = status;\n}\n\nclass BrowserRequestController {\n\n    /**\n     * @param {{\n     * reportOnError:function(),\n     * filters : {{\n     *   disabelForFetchApi : boolean,\n     *   disabelForXhr: boolean\n     * }}\n     * \n     * }} configuration\n     */\n    constructor(configuration) {\n        this.configuration = configuration;\n\n    }\n\n    /**\n     * @param {function} callBack\n     * \n     */\n    addPreHttpRequestListener(callBack) {\n        (0,_preSubscribers__WEBPACK_IMPORTED_MODULE_4__.addNewPreSubscriber)(callBack);\n    }\n\n    /**\n    * @param {function} callBack\n    */\n    addPostHttpRequestListener(callBack) {\n        (0,_postSubscribers__WEBPACK_IMPORTED_MODULE_3__.addNewPostSubscriber)(callBack)\n    }\n\n    async apply() {\n        if (!isAlredyApplied || this.configuration.test) {\n            if (!this.configuration.filters?.disabelForFetchApi) {\n                (0,_applyForFetchApi__WEBPACK_IMPORTED_MODULE_0__.applyForFetchAPi)(this.configuration);\n            }\n            if (!this.configuration.filters?.disabelForXhr) {\n                (0,_applyForXmlHttpRequest__WEBPACK_IMPORTED_MODULE_1__.applyForXMlHttpRequest)(this.configuration);\n            }\n        } else {\n            throw new Error(_messages__WEBPACK_IMPORTED_MODULE_2__.CXTR_ERROR_APPLY_CALLED_MORE_THAN_ONCE);\n        }\n    }\n}\n\n\n//# sourceURL=webpack://control-xml-http-request/./src/browserRequestController.js?");

/***/ }),

/***/ "./src/defaultReport.js":
/*!******************************!*\
  !*** ./src/defaultReport.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   reportConfigOrDefault: () => (/* binding */ reportConfigOrDefault)\n/* harmony export */ });\n/* harmony import */ var _Sender__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Sender */ \"./src/Sender.js\");\n\n\n\n/**\n * \n * @param {{\n *   sender : Sender,\n *   event : Event,\n *   error : Error,\n *   reportOnError: function()\n * }} params\n */\n\nconst reportConfigOrDefault = function(params){\n    if(params.reportOnError){\n        return Promise.resolve(params.reportOnError(params.error, params.event))\n    }\n    // Case when event onError of XHR fired\n    if(params.event){\n        console.error(`${params.event.type}: ${params.event.loaded} bytes transferred\\n`);\n    }else{\n        console.error(params.error)\n    }\n}\n\n//# sourceURL=webpack://control-xml-http-request/./src/defaultReport.js?");

/***/ }),

/***/ "./src/messages.js":
/*!*************************!*\
  !*** ./src/messages.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   CXTR_ERROR_APPLY_CALLED_MORE_THAN_ONCE: () => (/* binding */ CXTR_ERROR_APPLY_CALLED_MORE_THAN_ONCE),\n/* harmony export */   CXTR_ERROR_CALLBACK: () => (/* binding */ CXTR_ERROR_CALLBACK)\n/* harmony export */ });\nconst CXHTR_ERROR = \"Error in BrowserRequestController : \";\nconst CXTR_ERROR_CALLBACK = CXHTR_ERROR + \"Error while calling Callback\";\nconst CXTR_ERROR_APPLY_CALLED_MORE_THAN_ONCE = CXHTR_ERROR + \"Error ControlXML, appy should be called once\"; \n\n//# sourceURL=webpack://control-xml-http-request/./src/messages.js?");

/***/ }),

/***/ "./src/postSubscribers.js":
/*!********************************!*\
  !*** ./src/postSubscribers.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   addNewPostSubscriber: () => (/* binding */ addNewPostSubscriber),\n/* harmony export */   dispatchPostSubscribers: () => (/* binding */ dispatchPostSubscribers)\n/* harmony export */ });\n/* harmony import */ var _defaultReport__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./defaultReport */ \"./src/defaultReport.js\");\n\n\nconst postSubscribers = [];\n\n\nconst dispatchPostSubscribers = function (result,/**@type {Sender} */sender,/**@type {function} */ reportOnError) {\n    for (let subscriber of postSubscribers) {\n        try {\n            subscriber(result, sender);\n        } catch (error) {\n            (0,_defaultReport__WEBPACK_IMPORTED_MODULE_0__.reportConfigOrDefault)({\n                sender,\n                error,\n                reportOnError\n            });\n        }\n    }\n}\n\n\n/**\n *@function subscriber \n */\nconst addNewPostSubscriber = function (subscriber) {\n    if (subscriber) {\n        postSubscribers.push(subscriber);\n    }\n}\n\n//# sourceURL=webpack://control-xml-http-request/./src/postSubscribers.js?");

/***/ }),

/***/ "./src/preSubscribers.js":
/*!*******************************!*\
  !*** ./src/preSubscribers.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   addNewPreSubscriber: () => (/* binding */ addNewPreSubscriber),\n/* harmony export */   dispatchPreSubscribers: () => (/* binding */ dispatchPreSubscribers)\n/* harmony export */ });\n/* harmony import */ var _defaultReport__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./defaultReport */ \"./src/defaultReport.js\");\n\n\nconst preSubscribers = [];\n\nconst dispatchPreSubscribers = function (params,/**@type {Sender} */ sender, /**@type {function} */ reportOnError) {\n    for (let subscriber of preSubscribers) {\n        try {\n            subscriber(params, sender);\n        } catch (error) {\n            (0,_defaultReport__WEBPACK_IMPORTED_MODULE_0__.reportConfigOrDefault)({\n                sender,\n                error,\n                reportOnError\n            });\n        }\n    }\n}\n\n/**\n *@function subscriber \n */\n const addNewPreSubscriber = function(subscriber){\n    if(subscriber){\n        preSubscribers.push(subscriber);\n    }\n}\n\n//# sourceURL=webpack://control-xml-http-request/./src/preSubscribers.js?");

/***/ }),

/***/ "./tests/calls/postXhrFailed.js":
/*!**************************************!*\
  !*** ./tests/calls/postXhrFailed.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   postXhrfaildUrlNotFound: () => (/* binding */ postXhrfaildUrlNotFound)\n/* harmony export */ });\nconst postXhrfaildUrlNotFound = function () {\n    const apiUrl = 'https://jsonplaceholder.typicode.com/errr';\n\n    const data = JSON.stringify({\n        title: 'foo',\n        body: 'bar',\n        userId: 1\n    });\n    const xhr = new window.XMLHttpRequest();\n    xhr.onload = () => {\n        if (xhr.status === 201) {\n            const post = JSON.parse(xhr.responseText);\n            console.log(post);\n        } else {\n            console.log('Server response:', xhr.status);\n        }\n    };\n    xhr.onerror = () => {\n        console.log('An error occurred, not able to process the request.');\n    };\n    xhr.open('POST', apiUrl, true);\n    xhr.setRequestHeader('Content-Type', 'application/json');\n    xhr.send(data);\n}\n\n//# sourceURL=webpack://control-xml-http-request/./tests/calls/postXhrFailed.js?");

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