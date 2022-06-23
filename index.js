/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) scriptUrl = scripts[scripts.length - 1].src
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./src/audio/napalm-death-mp3.mp3
/* harmony default export */ const napalm_death_mp3 = (__webpack_require__.p + "napalm-death-mp3.mp3");
;// CONCATENATED MODULE: ./src/index.js



const wssUrlBitcoin = 'wss://ws.coincap.io/prices?assets=bitcoin'

/**
 * Функция отрисовки списка последних цен
 *
 * @param {number[]} pastPrice - Массив со значениями цены
 * @param {HTMLUListElement} htmlElement - Ul элемент списка последних цен
 */
function drawLastPrice(pastPrice, htmlElement) {
  htmlElement.innerHTML = ''

  pastPrice.forEach((item, index) => {
    htmlElement.insertAdjacentHTML(
      'beforeend',
      `<li class="course-list-item" style="--size: ${
        6.6 - index
      }em">${item}</li>`
    )
  })
}

/**
 * Функция отрисовки списка последних цен
 *
 * @param {HTMLDivElement} htmlElement - Контент с текущей ценой
 */
function setContentAnimatedClass(htmlElement) {
  const audio = new Audio(napalm_death_mp3)
  htmlElement.classList.add('rattle')
  audio.load()
  audio.play().then()

  setTimeout(() => {
    htmlElement.classList.remove('rattle')
    audio.pause()
  }, 1000)
}

/**
 * Функция инициализации приложения
 *
 * @param {string} content - id блока в котороый выгружается текущий курс
 */
;(function startApp(content) {
  const $Content = document.getElementById('content')
  const $CourseList = document.getElementById('courseList')
  const tradeWs = new WebSocket(wssUrlBitcoin)
  let dataStorage = {
    pastPrice: [],
    currentPrice: null
  }

  tradeWs.onmessage = function (msg) {
    const price = Number(JSON.parse(msg.data)['bitcoin'])
    $Content.innerHTML = `${price}`

    if (price !== dataStorage.currentPrice && dataStorage.currentPrice) {
      dataStorage.pastPrice.unshift(dataStorage.currentPrice)
    }

    if (price < dataStorage.currentPrice) {
      setContentAnimatedClass($Content)
    }

    dataStorage.currentPrice = price
    drawLastPrice(dataStorage.pastPrice, $CourseList)
  }
})('content')

/******/ })()
;