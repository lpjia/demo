'use strict';

var app = new Vue({
	el: '.app',
	data: {
		name: 'xiaojia',
		monitorInput: '是这样吗？'
	},
	methods: {
		currentTime() {
			return setInterval(() => (new Date()), 1000)
		}
	},
	computed: {
		age() {
			return GetAge('1993-11-18');
		},

	}
})

/**
 * @param strBirthday：指的是出生日期，格式为"1990-01-01"
 */
function GetAge(strBirthday) {
	var returnAge,
		strBirthdayArr = strBirthday.split("-"),
		birthYear = strBirthdayArr[0],
		birthMonth = strBirthdayArr[1],
		birthDay = strBirthdayArr[2],
		d = new Date(),
		nowYear = d.getFullYear(),
		nowMonth = d.getMonth() + 1,
		nowDay = d.getDate();
	if (nowYear == birthYear) {
		returnAge = 0; //同年 则为0周岁
	} else {
		var ageDiff = nowYear - birthYear; //年之差
		if (ageDiff > 0) {
			if (nowMonth == birthMonth) {
				var dayDiff = nowDay - birthDay; //日之差
				if (dayDiff < 0) {
					returnAge = ageDiff - 1;
				} else {
					returnAge = ageDiff;
				}
			} else {
				var monthDiff = nowMonth - birthMonth; //月之差
				if (monthDiff < 0) {
					returnAge = ageDiff - 1;
				} else {
					returnAge = ageDiff;
				}
			}
		} else {
			returnAge = -1; //返回-1 表示出生日期输入错误 晚于今天
		}
	}
	return returnAge; //返回周岁年龄
}



var sheet = new Vue({
	el: '#sheet',
	data: {
		title: 'New Sheet',
		header: [ // 对应首行 A, B, C...
			{
				row: 0,
				col: 0,
				text: ''
			},
			{
				row: 0,
				col: 1,
				text: 'A'
			},
			{
				row: 0,
				col: 2,
				text: 'B'
			},
			{
				row: 0,
				col: 3,
				text: 'C'
			}
		],
		rows: [
			[{
					row: 1,
					col: 0,
					text: '1'
				},
				{
					row: 1,
					col: 1,
					text: ''
				},
				{
					row: 1,
					col: 2,
					text: ''
				},
				{
					row: 1,
					col: 10,
					text: '3',
					contentEditable: true
				},
			],
			[{
					row: 2,
					col: 0,
					text: '2'
				},
				{
					row: 2,
					col: 1,
					text: ''
				},
				{
					row: 2,
					col: 2,
					text: ''
				},
				{
					row: 2,
					col: 10,
					text: ''
				},
			],
			[{
					row: 10,
					col: 0,
					text: '10'
				},
				{
					row: 10,
					col: 1,
					text: '',
					contentEditable: true
				},
				{
					row: 10,
					col: 2,
					text: ''
				},
				{
					row: 10,
					col: 10,
					text: ''
				},
			]
		],
		selectedRowIndex: 0, // 当前活动单元格的row
		selectedColIndex: 0 // 当前活动单元格的col
	}
})




var app2 = new Vue({
	el: '.app2',
	data: {
		todos: [{
				name: '产品评审',
				description: '新款iPhone上市前评审'
			},
			{
				name: '开发计划',
				description: '与PM确定下一版Android开发计划'
			},
			{
				name: 'VC会议',
				description: '敲定C轮5000万美元融资'
			},
			{
				name: 'VC会议',
				description: '敲定C轮5000万美元融资'
			},
			{
				name: 'VC会议',
				description: '敲定C轮5000万美元融资'
			}
		]
	},
	methods: {
		currentTime() {
			return setInterval(() => (new Date()), 1000)
		}
	},
	computed: {
		age() {
			return GetAge('1993-11-18');
		},

	}
})
