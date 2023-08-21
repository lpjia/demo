// 需求是: 输入一个时间后, 计算得到几小时的时间, 精确到分
function clearInput() {
  doms.domHour.value = ''
  doms.domMinute.value = ''
  doms.domResult.innerHTML = ''
  doms.domTip.innerHTML = ``
  doms.domHour.focus()
}
function calcNextTime() {
  if (!doms.domHour.value) {
    alert('请输入hour')
    return;
  }
  // let currTime = dayjs().format('YYYY-MM-DD HH:mm:ss')
  let currTime = new Date().getTime()
  // 小时必须要输入, 否则还得区分用户输入是否有问题
  let result = currTime + (Number(doms.domHour.value) * 60 + (doms.domMinute.value ? Number(doms.domMinute.value) : 0)) * 60 * 1000
  // doms.domResult.innerHTML = dayjs(result).format('DD号HH:mm')
  doms.domResult.textContent = dayjs(result).format('DD号HH:mm')
}



function clearInput2() {
  doms.hour.value = ''
  doms.minute.value = ''
  doms.result.innerHTML = ''
  doms.tip.innerHTML = ``
  doms.hour.focus()
}
// 需求是: 输入一个时间, 计算出剩余时间(分钟)
function calcRemainingTime(speed) {
  if (!doms.hour.value) {
    alert('请输入hour')
    return;
  }
  let rawMinute = Number(doms.hour.value) * 60 + (doms.minute.value ? Number(doms.minute.value) : 0)
  doms.result.textContent = `${Math.floor(rawMinute / speed)}分钟`
}



/* 里面的dom都来自于bianqian文件夹 */