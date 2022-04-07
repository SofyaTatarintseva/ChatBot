import axios from 'axios'

export async function initUserChat(config) {
  try {
    let res = await axios.post('https://biz.nanosemantics.ru/api/2.1/json/Chat.init', config)
    if (res.status === 200) {
      //localStorage.setItem('cuid', res.data.result.cuid.toString())
      return res.data.result.cuid.toString()
    }
  } catch (e) {
    console.error(e)
  }

}
export async function initNewUserChat(config) {
  try {
    let res = await axios.post('https://biz.nanosemantics.ru/api/2.1/json/Chat.init', config)
    if (res.status === 200) {
      localStorage.setItem('cuid', res.data.result.cuid.toString())
      return res.data.result.cuid.toString()
    }
  } catch (e) {
    console.error(e)
  }

}
export async function readyEvent(config) {
  try {
    let res = await axios.post('https://biz.nanosemantics.ru/api/bat/nkd/json/Chat.event', config)
    if (res.status === 200) {
      return {
        bot: true,
        text: res.data.result.text.value
      }
    }
  } catch (e) {
    console.error(e)
  }
}

export async function getAnswer(config) {
  try {
    let res = await axios.post('https://biz.nanosemantics.ru/api/bat/nkd/json/Chat.request', config)
    if (res.status === 200) {
      const cuid = localStorage.getItem('cuid')
      if (cuid != config.cuid) {
        localStorage.setItem('cuid', res.data.result.cuid.toString())
      }
      return {
        bot: true,
        text: res.data.result.text.value
      }
    }
  } catch (e) {
    console.error(e)
  }
}