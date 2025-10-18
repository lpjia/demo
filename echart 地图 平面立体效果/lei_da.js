

const sourceData = {
  quality: {
    mine: {
      awareScore: 100.0,
      skillScore: 0.0,
      avgScore: 69.0,
      knowledgeScore: 91.0,
      healthScore: 75.0,
      behaviorScore: 79
    },
    school: {
      awareScore: 25.0,
      skillScore: 0.0,
      avgScore: 17.25,
      knowledgeScore: 22.75,
      healthScore: 18.75,
      behaviorScore: 19.75
    },
    city: {
      awareScore: 46.7,
      skillScore: 0.0,
      avgScore: 35.35,
      knowledgeScore: 44.9,
      healthScore: 40.77,
      behaviorScore: 44.39
    },
    region: {
      awareScore: 46.7,
      skillScore: 0.0,
      avgScore: 35.35,
      knowledgeScore: 44.9,
      healthScore: 40.77,
      behaviorScore: 44.39
    }
  }
},
  colAreaList = ['mine', 'city', 'region', 'school'],
  colorList = ['#15A54B', '#3AC5FF', '#FFEA3A', '#FB535F'],
  fiveDimensionsList = [
    'awareScore',
    'healthScore',
    'skillScore',
    'behaviorScore',
    'knowledgeScore'
  ],
  fiveDimensionsMap = {
    '体育意识': 'awareScore',
    '体育健康': 'healthScore',
    '体育技能': 'skillScore',
    '体育行为': 'behaviorScore',
    '体育知识': 'knowledgeScore',
  },
  colAreaMap = {
    mine: '我的',
    city: '市',
    region: '区',
    school: '校'
  }



function dealwithData() {
  let result = []
  for (let i = 0; i < colAreaList.length; i++) {
    const k = colAreaList[i];
    let obj = sourceData.quality[k]
    // if ($judgeNotEmpty(obj)) continue
    let valArr = []
    for (const dimensions of fiveDimensionsList) {
      valArr.push(obj[dimensions])
    }

    if (i !== 0) {
      result.push({
        value: valArr,
        name: colAreaMap[k],
        itemStyle: {
          color: colorList[i]
        },
      })
    } else {
      result.push({
        value: valArr,
        name: colAreaMap[k],
        itemStyle: {
          color: colorList[i]
        },
        areaStyle: {
          color: colorList[i],
          opacity: 0.3
        }
      })
    }
  }
  console.log('result:', result)
  return result

  // radarChartInstance.setOption({
  //   series: [{
  //     name: 'ping_gu',
  //     type: 'radar',
  //     data: result
  //   }]
  // })

  // dealChartTitle('体育意识')
}



const option = {
  legend: {
    data: ['我的', '市', '区', '校'],
    bottom: '6px'
  },
  // tooltip: {
  //   trigger: 'item',
  //   formatter: '{a}<br/>{b}<br />{c}<br/>{@我的}<br />{@[1]}'
  // },
  // tooltip: {
  //   trigger: 'item', // axis item
  //   formatter: (params) => {
  //     let domHTML = ''
  //     // for (let index = 0; index < this.chartTitleList.length; index++) {
  //     // const element = this.chartTitleList[index];
  //     // domHTML += `${params.name}<br /><span style=""></span>${element.name}&nbsp;${element.score}<br />`
  //     // }
  //     console.log('dimensionNames:', params.dimensionNames)

  //     domHTML = `${params.name}`
  //     return domHTML

  //     // let relVal = params.name;
  //     // let typeList = _this.warningDetailData
  //     // for (let i = 0; i < params.data.value.length; i++) {
  //     //   relVal += '<br/>' + typeList[i]['measureDimensionName'] + ' : '
  //     //     + params.data.value[i] + ' ' + '分';
  //     // }
  //     // return relVal;
  //   },
  //   confine: true,
  // },
  radar: [
    {
      // radius: '60%',
      splitArea: {
        show: false
      },
      splitLine: {
        lineStyle: {
          width: 3
        }
      },
      radius: '65%',
      // axisLabel: {
      //   // show: true,
      //   // showMinLabel: false
      // },
      triggerEvent: true,
      indicator: [
        // { name: '体育意识', max: 100, axisLabel: { show: false } },
        { name: '体育意识', max: 100 },
        { name: '体育健康', max: 100 },
        { name: '体育技能', max: 100 },
        { name: '体育行为', max: 100 },
        {
          name: '体育知识',
          max: 100,
          axisLabel: {
            show: true,
            showMinLabel: false
          }
        }
      ]
    },
  ],
  series: []
};


let radarChartInstance = echarts.init(document.getElementById('chartBox'))
radarChartInstance.setOption(option)


function clkFn(params) {
  console.log('params:', params)
  if (params.targetType === 'axisName') {
    // this.dealChartTitle(params.name)
    console.log('params.name:', params.name)
    console.log('params.event:', params.event)
    console.log('params.event.offsetY:', params.event.offsetY)
    // 
  }
}

// 添加监听事件
radarChartInstance.on('click', clkFn)



// 延迟加载数据, 模拟调接口
setTimeout(() => {
  const result = dealwithData()


  radarChartInstance.setOption({
    series: [{
      name: 'ping_gu',
      type: 'radar',
      data: result
    }]
  })

}, 1000)