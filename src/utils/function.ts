/* eslint-disable */

import { hasOwn, jsonParse, setSelectOptAllField, toNumber, typeOf } from './utils';
import moment from 'moment';
import * as customConfig from '@/config';
import constant from './constant';
import { localCache } from './storage';

// 格式化季度组件格式------ 年-月 转化为 年-季度
const formatQuarter = (value: string) => {
    if (!value) {
        return value;
    }
    const obj: { [key: string]: string } = {
        '01': '1',
        '02': '1',
        '03': '1',
        '04': '2',
        '05': '2',
        '06': '2',
        '07': '3',
        '08': '3',
        '09': '3',
        '10': '4',
        '11': '4',
        '12': '4'
    }
    const year = value.split('-')[0];
    const month = value.split('-')[1];
    return year + '-' + obj[month];
}

// 操作常量枚举需要的方法
const constantFun = {
    _this: () => {
        return this;
    },
    // 获取constant中定义的枚举值
    getFieldVal(type: string, key: any) {
        if (hasOwn((constant as any)[type], key)) {
            return (constant as any)[type][key] || '';
        } else if (hasOwn((constant as any)[type], 'preffix_' + key)) {
            return (constant as any)[type]['preffix_' + key] || '';
        }
    },
    // 获取constant中定义的枚举对象
    getTypeObj(type: string | number) {
        return (constant as any)[type] || {};
    },
    /**
     * 获取constant中定义的枚举数组
     * @param {*} type field类型
     * @param {*} tranValueFun 需要转换成的类型值
     * @returns
     */
    getTypeList(type: string | number, tranValueFun = String) {
        const o = JSON.parse(JSON.stringify(this.getTypeObj(type)));
        const list:any[] = [];
        Object.keys(o).forEach(x => {
            list.push([tranValueFun.call(this, x.replace(/preffix_/gi, '')), o[x]]);
        })
        return list;
    },
    /**
     * constant 中数据设置下拉框数据列表时添加全部字段
     * @param {*} type 获取的constant类型
     * @param {*} isAddField 是否需要添加全部字段下拉框值
     * @param {*} def 全部字段的value值
     * @param {*} tranValueFun 转换方法， 如果需要String, 那么转为String， 如果需要number, 那么转为Number
     * @returns
     */
    setElSelectData(type: string | number, isAddField = true, def = null, tranValueFun = String) {
        const list = this.getTypeList(type, tranValueFun);
        const arr = [];
        for (let i = 0, val = list, len = val.length; i < len; i++) {
            arr.push({
                label: val[i][1],
                value: val[i][0]
            })
        }
        return isAddField ? setSelectOptAllField(arr, def) : arr;
    }
}

// 通过constant中定义的常量枚举获取值
const getEnumValue = (type: string, key: PropertyKey) => {
    return constantFun.getFieldVal(type, key);
}

// 拆解URL参数 组合成为object
const getUrlParams = (url: string) => {
    url = decodeURIComponent(url);
    const searchParam = url.split('?')[1];
    if (!searchParam) {
        return {};
    }
    const obj:any = {};
    searchParam.split('&').forEach((x: any) => {
        const [a, b] = x.split('=');
        // 映射undefined、null、NaN
        const o:any = {
            'undefined': undefined,
            'null': null,
            'NaN': NaN,
            default: b
        }
        obj[a] = o[b] || o.default;
    })
    return obj;
}

/**
 * 通过判断父级标签数量的方式控制是否清空缓存， 缓存在localstorage中， 存在缓存读取缓存， 否则执行程序进行存储
 * @param {*} str 缓存的key
 * @param {*} fn 执行的方法， 包含三个参数， 1. 设置setItem缓存的回调， 2. Promise的resolve回调， 3. Promise的reject回调
 * @returns Promise
 */
const localCached = async (str: string, fn: (arg0: (data: any) => void, arg1: (value: unknown) => void, arg2: (reason?: any) => void) => void) => {
    const panelList = (top as any).window.document.querySelectorAll('.page-content .layui-tab-title li'); // 标签页的数量
    // 初始有一个欢迎页面， 打开一个新的就是最少两个， 也就是打开第一个标签页时就开启缓存
    if (panelList.length <= 2) {
        // 清空条件， 所有数据都重新获取
        localCache.clear();
    }
    const a = localCache.getItem(str);
    if (a) {
        return new Promise((resolve, reject) => {
            resolve(a);
        })
    } else {
        return new Promise((resolve, reject) => {
            fn((data: any) => {
                localCache.setItem(str, data);
            }, resolve, reject)
        })
    }
}
/**
 * 组件的公共回调方法 （限制了function的调用名称必须要与组件内一致, 如果一个组件内引用了两个表格， 那么rowClick事件会冲突， 但是可以通过参数进行判断执行）
 * @param {*} params {function: 方法， data: 数据}
 * @param {*} vm 使用组件的this指针
 * @returns
 */
const callbackComponent = (params: { function: string | number; data: any; }, vm: { [x: string]: (arg0: any) => any; }) => vm[params.function](params.data);

/**
 * 获取@/config 下配置
 */
const getConfig = (type: string | number) => {
    return (customConfig as any)[type];
}

export {
    formatQuarter, // 季度组件的格式化
    constantFun, // 操作常量枚举需要的方法
    getEnumValue, // 获取constant.js中定义的常量枚举
    getUrlParams, // 获取url参数
    localCached, // 使用localCached缓存
    callbackComponent, // 组件的公共回调方法
    getConfig
}
