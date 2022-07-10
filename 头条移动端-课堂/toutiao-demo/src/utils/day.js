import dayjs from "dayjs"
import Vue from "vue"
// 加载语言包
import 'dayjs/locale/zh-cn'
// 使用语言包
dayjs.locale('zh-cn')
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)
// 定义一个全局过滤器
Vue.filter("relativeTime", val => dayjs().to(dayjs(val)))