(function(e){function t(t){for(var r,o,s=t[0],d=t[1],i=t[2],c=0,b=[];c<s.length;c++)o=s[c],Object.prototype.hasOwnProperty.call(n,o)&&n[o]&&b.push(n[o][0]),n[o]=0;for(r in d)Object.prototype.hasOwnProperty.call(d,r)&&(e[r]=d[r]);u&&u(t);while(b.length)b.shift()();return l.push.apply(l,i||[]),a()}function a(){for(var e,t=0;t<l.length;t++){for(var a=l[t],r=!0,s=1;s<a.length;s++){var d=a[s];0!==n[d]&&(r=!1)}r&&(l.splice(t--,1),e=o(o.s=a[0]))}return e}var r={},n={app:0},l=[];function o(t){if(r[t])return r[t].exports;var a=r[t]={i:t,l:!1,exports:{}};return e[t].call(a.exports,a,a.exports,o),a.l=!0,a.exports}o.m=e,o.c=r,o.d=function(e,t,a){o.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:a})},o.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(e,t){if(1&t&&(e=o(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var a=Object.create(null);if(o.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)o.d(a,r,function(t){return e[t]}.bind(null,r));return a},o.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="/";var s=window["webpackJsonp"]=window["webpackJsonp"]||[],d=s.push.bind(s);s.push=t,s=s.slice();for(var i=0;i<s.length;i++)t(s[i]);var u=d;l.push([0,"chunk-vendors"]),a()})({0:function(e,t,a){e.exports=a("56d7")},"46ff":function(e,t,a){"use strict";a("fd83")},"56d7":function(e,t,a){"use strict";a.r(t);a("0e07");var r=a("1771"),n=a.n(r),l=a("d797"),o=function(){var e=this,t=e._self._c;return t("div",[t("h3",[e._v("打开 F12")]),t("ele-table",{attrs:{tableData:e.tableData}}),t("el-divider"),t("vxee-table",{attrs:{tableData:e.tableData_2}}),t("el-divider"),t("NativeTable")],1)},s=[],d=function(){var e=this,t=e._self._c;return t("div",[t("el-table",{staticStyle:{width:"100%"},attrs:{data:e.tableData,border:""}},[t("el-table-column",{attrs:{type:"index",label:"NO.",width:"60",align:"right",fixed:""}}),t("el-table-column",{attrs:{prop:"username",label:"姓名"}}),t("el-table-column",{attrs:{prop:"birthday",label:"出生日期"}}),t("el-table-column",{attrs:{label:"年龄",formatter:e.ageFormatter}}),t("el-table-column",{attrs:{label:"测试 calcAges",formatter:e.calcAgesF}}),t("el-table-column",{attrs:{prop:"workday",label:"入职日期"}}),t("el-table-column",{attrs:{label:"工龄",formatter:e.workingYearsFormatter}}),t("el-table-column",{attrs:{label:"测试 calcWorkingYears",formatter:e.calcWorkingYearsF}})],1)],1)},i=[],u=a("5f78"),c=a.n(u);function b(e,t){if(!e)return"";const a=c()(null!==t&&void 0!==t?t:void 0),r=c()(e),n=a.diff(r,"year"),l=a.diff(r,"month")%12,o=`${n} 岁 ${l} 个月`;return o}function f(e,t){if(!e)return"";const a=c()(null!==t&&void 0!==t?t:void 0),r=c()(e),n=a.diff(r,"year"),l=a.diff(r,"month")%12,o=`${n} 年 ${l} 个月`;return o}var m={name:"EleTable",props:["tableData"],methods:{ageFormatter(e){const t=e.deathday?b(e.birthday,e.deathday)+" (已去世)":b(e.birthday);return t},calcAgesF(e){return b(e.birthday,e.deathday)},workingYearsFormatter(e){const t=e.deathday?f(e.workday,e.deathday)+" (已去世)":f(e.workday);return t},calcWorkingYearsF(e){return f(e.workday,e.deathday)}}},h=m,p=a("3712"),v=Object(p["a"])(h,d,i,!1,null,null,null),y=v.exports,g=function(){var e=this,t=e._self._c;return t("div",[t("table",[e._m(0),t("tbody",[t("tr",[t("td",[e._v("new Date()")]),t("td",[e._v(e._s(e.msg))])]),t("tr",[t("td",[e._v("dayjs()")]),t("td",[e._v(e._s(e.msg_2))])]),t("tr",[e._m(1),t("td",[e._v(e._s(e.msg_3))])]),t("tr",[t("td",[e._v("距离我出生")]),t("td",[e._v(e._s(e.msg_4))])])])])])},_=[function(){var e=this,t=e._self._c;return t("thead",[t("tr",[t("th",[e._v("描述")]),t("th",[e._v("值")])])])},function(){var e=this,t=e._self._c;return t("td",[e._v("dayjs.locale()"),t("br"),e._v("查看当前语言配置")])}],x=a("5e81"),w=a.n(x);c.a.extend(w.a);var T={name:"NativeTable",computed:{msg(){return new Date},msg_2(){return c()()},msg_3(){return c.a.locale()},msg_4(){return c()().from(c()("1993-11-18"))}}},k=T,D=(a("d257"),Object(p["a"])(k,g,_,!1,null,"3c31528a",null)),O=D.exports,j=function(){var e=this,t=e._self._c;return t("div",[t("vxe-toolbar",{ref:"xToolbar1",attrs:{custom:""},scopedSlots:e._u([{key:"buttons",fn:function(){},proxy:!0}])}),t("vxe-table",{ref:"xTable1",attrs:{border:"",resizable:"",id:"vxeTable",height:"500","custom-config":{storage:!0,checkMethod:e.checkColumnMethod},data:e.tableData},on:{"resizable-change":e.resizableChangeEvent}},[t("vxe-column",{attrs:{type:"seq",width:"60",align:"right"}}),t("vxe-column",{attrs:{field:"name",title:"Name"}}),t("vxe-column",{attrs:{field:"role",title:"Role"}}),t("vxe-column",{attrs:{field:"sex",title:"Sex"}}),t("vxe-column",{attrs:{field:"age",title:"Age"}})],1)],1)},M=[],S={name:"VxeeTable",props:["tableData"],created(){this.$nextTick(()=>{this.$refs.xTable1.connect(this.$refs.xToolbar1)})},methods:{checkColumnMethod({column:e}){return"role"!==e.property},resizableChangeEvent(){const e=this.$refs.xTable1.getColumns(),t=e.map(e=>({width:e.renderWidth}));console.log(t)}}},F=S,$=(a("46ff"),Object(p["a"])(F,j,M,!1,null,"a9863722",null)),P=$.exports,W=[{username:"王木月",birthday:"1993-11-18",workday:"2016-08-01"},{username:"王景言",birthday:"2020-07-25"},{username:"弓林凡",birthday:"1994-01-04"},{username:"西贝姐",birthday:"1990-05-23"},{username:"朱三心",birthday:"1985-05-23"},{username:"测试",birthday:"2022-06-10"},{username:"测试2",birthday:"2022-05-20"},{username:"测试--没入职日期",birthday:"1900-08-10",deathday:"2021-12-31"},{username:"测试--日期齐全",birthday:"1900-08-10",deathday:"2021-12-31",workday:"1950-08-01"},{username:"测试--没出生日期",deathday:"2021-12-31",workday:"1950-08-01"},{username:"测试--没死亡日期",birthday:"1900-08-10",workday:"1950-08-01"}],z=[{id:10001,name:"Test1",role:"Develop",sex:"Man",age:28,address:"test abc"},{id:10002,name:"Test2",role:"Test",sex:"Women",age:22,address:"Guangzhou"},{id:10003,name:"Test3",role:"PM",sex:"Man",age:32,address:"Shanghai"},{id:10004,name:"Test4",role:"Designer",sex:"Women",age:23,address:"test abc"},{id:10005,name:"Test5",role:"Develop",sex:"Women",age:30,address:"Shanghai"},{id:10006,name:"Test6",role:"Designer",sex:"Women",age:21,address:"test abc"},{id:10007,name:"Test7",role:"Test",sex:"Man",age:29,address:"test abc"},{id:10008,name:"Test8",role:"Develop",sex:"Man",age:35,address:"test abc"}],A={name:"App",components:{EleTable:y,VxeeTable:P,NativeTable:O},data(){return{tableData:W,tableData_2:z}}},C=A,N=Object(p["a"])(C,o,s,!1,null,null,null),Y=N.exports,E=(a("cb5c"),a("e8ec")),J=a.n(E);a("0cf3");l["default"].use(n.a),l["default"].use(J.a),l["default"].config.productionTip=!1,new l["default"]({render:e=>e(Y)}).$mount("#app")},"9a3a":function(e,t,a){},d257:function(e,t,a){"use strict";a("9a3a")},fd83:function(e,t,a){}});