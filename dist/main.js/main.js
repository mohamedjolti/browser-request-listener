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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _src_ControlXmlHttpRequest__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/ControlXmlHttpRequest */ \"./src/ControlXmlHttpRequest.js\");\n/* harmony import */ var _src_Sender__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./src/Sender */ \"./src/Sender.js\");\n\n\n\n\n\nconst controlXMLHttpRequest = new _src_ControlXmlHttpRequest__WEBPACK_IMPORTED_MODULE_0__.ControlXmlHttpRequest({\n  reportOnError: function (error) {\n    console.log(error);\n  }\n});\n\n\ncontrolXMLHttpRequest.callbackBeforeHttpRequest(function (params,/**@type {Sender}  */ sender) {\n  if (sender.getSenderType() == _src_Sender__WEBPACK_IMPORTED_MODULE_1__.CALLED_BY_XHR) {\n    console.log(\"called before XHR\", arguments);\n  } else if (sender.getSenderType() == _src_Sender__WEBPACK_IMPORTED_MODULE_1__.CALLED_BY_FETCH_REQUEST) {\n    console.log(\"called before Fetch API\", arguments);\n\n  }\n});\n\n\n\ncontrolXMLHttpRequest.callbackAfterHttpRequest(function (response, /**@type {Sender}  */ sender) {\n  if (sender.getSenderType() == _src_Sender__WEBPACK_IMPORTED_MODULE_1__.CALLED_BY_XHR) {\n    console.log(\"called after XHR\", response, sender);\n  } else if (sender.getSenderType() == _src_Sender__WEBPACK_IMPORTED_MODULE_1__.CALLED_BY_FETCH_REQUEST) {\n    console.log(\"called after Fetch API\", response, sender);\n  }\n});\n\ncontrolXMLHttpRequest.apply();\n\n\nfetch('https://jsonplaceholder.typicode.com/posts', {\n  method: 'POST',\n  body: JSON.stringify({\n    title: 'foo',\n    body: 'bar',\n    userId: 1,\n  }),\n  headers: {\n    'Content-type': 'application/json; charset=UTF-8',\n  },\n})\n  .then((response) => response.json())\n  .then((json) => console.log(json));\n\n\nfetch('https://jsonplaceholder.typicode.com/posts')\n  .then((response) => response.json())\n  .then((json) => console.log(json));\n\n\n\nconst apiUrl = 'https://jsonplaceholder.typicode.com/todos';\nconst xhr = new XMLHttpRequest();\nxhr.open('GET', apiUrl, true);\nxhr.send();\n\n//# sourceURL=webpack://control-xml-http-request/./index.js?");

/***/ }),

