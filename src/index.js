import '../src/stylesheets/index.scss'
import napalmDeathMp3 from './audio/napalm-death-mp3.mp3'

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
  const audio = new Audio(napalmDeathMp3)
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
