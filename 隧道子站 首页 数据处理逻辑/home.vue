<template>
  <el-container class="layout">
    <el-main>
      <!-- <el-row>
        <el-col :span="24" class="head">
          <div class="bar">
            <img src="@/../static/images/home/alarm.png">
            <span>报警数:</span>
            <span>6</span>
          </div>
          <div class="bar">
            <img src="@/../static/images/home/offline.png">
            <span>离线数:</span>
            <span>1</span>
          </div>
        </el-col>
      </el-row> -->

      <el-row class="dashboard">
        <el-col>
          <el-row :gutter="20" type="flex" justify="start" class="sectionBlock"
            :class="{ sectionBlock_2:sensorSum.length > 5 }">
            <el-col :span="5" v-for="(item,idx) in sensorSum.slice(0, sensorSumSplit)" :key="idx">
              <section class="card" :class="item.groupType">
                <div class="left" :class="item.imgType">
                  <!-- <img :src="require('@/../static/images/home/'+ item.imgType + '.png')"> -->
                </div>
                <div class="right" :class="item.groupType">
                  <div class="txt" v-for="sensor in item.sensor" :key="sensor.key">
                    <span v-html="sensor.name"></span>&nbsp;&nbsp;{{ sensor.amount }} 个
                  </div>
                </div>
              </section>
            </el-col>
          </el-row>
          <el-row v-if="sensorSum.length > 5" :gutter="20" type="flex" justify="start" class="sectionBlock">
            <el-col :span="5" v-for="(item,idx) in sensorSum.slice(sensorSumSplit)" :key="idx + 10000">
              <section class="card" :class="item.groupType">
                <div class="left" :class="item.imgType">
                  <!-- <img :src="require('@/../static/images/home/'+ item.imgType + '.png')"> -->
                </div>
                <div class="right" :class="item.groupType">
                  <div class="txt" v-for="sensor in item.sensor" :key="sensor.key">
                    <span v-html="sensor.name"></span>&nbsp;&nbsp;{{ sensor.amount }} 个
                  </div>
                </div>
              </section>
            </el-col>
            <el-col :span="5" v-for="n in (10 - sensorSum.length)" :key="n">
              <section class="card" v-show="false">
                <div class="left">
                  <img src="@/../static/images/home/TH.png">
                </div>
                <div class="right">
                  <div class="txt">温度传感器&nbsp;&nbsp;16 个</div>
                </div>
              </section>
            </el-col>
          </el-row>
        </el-col>
      </el-row>

      <el-row class="message" v-if="sensorAlarmList.length">
        <el-col>
          <el-row :gutter="20" type="flex" justify="start" class="sectionBlock">
            <el-col>
              <el-row>
                <el-col class="typeTitle">报警</el-col>
              </el-row>
              <el-row>
                <el-col :span="4" v-for="(item, idx) in sensorAlarmList" :key="idx">
                  <section class="card2 alarm">
                    <div class="nameTitle" :title="longName(item)">{{ longName(item) }}</div>
                    <div class="card2Main">
                      <!-- <div class="left"><img :src="require('@/../static/images/home/'+ item.imgType + '.png')"></div> -->
                      <div class="right oneLine">
                        <!-- <div class="txt" :title="item.eventDiscription">传感器/设备状态: {{ item.eventDiscription }}</div> -->
                        <div class="txt" :title="item.eventDiscription">{{ item.eventDiscription }}</div>
                      </div>
                    </div>
                  </section>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </el-col>
      </el-row>

      <el-row class="message" v-if="sensorWarningList.length">
        <el-col>
          <el-row :gutter="20" type="flex" justify="start" class="sectionBlock">
            <el-col>
              <el-row>
                <el-col class="typeTitle">预警</el-col>
              </el-row>
              <el-row>
                <el-col :span="4" v-for="(item, idx) in sensorWarningList" :key="idx">
                  <section class="card2 warning">
                    <div class="nameTitle" :title="longName(item)">{{ longName(item) }}</div>
                    <div class="card2Main">
                      <!-- <div class="left"><img :src="require('@/../static/images/home/'+ item.imgType + '.png')"></div> -->
                      <div class="right oneLine">
                        <div class="txt" :title="item.eventDiscription">{{ item.eventDiscription }}</div>
                      </div>
                    </div>
                  </section>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </el-col>
      </el-row>

      <el-row class="message" v-if="sensorHintList.length">
        <el-col>
          <el-row :gutter="20" type="flex" justify="start" class="sectionBlock">
            <el-col>
              <el-row>
                <el-col class="typeTitle">提示</el-col>
              </el-row>
              <el-row>
                <el-col :span="4" v-for="(item,idx) in sensorHintList" :key="idx">
                  <section class="card2 hint">
                    <div class="nameTitle" :title="longName(item)">{{ longName(item) }}</div>
                    <div class="card2Main">
                      <!-- <div class="left"><img :src="require('@/../static/images/home/'+ item.imgType + '.png')"></div> -->
                      <div class="right oneLine">
                        <div class="txt" :title="item.eventDiscription">{{ item.eventDiscription }}</div>
                      </div>
                    </div>
                  </section>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </el-col>
      </el-row>

    </el-main>
  </el-container>
</template>

<script>
// import { sensorSumInfo, sensorAlarm } from '@/api/home'
// import { device_type_reverse, getGroupByDevice, getImgGroupByDevice } from '@/utils/commonData'
// import { judgeNotEmpty } from '@/utils/commonMethods'