/***/ "./src/ControlXmlHttpRequest.js":
/*!**************************************!*\
  !*** ./src/ControlXmlHttpRequest.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   ControlXmlHttpRequest: () => (/* binding */ ControlXmlHttpRequest)\n/* harmony export */ });\n/* harmony import */ var _Sender__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Sender */ \"./src/Sender.js\");\n/* harmony import */ var _messages__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./messages */ \"./src/messages.js\");\n\n\n\n\n/**\n* @var {boolean} isControlXmlHttpRequestUsed\n*/\nlet isControlXmlHttpRequestUsed = false;\n\nconst beforeSubscribers = [];\nconst afterSubscribers = [];\nconst XHR_REQUEST_DONE = 4;\n\nconst dispatchAfterSubscribers = function (result,/**@type {Sender} */sender,/**@type {function} */ reportOnError) {\n    for (let subscriber of afterSubscribers) {\n        try {\n            subscriber(result, sender);\n        } catch (error) {\n            reportOnError(error);\n        }\n    }\n}\n\nconst dispatchBeforeSubscribers = function (params,/**@type {Sender} */ sender, /**@type {function} */ reportOnError) {\n    for (let subscriber of beforeSubscribers) {\n        try {\n            subscriber(params, sender);\n        } catch (error) {\n            reportOnError(error)\n        }\n    }\n}\n\nclass ControlXmlHttpRequest {\n\n    /**\n     * @param {{\n     *    reportError: {function}\n     * }} configuration\n     */\n    constructor(configuration) {\n        this.configuration = configuration;\n\n    }\n\n    /**\n     * @param {function} callBack\n     * \n     */\n    callbackBeforeHttpRequest(callBack) {\n        beforeSubscribers.push(callBack);\n    }\n\n    /**\n    * @param {function} callBack\n    */\n    callbackAfterHttpRequest(callBack) {\n        afterSubscribers.push(callBack);\n    }\n\n    async apply() {\n        if (!isControlXmlHttpRequestUsed) {\n            this.applyForXMlHttpRequest();\n            this.applyForFetchAPi();\n        } else {\n            throw new console.warn(_messages__WEBPACK_IMPORTED_MODULE_1__.CXTR_ERROR_APPLY_CALLED_MORE_THAN_ONCE);\n        }\n    }\n\n\n    applyForFetchAPi() {\n        /*  Store the old fetch api  */\n        const OLD_FETCH = window.fetch;\n        /*  Create the sender   */\n        const sender = new _Sender__WEBPACK_IMPORTED_MODULE_0__.Sender();\n        sender.setSenderType(_Sender__WEBPACK_IMPORTED_MODULE_0__.CALLED_BY_FETCH_REQUEST);\n        const configuration = this.configuration\n        /*  Calling our calbacks   */\n        window.fetch = function () {\n            try {\n                sender.setSenderIntance(this);\n                dispatchBeforeSubscribers(arguments, sender, configuration.reportOnError);\n            } catch (error) {\n                configuration.reportError(error);\n            }\n            /*  calling the old fetch api   */\n            const callOldFetch = OLD_FETCH.apply(this, arguments);\n            callOldFetch.then(function (result) {\n                /*  avoid chaning the original result  */\n                const playableResult = Promise.resolve(result.clone());\n                try {\n                    sender.setSenderIntance(this);\n                    dispatchAfterSubscribers(playableResult, sender, configuration.reportOnError);\n                } catch (error) {\n                    configuration.reportError(error);\n                }\n            })\n            return callOldFetch;\n        };\n    }\n\n    applyForXMlHttpRequest() {\n        const OLD_SEND = window.XMLHttpRequest.prototype.send;\n        const configuration = this.configuration\n\n        const sender = new _Sender__WEBPACK_IMPORTED_MODULE_0__.Sender();\n        sender.setSenderType(_Sender__WEBPACK_IMPORTED_MODULE_0__.CALLED_BY_XHR);\n        window.XMLHttpRequest.prototype.send = function () {\n            this.addEventListener(\"readystatechange\", function () {\n                if (this.readyState == XHR_REQUEST_DONE) {\n                    sender.setSenderIntance(this);\n                    dispatchAfterSubscribers(this.response, sender, configuration.reportOnError);\n                }\n            })\n            try {\n                dispatchBeforeSubscribers(arguments, sender, configuration.reportOnError);\n            } catch (error) {\n                configuration.reportError(error);\n            } finally {\n                isControlXmlHttpRequestUsed = true;\n                OLD_SEND.apply(this, arguments);\n            }\n        }\n    }\n\n    restBeforeSubscribers() {\n        beforeSubscribers = [];\n    }\n    restAfterSubscribers() {\n        afterSubscribers = [];\n    }\n\n}\n\n//# sourceURL=webpack://control-xml-http-request/./src/ControlXmlHttpRequest.js?");

/***/ }),

/***/ "./src/Sender.js":
/*!***********************!*\
  !*** ./src/Sender.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   CALLED_BY_FETCH_REQUEST: () => (/* binding */ CALLED_BY_FETCH_REQUEST),\n/* harmony export */   CALLED_BY_XHR: () => (/* binding */ CALLED_BY_XHR),\n/* harmony export */   Sender: () => (/* binding */ Sender)\n/* harmony export */ });\n\nconst CALLED_BY_FETCH_REQUEST = \"CALLED_BY_FETCH_REQUEST\";\nconst CALLED_BY_XHR = \"CALLED_BY_XHR\";\n\nclass Sender\n{\n\n    /** \n     * @returns {Sender}\n     **/\n    setSenderType(type){\n         this.type = type;\n    }\n\n    getSenderType(){\n        return this.type;\n    }\n\n    setSenderIntance(senderInstance){\n        this.senderInstance = senderInstance;\n    }\n    getSenderIntance(){\n        return this.senderInstance;\n    }\n}\n\n//# sourceURL=webpack://control-xml-http-request/./src/Sender.js?");

/***/ }),

/***/ "./src/messages.js":
/*!*************************!*\
  !*** ./src/messages.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   CXTR_ERROR_APPLY_CALLED_MORE_THAN_ONCE: () => (/* binding */ CXTR_ERROR_APPLY_CALLED_MORE_THAN_ONCE),\n/* harmony export */   CXTR_ERROR_CALLBACK: () => (/* binding */ CXTR_ERROR_CALLBACK)\n/* harmony export */ });\nconst CXHTR_ERROR = \"Error in controlXMlHttpRequest : \";\nconst CXTR_ERROR_CALLBACK = CXHTR_ERROR + \"Error while calling Callback\";\nconst CXTR_ERROR_APPLY_CALLED_MORE_THAN_ONCE = CXHTR_ERROR + \"Error ControlXML\"; \n\n//# sourceURL=webpack://control-xml-http-request/./src/messages.js?");

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