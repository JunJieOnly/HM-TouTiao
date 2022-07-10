import Vue from "vue"
import dayjs from "dayjs"
// 处理相对时间
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)
// 配置中文语言包
import 'dayjs/locale/zh-cn'
dayjs.locale('zh-cn')
// console.log(dayjs().to(dayjs("2019-03-11 09:00:00")));到 X 的相对时间
// 设置全局过滤器
Vue.filter("relativeTime", val => dayjs().to(dayjs(val)))