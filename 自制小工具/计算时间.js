// 需求是
// 输入一个时间后, 计算得到几小时的时间, 精确到分
function clearInput() {
  let domHour = document.querySelector('#hour')
  let domMinute = document.querySelector('#minute')
  let domResult = document.querySelector('#new_time')
  let domTip = document.querySelector('#tip')

  domHour.value = ''
  domMinute.value = ''
  domResult.innerHTML = ''
  domTip.innerHTML = ``

  domHour.focus()
}
function calcNextTime() {
  let domHour = document.querySelector('#hour')
  let domMinute = document.querySelector('#minute')
  let domResult = document.querySelector('#new_time')
  if (!domHour.value) return
  // let currTime = dayjs().format('YYYY-MM-DD HH:mm:ss')
  let currTime = new Date().getTime()
  let result = currTime + (Number(domHour.value) * 60 + (domMinute.value ? Number(domMinute.value) : 0)) * 60 * 1000
  domResult.innerHTML = dayjs(result).format('DD号HH:mm')
}