export default {
  name: 'home',
  components: {
  },
  props: {
  },
  data() {
    return {
      sensorSum: [],
      // 显示传感器文本
      afterNameMap: {
        '一氧化碳': 'CO &nbsp;传感器',
        '氧气': 'O<sub>2</sub> &nbsp;&nbsp;传感器',
        '硫化氢': 'H<sub>2</sub>S&nbsp;传感器',
        '甲烷': 'CH<sub>4</sub>&nbsp;传感器',
        '温度': '温度传感器',
        '湿度': '湿度传感器',
        '液位': '液位传感器',
      },

      sensorAlarmList: [],
      sensorWarningList: [],
      sensorHintList: [],
    };
  },
  computed: {
    sensorSumSplit() {
      return this.sensorSum.length > 5 ? 5 : this.sensorSum.length
    },
    longName() {
      return item => item.sectionName + " " + item.equipmentName
    }
  },
  watch: {
  },
  created() {
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.getSensorSumInfo()
      this.getSensorAlarm()
    },
    // 获取传感器统计
    async getSensorSumInfo() {
      let res = await sensorSumInfo()
        , sourceData = res.data.details
        , sensorData = this.getSensorData(sourceData)
        , cardAmount = this.getCardAmount(sensorData)
        , cardBaseData = this.getCardBaseData(sensorData, cardAmount)
      this.sensorSum = this.getCardData(sensorData, cardBaseData)
    },
    // 组装 sensor 数据
    getSensorData(sensorSourceData) {
      let result = []
        , kArr = Object.keys(sensorSourceData)
        , vArr = Object.values(sensorSourceData)

      for (let index = 0; index < kArr.length; index++) {
        let element = kArr[index]
          , obj = {
            name: this.afterNameMap[element] ? this.afterNameMap[element] : element,
            amount: vArr[index],
            key: device_type_reverse[element][0]
          }
        result.push(obj)
      }

      return result
    },
    // 获取 card 类型数量, 去掉重复的
    getCardAmount(sensorData) {
      let cardAmount = new Set()

      for (const item of sensorData) {
        let imgType = getImgGroupByDevice(item.key)
        cardAmount.add(imgType)
      }

      return cardAmount
    },
    // 组装 card 基础数据
    getCardBaseData(sensorData, cardAmount) {
      let result = []

      for (const x of cardAmount) {
        let obj = {
          imgType: x,
          sensor: []
        }

        for (const y of sensorData) {
          if (getImgGroupByDevice(y.key) === x) obj.groupType = getGroupByDevice(y.key)
        }

        result.push(obj)
      }

      return result
    },
    // 组装 card 数据
    getCardData(sensorData, cardBaseData) {
      for (let x of cardBaseData) {
        for (let y of sensorData) {
          if (getImgGroupByDevice(y.key) === x.imgType) x.sensor.push(y)
        }
      }

      return cardBaseData
    },

    // 获取报警等传感器数据
    async getSensorAlarm() {
      let res = await sensorAlarm()
        , sourceData = res.data
      if (judgeNotEmpty(sourceData)) {
        for (let item of sourceData) {
          item.imgType = getImgGroupByDevice(item.category)
          switch (item.level) {
            case 2:
              this.sensorAlarmList.push(item)
              break;
            case 1:
              this.sensorWarningList.push(item)
              break;
            case 0:
              this.sensorHintList.push(item)
              break;
            default: break;
          }
        }
      }
    }
  },
};
</script>

<style scoped lang="scss">
.layout {
  background-color: #f1f1f1;

  // 头部信息
  .head {
    margin-bottom: 20px;
    display: flex;
    flex-direction: row;
    .bar {
      display: flex;
      flex-direction: row;
      align-items: center;
      height: 40px;
      line-height: 40px;
      font-size: 16px;
      margin-right: 40px;
      > img {
        display: inline-block;
        vertical-align: middle;
      }
      > span {
        vertical-align: middle;
        margin: 0 5px;
      }
    }
  }

  // 监控面板
  .dashboard,
  .message {
    background-color: #fff;
    .sectionBlock {
      padding: 20px 30px;
      .card {
        width: 300px;
        height: 120px;
        background-color: #edf0f6;
        padding: 30px 30px 0 20px;
        box-sizing: border-box;
        display: flex;
        .right {
          margin-left: 30px;
        }

        // 1行显示
        .oneLine {
          margin-top: 20px !important;
        }
        // 4行显示
        .fourLine > div {
          margin-bottom: 4px !important;
        }

        // 接地环流
        .groundingCirculation.left {
          padding-top: 12px;
        }
      }
      .fourLine.card {
        padding-top: 0 !important;
        > .left {
          margin-top: 30px;
        }
        > .right {
          margin-top: 6px;
        }
      }
      .txt {
        font-size: 16px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        line-height: 21px;
        color: #333333;
        margin-bottom: 10px;
      }
    }
    .sectionBlock_2 {
      padding-bottom: 0 !important;
    }
  }

  // 报警等板块
  .message {
    margin-top: 20px;
    .typeTitle {
      font-size: 18px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      line-height: 24px;
      color: #333333;
      margin-bottom: 20px;
    }
    .nameTitle {
      font-size: 16px;
      font-family: SimHei;
      font-weight: 400;
      line-height: 21px;
      color: #ffffff;
      margin-bottom: 20px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      cursor: pointer;
    }
    .card2 {
      width: 260px;
      height: 140px;
      box-sizing: border-box;
      padding: 16px 10px 0 20px;
      margin-bottom: 20px;
    }
    .card2Main {
      display: flex;
      .right {
        margin-left: 30px;
      }
      .txt {
        font-size: 16px;
        font-family: SimHei;
        font-weight: 400;
        line-height: 21px;
        color: #ffffff;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
      }
    }
    .alarm {
      background-color: #dc4f4f;
    }
    .warning {
      background-color: #e58c26;
    }
    .hint {
      background-color: #77a6cf;
    }
  }
}
</style>
