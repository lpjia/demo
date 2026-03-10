
// 一级
// canlendarList === allDayArr
// staffWorkHoursDTOList === hangData

// 二级
// hangData.workHoursDTOList === lieData

export const workhour_stat_list = {
  "code": 200,
  "msg": "请求成功",
  "data": {
    "canlendarList": [
      {
        "date": "2020-04-18",
        "dayInWeek": "6",
        // "holiday": false,
        // "restDay": true
        // 改数据, 调试用
        "holiday": true,
        "restDay": false
      },
      {
        "date": "2020-04-19",
        "dayInWeek": "7",
        "holiday": false,
        "restDay": true
      },
      {
        "date": "2020-04-20",
        "dayInWeek": "1",
        "holiday": false,
        "restDay": false
      },
      {
        "date": "2020-04-21",
        "dayInWeek": "2",
        "holiday": false,
        "restDay": false
      },
      {
        "date": "2020-04-22",
        "dayInWeek": "3",
        "holiday": false,
        "restDay": false
      },
      {
        "date": "2020-04-23",
        "dayInWeek": "4",
        "holiday": false,
        "restDay": false
      },
      {
        "date": "2020-04-24",
        "dayInWeek": "5",
        "holiday": false,
        "restDay": false
      },
      {
        "date": "2020-04-25",
        "dayInWeek": "6",
        "holiday": false,
        "restDay": true
      },
      {
        "date": "2020-04-26",
        "dayInWeek": "7",
        "holiday": false,
        "restDay": false
      },
      {
        "date": "2020-04-27",
        "dayInWeek": "1",
        "holiday": false,
        "restDay": false
      },
      {
        "date": "2020-04-28",
        "dayInWeek": "2",
        "holiday": false,
        "restDay": false
      },
      {
        "date": "2020-04-29",
        "dayInWeek": "3",
        "holiday": false,
        "restDay": false
      },
      {
        "date": "2020-04-30",
        "dayInWeek": "4",
        "holiday": false,
        "restDay": false
      },
      {
        "date": "2020-05-01",
        "dayInWeek": "5",
        "holiday": true,
        "restDay": false
      },
      {
        "date": "2020-05-02",
        "dayInWeek": "6",
        "holiday": true,
        "restDay": false
      }
    ],
    "staffWorkHoursDTOList": [
      {
        "workHoursDTOList": [
          {
            "quotaTime": 480,
            "beyondTime": 0,
            "overTime": 120,
            "startTime": "08:00",
            "endTime": "20:00",
            "unitId": null,
            "actualTime": 600,
            "reportDate": "2020-04-20",
            "staffName": "贾小子",
            "staffNo": "111",
            "projectId": "TP-Link",
            "taskId": "4652-1531SSS",
            "isQualified": true,
            "holidayTime": 0,
            "restDayOverTime": 0
          },
          {
            "quotaTime": 480,
            "beyondTime": 0,
            "overTime": 0,
            "startTime": "08:00",
            "endTime": "18:00",
            "unitId": null,
            "actualTime": 480,
            "reportDate": "2020-04-21",
            "staffName": "贾小子",
            "staffNo": "111",
            "projectId": "TP-Link",
            "taskId": "4652-1531SSS",
            "isQualified": true,
            "holidayTime": 0,
            "restDayOverTime": 0
          },
          {
            "quotaTime": 480,
            "beyondTime": 0,
            "overTime": 0,
            "startTime": "08:00",
            "endTime": "18:00",
            "unitId": null,
            "actualTime": 480,
            "reportDate": "2020-04-22",
            "staffName": "贾小子",
            "staffNo": "111",
            "projectId": "TP-Link",
            "taskId": "4652-1531SSS",
            "isQualified": true,
            "holidayTime": 0,
            "restDayOverTime": 0
          },
          {
            "quotaTime": 480,
            "beyondTime": 0,
            "overTime": 0,
            "startTime": "08:00",
            "endTime": "18:00",
            "unitId": null,
            "actualTime": 480,
            "reportDate": "2020-04-23",
            "staffName": "贾小子",
            "staffNo": "111",
            "projectId": "TP-Link",
            "taskId": "4652-1531SSS",
            "isQualified": true,
            "holidayTime": 0,
            "restDayOverTime": 0
          },
          {
            "quotaTime": 480,
            "beyondTime": 0,
            "overTime": 120,
            "startTime": "08:00",
            "endTime": "20:00",
            "unitId": null,
            "actualTime": 600,
            "reportDate": "2020-04-24",
            "staffName": "贾小子",
            "staffNo": "111",
            "projectId": "TP-Link",
            "taskId": "4652-1531SSS",
            "isQualified": true,
            "holidayTime": 0,
            "restDayOverTime": 0
          },
        ],
        "workHoursStatisticsDTO": {
          "quotaTimeStatistics": 2400,
          "beyondTimeStatistics": 0,
          "overTimeStatistics": 240,
          "actualTimeStatistics": 2640,
          "holidayTimeStatistics": 0,
          "restDayOverTimeStatistics": 0,
          "duplicateTimeStatistics": 0,
        }
      },
      {
        "workHoursDTOList": [
          {
            "quotaTime": 480,
            "beyondTime": 0,
            "overTime": 60,
            "startTime": "08:00",
            "endTime": "20:00",
            "unitId": null,
            "actualTime": 540,
            "reportDate": "2020-04-28",
            "staffName": "窦剑文",
            "staffNo": "222",
            "projectId": "TP-Link",
            "taskId": "4652-1531SSS",
            "isQualified": true,
            "holidayTime": 0,
            "restDayOverTime": 0
          },
        ],
        "workHoursStatisticsDTO": {
          "quotaTimeStatistics": 480,
          "beyondTimeStatistics": 0,
          "overTimeStatistics": 60,
          "actualTimeStatistics": 540,
          "holidayTimeStatistics": 0,
          "restDayOverTimeStatistics": 0,
          "duplicateTimeStatistics": 0,
        }
      },
      {
        "workHoursDTOList": [
          {
            "quotaTime": 480,
            "beyondTime": 0,
            "overTime": 60,
            "startTime": "08:00",
            "endTime": "20:00",
            "unitId": null,
            "actualTime": 540,
            "reportDate": "2020-04-29",
            "staffName": "张三",
            "staffNo": "333",
            "projectId": "TP-Link",
            "taskId": "4652-1531SSS",
            "isQualified": true,
            "holidayTime": 0,
            "restDayOverTime": 0
          },
        ],
        "workHoursStatisticsDTO": {
          "quotaTimeStatistics": 480,
          "beyondTimeStatistics": 0,
          "overTimeStatistics": 60,
          "actualTimeStatistics": 540,
          "holidayTimeStatistics": 0,
          "restDayOverTimeStatistics": 0,
          "duplicateTimeStatistics": 0,
        }
      },
      {
        "workHoursDTOList": [
          {
            "quotaTime": 480,
            "beyondTime": 0,
            "overTime": 120,
            "startTime": "08:00",
            "endTime": "20:00",
            "unitId": null,
            "actualTime": 600,
            "reportDate": "2020-04-26",
            "staffName": "赵四",
            "staffNo": "444",
            "projectId": "TP-Link",
            "taskId": "4652-1531SSS",
            "isQualified": true,
            "holidayTime": 0,
            "restDayOverTime": 0
          },
          {
            "quotaTime": 480,
            "beyondTime": 0,
            "overTime": 0,
            "startTime": "08:00",
            "endTime": "18:00",
            "unitId": null,
            "actualTime": 480,
            "reportDate": "2020-04-27",
            "staffName": "赵四",
            "staffNo": "444",
            "projectId": "TP-Link",
            "taskId": "4652-1531SSS",
            "isQualified": true,
            "holidayTime": 0,
            "restDayOverTime": 0
          },
          {
            "quotaTime": 480,
            "beyondTime": 0,
            "overTime": 0,
            "startTime": "08:00",
            "endTime": "18:00",
            "unitId": null,
            "actualTime": 480,
            "reportDate": "2020-04-28",
            "staffName": "赵四",
            "staffNo": "444",
            "projectId": "TP-Link",
            "taskId": "4652-1531SSS",
            "isQualified": true,
            "holidayTime": 0,
            "restDayOverTime": 0
          },
          {
            "quotaTime": 480,
            "beyondTime": 0,
            "overTime": 0,
            "startTime": "08:00",
            "endTime": "18:00",
            "unitId": null,
            "actualTime": 480,
            "reportDate": "2020-04-29",
            "staffName": "赵四",
            "staffNo": "444",
            "projectId": "TP-Link",
            "taskId": "4652-1531SSS",
            "isQualified": true,
            "holidayTime": 0,
            "restDayOverTime": 0
          },
          {
            "quotaTime": 480,
            "beyondTime": 0,
            "overTime": 120,
            "startTime": "08:00",
            "endTime": "20:00",
            "unitId": null,
            "actualTime": 600,
            "reportDate": "2020-04-30",
            "staffName": "赵四",
            "staffNo": "444",
            "projectId": "TP-Link",
            "taskId": "4652-1531SSS",
            "isQualified": true,
            "holidayTime": 0,
            "restDayOverTime": 0
          },
        ],
        "workHoursStatisticsDTO": {
          "quotaTimeStatistics": 2400,
          "beyondTimeStatistics": 0,
          "overTimeStatistics": 240,
          "actualTimeStatistics": 2640,
          "holidayTimeStatistics": 0,
          "restDayOverTimeStatistics": 0,
          "duplicateTimeStatistics": 0,
        }
      },
      {
        "workHoursDTOList": [
          {
            "quotaTime": 480,
            "beyondTime": 0,
            "overTime": 120,
            "startTime": "08:00",
            "endTime": "20:00",
            "unitId": null,
            "actualTime": 600,
            "reportDate": "2020-04-20",
            "staffName": "合计",
            "staffNo": "",
            "projectId": "TP-Link",
            "taskId": "4652-1531SSS",
            "isQualified": true,
            "holidayTime": 0,
            "restDayOverTime": 0
          },
          {
            "quotaTime": 480,
            "beyondTime": 0,
            "overTime": 0,
            "startTime": "08:00",
            "endTime": "18:00",
            "unitId": null,
            "actualTime": 480,
            "reportDate": "2020-04-21",
            "staffName": "合计",
            "staffNo": "",
            "projectId": "TP-Link",
            "taskId": "4652-1531SSS",
            "isQualified": true,
            "holidayTime": 0,
            "restDayOverTime": 0
          },
          {
            "quotaTime": 480,
            "beyondTime": 0,
            "overTime": 0,
            "startTime": "08:00",
            "endTime": "18:00",
            "unitId": null,
            "actualTime": 480,
            "reportDate": "2020-04-22",
            "staffName": "合计",
            "staffNo": "",
            "projectId": "TP-Link",
            "taskId": "4652-1531SSS",
            "isQualified": true,
            "holidayTime": 0,
            "restDayOverTime": 0
          },
          {
            "quotaTime": 480,
            "beyondTime": 0,
            "overTime": 0,
            "startTime": "08:00",
            "endTime": "18:00",
            "unitId": null,
            "actualTime": 480,
            "reportDate": "2020-04-23",
            "staffName": "合计",
            "staffNo": "",
            "projectId": "TP-Link",
            "taskId": "4652-1531SSS",
            "isQualified": true,
            "holidayTime": 0,
            "restDayOverTime": 0
          },
          {
            "quotaTime": 480,
            "beyondTime": 0,
            "overTime": 120,
            "startTime": "08:00",
            "endTime": "20:00",
            "unitId": null,
            "actualTime": 600,
            "reportDate": "2020-04-24",
            "staffName": "合计",
            "staffNo": "",
            "projectId": "TP-Link",
            "taskId": "4652-1531SSS",
            "isQualified": true,
            "holidayTime": 0,
            "restDayOverTime": 0
          },
          {
            "quotaTime": 480,
            "beyondTime": 0,
            "overTime": 120,
            "startTime": "08:00",
            "endTime": "20:00",
            "unitId": null,
            "actualTime": 600,
            "reportDate": "2020-04-26",
            "staffName": "合计",
            "staffNo": "",
            "projectId": "TP-Link",
            "taskId": "4652-1531SSS",
            "isQualified": true,
            "holidayTime": 0,
            "restDayOverTime": 0
          },
          {
            "quotaTime": 480,
            "beyondTime": 0,
            "overTime": 0,
            "startTime": "08:00",
            "endTime": "18:00",
            "unitId": null,
            "actualTime": 480,
            "reportDate": "2020-04-27",
            "staffName": "合计",
            "staffNo": "",
            "projectId": "TP-Link",
            "taskId": "4652-1531SSS",
            "isQualified": true,
            "holidayTime": 0,
            "restDayOverTime": 0
          },
          {
            "quotaTime": 480,
            "beyondTime": 0,
            "overTime": 0,
            "startTime": "08:00",
            "endTime": "18:00",
            "unitId": null,
            "actualTime": 1020,
            "reportDate": "2020-04-28",
            "staffName": "合计",
            "staffNo": "",
            "projectId": "TP-Link",
            "taskId": "4652-1531SSS",
            "isQualified": true,
            "holidayTime": 0,
            "restDayOverTime": 0
          },
          {
            "quotaTime": 480,
            "beyondTime": 0,
            "overTime": 0,
            "startTime": "08:00",
            "endTime": "18:00",
            "unitId": null,
            "actualTime": 1020,
            "reportDate": "2020-04-29",
            "staffName": "合计",
            "staffNo": "",
            "projectId": "TP-Link",
            "taskId": "4652-1531SSS",
            "isQualified": true,
            "holidayTime": 0,
            "restDayOverTime": 0
          },
          {
            "quotaTime": 480,
            "beyondTime": 0,
            "overTime": 120,
            "startTime": "08:00",
            "endTime": "20:00",
            "unitId": null,
            "actualTime": 600,
            "reportDate": "2020-04-30",
            "staffName": "合计",
            "staffNo": "",
            "projectId": "TP-Link",
            "taskId": "4652-1531SSS",
            "isQualified": true,
            "holidayTime": 0,
            "restDayOverTime": 0
          },
        ],
        "workHoursStatisticsDTO": {
          "quotaTimeStatistics": 5760,
          "beyondTimeStatistics": 0,
          "overTimeStatistics": 600,
          "actualTimeStatistics": 6360,
          "holidayTimeStatistics": 0,
          "restDayOverTimeStatistics": 0,
          "duplicateTimeStatistics": 0,
        }
      }
    ],
    "unitId": null
  }
}