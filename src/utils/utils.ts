/* eslint-disable */

import moment from 'moment';
import { supplementCode } from '@/config'
export const { floor, random, ceil, pow, round, abs, max, min } = Math;
export const { toString, hasOwnProperty } = Object.prototype;
export const { assign, freeze, keys, values, entries } = Object;

/**
 * 所有数字字母的组合
 */
const STR = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_-';
// 重复100遍， 避免获取5位id时会出现重复， 延长取值长度， 降低重复概率
const STRREPEAT = STR.repeat(100);

/**
 * randomRange 获取范围内的随机数
 * @param {number} min
 * @param {number} max
 * @returns
 */
const randomRange = (min = 0, max = 1) => floor(random() * (max - min + 1)) + min;

/**
 * Get the raw type string of a value, e.g., [object Object].
 */
const typeOf = (val: any) => {
    return toString.call(val).slice(8, -1).toLowerCase();
}
/**
 * Check whether an object has the property.
 */
const hasOwn = (obj: any, key: PropertyKey) => {
    return hasOwnProperty.call(obj, key);
}

/**
 * 判断是否是一个数组
 * @param {*} param
 * @returns {Boolean}
 */
const isArray = (param: any) => {
    return typeOf(param) === 'array';
}

/**
 * 判断是否是一个number
 * @param {*} param
 * @returns {Boolean}
 */
const isNumber = (param: any) => {
    return typeOf(param) === 'number';
}

/**
 * 判断是否是一个string
 * @param {*} param
 * @returns {Boolean}
 */
const isString = (param: any) => {
    return typeOf(param) === 'string';
}

/**
 * 判断是否是一个Object
 * @param {*} param
 * @returns {Boolean}
 */
const isObject = (param: any) => {
    return typeOf(param) === 'object';
}

/**
 * 转换为number
 * @param {number|string} val
 * @returns {Boolean}
 */
const toNumber = (val: string | number) => {
    const n = parseFloat((val as string));
    return isNaN(n) ? val : n;
}

/**
 * 获取随机数设置id
 * @method getRandom
 * @param {number|undefined} c 需要多少位数的随机数
 * @param {number|undefined} s 随机数以什么开头， 给dom做id时不能以数字开头
 * @return {string} 随机数
 */
// const getRandom = (c = 10, s = 'id_') => ((new Array(c)).fill('', 0, c)).reduce((a) => a + (STRREPEAT[randomRange(0, STRREPEAT.length - 1)] || ''), s)
const getRandom = (c = 10, s = 'id_') => (Array.from({ length: c })).reduce((a) => a + (STRREPEAT[randomRange(0, STRREPEAT.length - 1)] || ''), s)
/**
 * 下载文件
 * @param res 文件流
 */
const download = (res: { data: BlobPart; headers: { [x: string]: string; }; }) => {
    try {
        const blob = new Blob([res.data], {
            type: res.headers['content-type']
        });
        const filename = decodeURI(res.headers['content-disposition'])
            .split(';')[1]
            .split('=')[1];
        const reader: FileReader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onload = (e: any) => {
            const a: any = document.createElement('a');
            a.download = filename;
            a.href = e.target.result;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        };
    } catch (error) {
        console.log(error);
    }
};

/**
 * 获取cookie值
 * @param {string} name
 * @returns {string}
 */
const getCookie = (name = 'shiro.session.id') => {
    // 判断cookie 是否存在
    if (document.cookie.length > 0) {
        let start = document.cookie.indexOf(name + '=');
        if (start != -1) {
            start = start + name.length + 1;
            let end = document.cookie.indexOf(';', start);
            if (end === -1) {
                end = document.cookie.length;
            }
            return document.cookie.substring(start, end);
        }
    }
    return '';
};

/**
 *
 * @param {*} n 需要保留小数位数的数字
 * @param {*} fixed 保留几位小数
 * @returns
 */
const toFixed = (n: number, fixed: number) => ~~(pow(10, fixed) * n) / pow(10, fixed);

/**
 * Create a cached version of a pure function.
 */
const cached = (fn: (arg0: any) => any) => {
    let cache = Object.create(null);
    let count = 0;
    return function cachedFn(str: string | number) {
        // 如果缓存数据大于100000 那么清空重新获取数据开始缓存
        if (count > 500000) {
            count = 0;
            cache = Object.create(null);
        }
        count++;
        // console.log(count, cache);
        const hit = cache[str];
        return hit || (cache[str] = fn(str));
    };
}

/**
 * uuid
 */
const uuid = () => {
    // const temp_url = URL.createObjectURL(new Blob());
    // const uuid = temp_url.toString();
    // URL.revokeObjectURL(temp_url);
    // return uuid.substring(uuid.lastIndexOf('/') + 1);

    // 速度比以上更快
    let d = new Date().getTime();
    const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        const r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c == 'x' ? r : (r & 0x3) | 0x8).toString(16);
    });
    return uuid;
}
/**
 * 实现扁平化
 */
const flat: any = (arr: any[]) => arr.reduce((a: any, b: any) => Array.isArray(b) ? [...a, ...flat(b)] : [...a, b], []);

/**
 * 方法说明 获取指定类型的父级元素,或者当前元素就是我们要找的元素
 * @method getParentEle
 * @param {HTMLElement} ele 需要查找的当前元素
 * @param {string|HTMLElement} parent 指定父级元素的id或者className或者元素类型
 * @return {返回值类型} 无
 */
const getParentEle: any = (ele: any, parent: any, count = 8) => {
    count--;
    const { is } = Object;
    if (is(ele.tagName, 'BODY') || count === 0) return false;

    const str = parent.slice(1);
    // 根据className查找 还是根据 id查找 还是根据tagName查找
    const conditionFn =
        (dom: { className: string | any[]; id: any; tagName: any; }, parent: string | any[]) => (is(parent[0], '.') && is(typeOf(dom.className), 'string') && dom.className.includes(str)) ||
            (is(parent[0], '#') && is(dom.id, str)) ||
            is(dom.tagName, (parent as any).toUpperCase());
    if (conditionFn(ele.parentElement, parent)) return ele.parentElement;
    else if (conditionFn(ele, parent)) return ele;
    else return getParentEle(ele.parentElement, parent, count)
};

// 预加载图片, 加载完成回调, 避免切换图片存在闪烁
const preloadImg = (src = '', cb: () => any) => {
    if (!src) false;
    const img = new Image();
    img.src = src;
    if (img.complete) {
        cb && cb();
        return img;
    }
    img.onload = function () {
        cb && cb();
    };
    return img;
};

// 是否是图片格式 http|https + 任意字符 + .png|.jpg|.gif|.jpeg|.webp
const urlIsImage = (str: string) => {
    const reg = /^http[s]?:\/\/[^]+\.(png|jpg|gif|jpeg|webp)$/i;
    // const reg = /[^]+\.(png|jpg|gif|jpeg|webp)$/i;
    return reg.test(str);
};

/**
 * getBase64Image 图片转base64格式
 * @param {string} src
 * @param {Function} cb
 */
const getBase64Image = (src: string, cb: (arg0: string) => any) => {
    // 图片来源必须同域才可
    const img = new Image();
    img.setAttribute('crossOrigin', 'anonymous');
    img.src = src + '?v=' + random(); // 处理缓存
    img.crossOrigin = '*'; // 支持跨域图片
    img.onload = function () {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx: CanvasRenderingContext2D | null = canvas.getContext('2d');
        if (ctx) {
            ctx.drawImage(img, 0, 0, img.width, img.height);
            const dataURL = canvas.toDataURL('image/png'); // 可选其他值 image/jpeg
            cb && cb(dataURL);
        }
    };
};

// 判断日期是否为工作日
const isWeekday = (date: { getDay: () => number; }) => date.getDay() % 6 !== 0;

// 判断当前选项卡是否在视图/焦点中    我们可以使用document.hidden属性检查当前标签页是否在视图/焦点中。
const isBrowserTabInView = () => document.hidden;

// 检查元素当前是否处于焦点
const elementIsInFocus = (el: Element | null) => el === document.activeElement;

// 检查当前用户是否支持触摸事件
const touchSupported = () => {
    return (
        'ontouchstart' in window ||
        ((window as any).DocumentTouch &&
            document instanceof (window as any).DocumentTouch)
    );
};

// 检查当前用户是否在Apple设备上
const isAppleDevice = /Mac|iPod|iPhone|iPad/.test(navigator.platform);

// 滚动到页面顶部
const goToTop = () => window.scrollTo(0, 0);

// 获取参数的平均值
const average = (args: any[]) => args.reduce((a: any, b: any) => a + b) / args.length;

/**
 * 格式化日期 规定标准字符 yMdhmst, 中间分隔符写什么都行， 写多少都行 formatDate('2021-01-01','y-M/d') formatDate('2021-01-01','y-/M-,d')
 * @param {number|string|Date} date
 * @param {string} format
 * @returns
 */
const formatDate = (date: string | number | Date, format = 'y-M-d') => {
    if (Object.is(new Date(date).toDateString(), 'Invalid Date') || ['undefined', 'null'].some(x => typeOf(date) === x)) return date;
    if (format === 'timestamp') return new Date(date).getTime();
    date = date ? new Date(date) : new Date();
    const obj: { [key: string]: any } = {
        'y': String(date.getFullYear()), // 年
        'M': fillZero(date.getMonth() + 1), // 月
        'd': fillZero(date.getDate()), // 日
        'h': fillZero(date.getHours()), // 时
        'm': fillZero(date.getMinutes()), // 分
        's': fillZero(date.getSeconds()), // 秒
        't': (date.getMilliseconds()).toString().padStart(3, '0') // 毫秒
    }
    return format.split('').reduce((a, b) => a + (obj[b] || (typeOf(b) !== 'undefined' ? b : '')), '')
}

/**
 * 添加默认空数组
 * @param {*} _ 如果arr不存在需要默认空数组解决 undefined 的 map|filter 等方法报错
 * @returns
 */
const defArr = (_: any) => _ || [];

// 区分上传的文件类型
const distinguishFileTypes = (fileUrl: string) => {
    if (fileUrl) {
        const fileUrlArr = fileUrl.split('.')
        const _laseOne = fileUrlArr[fileUrlArr.length - 1]
        let laseOne = _laseOne.toLowerCase();

        if (fileUrl.indexOf(';base64,') > 0 && fileUrl.match(/^data:/)) {
            // base64 格式获取文件类型
            laseOne = fileUrl.split(';base64,')[0].split('/')[1];
        }
        const typeMap = [
            [['jpg', 'png', 'gif', 'jpeg', 'bmp'], 'image'],
            [['doc', 'docx'], 'word'],
            [['xls', 'xlsx'], 'excel'],
            [['pdf'], 'pdf'],
            [['mp4', 'avi', 'wmv', 'mpg', 'mpeg', 'mov', 'rm', 'ram', 'swf', 'flv', 'rmvb', 'asf', 'divx', 'mpe', 'mkv', 'vob'], 'video'],
            [['cda', 'wav', 'mp3', 'wma', 'ra', 'midi', 'ogg', 'ape', 'flac', 'aac'], 'audio']
        ];
        return (typeMap.filter((x) => x[0].indexOf(laseOne) > -1)[0] || [])[1] || 'none';
    } else {
        return 'none'
    }
}

/**
 * 文件的上传下载
 * @param {string} type download|preview
 * @param {*} file
 */
const downloadOrPreview = (type: string, file: { fileUrl: any; fileName: string; }, cb: () => any) => {
    if (type === 'download') {
        const url = file.fileUrl;
        const requestX = new XMLHttpRequest();
        requestX.open('GET', url, true);
        requestX.responseType = 'blob';
        requestX.onload = (e) => {
            const url = window.URL.createObjectURL(requestX.response)
            const aTag = document.createElement('a');
            aTag.href = url
            aTag.download = file.fileName; // 下载后的文件名
            aTag.click();
            cb && cb();
        }
        requestX.send();
    } else if (type === 'preview') {
        // console.log()
        const fileType = distinguishFileTypes(file.fileUrl);
        if (fileType === 'image') {
            console.log('预览图片');
            cb && cb();
        } else {
            console.log('预览其他文件');
            cb && cb();
        }
    }
}

// base64 转为blob
const dataURLtoBlob = (dataurl: string) => {
    const arr: any = dataurl.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);

    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }

    return new Blob([u8arr], { type: mime });
};

/**
 * 不同环境下调用方法
 * @param {[]string} types 环境list， 如['dev','test','prod']
 * @param {Function} cb
 */
const diffEnvFun = (types: any[], cb: () => any) => {
    const obj: any = {
        test: 'test',
        dev: 'development',
        prod: 'production'
    }
    if (types.some((x: string) => process.env.NODE_ENV === obj[x])) {
        cb && cb()
    }
}

/**
 * 替空， 解决全局表格内展示空字段时 默认替换的字段
 */
const supplement = (str: number, code: any) => {
    if (!str && str !== 0) {
        return typeOf(code) === 'undefined' ? supplementCode : code;
    } else {
        return str;
    }
}

/**
 * 补零
 */
const fillZero = (str: { toString: () => string; }) => {
    return str.toString().padStart(2, '0');
};

// 数字千分符 12,999,928
const str2thousand = (val: string) => {
    if (val) {
        val = val.toString();
        return val == '' ? val : val.replace(/\d{1,3}(?=(\d{3})+$)/g, '$&,');
    } else {
        return '';
    }
};
// 日期转换成格式 {fmtStr: 'YYYY-MM-DD'}
const dateFmt = (input: any, fmtStr: any) => {
    return moment(input).format(fmtStr);
};

// 设置下拉框的全部项用来清空已经选择的
const setSelectOptAllField = (list: any[], val: any, bol = true) => {
    if (list && list.length) {
        return bol ? [{
            label: '全部',
            value: val || null
        }].concat(list) : list;
    } else {
        return []
    }
};

/**
 * 获取现在到过去的某一个时间点的时间范围
 * @param {*} time 过去多少时间范围， 1*24*60*60*1000=一天 ； 7*24*60*60*1000=一周 ； 2*60*60*1000=两个小时 ；
 * @param {*} startDefTime
 * @param {*} endDefTime
 * @returns
 */
const getTimeRangeFromNowToPrev = (time: number, startDefTime: any, endDefTime: any) => {
    const now = new Date().getTime();
    const prev = now - time;
    const start = startDefTime ? formatDate(prev, 'y-M-d ') + startDefTime : formatDate(prev, 'y-M-d h:m:s');
    const end = endDefTime ? formatDate(now, 'y-M-d ') + endDefTime : formatDate(now, 'y-M-d h:m:s');
    if (process.env.NODE_ENV === 'production') {
        // if( process.env.NODE_ENV === 'development' ){
        return [start, end];
    } else {
        return ['2023-01-01 00:00:00', '2023-10-31 00:00:00'];
    }
};

/**
 * 对object添加customId字段
 */
const addCustomId = (data: any) => {
    if (isArray(data)) {
        for (let i = 0, len = data.length; i < len; i++) {
            addCustomId(data[i]);
        }
    } else if (isObject(data)) {
        data.customId = getRandom(15);
        for (const value of Object.values(data)) {
            addCustomId(value);
        }
    }
}

// api 请求时后端把pageNum和pageSize写到了请求地址栏里， 请求参数里需要删除这两个字段
const formatPaginationReqData = (data: any) => {
    const obj = JSON.parse(JSON.stringify(data));
    const pageNum = obj.pageNum;
    const pageSize = obj.pageSize;
    delete obj.pageNum;
    delete obj.pageSize;
    return {
        pageNum,
        pageSize,
        data: obj
    }
}

// 输出整数字符串， 可用在input输入事件中
const customParseInt = (data: string) => {
    const num = data.replace(/[^0-9]/gi, '');
    return String(toNumber(num));
}

// 输出fixedNum 位数的小数字符串， 可用在input输入事件中
const customParseFloat = (data: string, fixedNum = 2) => {
    const list = data.replace(/[^0-9.]/gi, '').split('.').slice(0, 2);
    list[0] = String(toNumber(list[0] || ''));
    if (list.length === 2 && !list[0]) {
        // 处理输入 '.1' 或 '.' 的情况 变为 '0.1' 或者 '0.'
        list[0] = '0';
    }
    if (list[1]) {
        // 保留小数
        list[1] = list[1].slice(0, fixedNum);
        return list.join('.');
    }
    if (list.length === 2 && !list[1]) {
        // 避免输入到 . 的时候不显示 .
        return list[0] + '.';
    }
    return list[0]
}

//  添加jsonparse条件判断， 避免parse报错
const jsonParse = (data: string) => {
    try {
        const newData = JSON.parse(data);
        return newData;
    } catch (error) {
        console.log(error);
        return false;
    }
}

// 简单的 针对于对象的参数覆盖和继承, 如果对象中的某一个value其中包含了数组类型 就直接覆盖
const objCoverAndInherit = (config: { [x: string]: any; }, midConfig: { [x: string]: any; }) => {
    // 循环配置项,如果传进来有数据,那么就替换掉,如果没有就保持原始数据
    for (const key in config) {
        if (Object.keys(midConfig).includes(key)) {
            // 如果传入的对象的key 在组件内的参数中的key存在那么执行递归或者赋值
            // 仅针对对象采用递归修改， 数组格式直接覆盖
            if (typeOf(midConfig[key]) === 'object') {
                objCoverAndInherit(config[key], midConfig[key]);
            } else {
                midConfig[key] = config[key];
            }
        }
        //  else {
        //     // 如果传入的对象的key 在组件内的参数中的key不存在那么直接赋值, 应该用不到， 把组件内的默认参数做好就可以了
        //     midConfig[key] = config[key];
        // }
    }
}

/**
 * 深入查找某一个对象的key为field，value为value 的对象， arr.find 的递归查找模式, 可批量查找 prop==='x'||prop==='y'||prop==='z'等
 * @param {*} data 值， 任意深度的list或者object
 * @param {*} field 要查找的字段 key
 * @param {*} value 要查找的字段value
 * @param {*} list 定义result 数组list
 * @param {*} condition 条件， 其他的复杂条件查找， 如果condition存在， field和value可填空
 * @returns
 */
const findField = (data: any, field: string | number, value: any[], list: any[], condition: (arg0: any) => any) => {
    if (isArray(data)) {
        for (let i = 0; i < data.length; i++) {
            findField(data[i], field, value, list, condition)
        }
    } else if (typeOf(data) === 'object') {
        if (condition) {
            // 条件查找
            try {
                if (condition(data)) {
                    list.push(data);
                }
            } catch (error) {
                console.log(error);
            }
        } else {
            if (
                (isArray(value) && value.some((x: any) => data[field] === x)) ||
                ((isString(value) || isNumber(value)) && data[field] == value)) {
                // 如果value是数组 那么就是批量查找field为每一个value的值， 如果value是字符串或者number 那么查找单一的field为value的值
                list.push(data);
            }
        }
        Object.values(data).map(l => {
            findField(l, field, value, list, condition);
        })
    }
    return list;
}

/**
 * 减法运算
 * 如果有一个被toNumber转化后不是数值， 那么返回false
 * 如果都是数值， 那么执行先扩大值， 再执行， 再缩回的方式进行减法操作， 保留两位小数
 * @param {*} a
 * @param {*} b
 * @returns
 */
const subtract = (a: number, b: number, fixed = 2) => {
    if (typeOf(toNumber(a)) !== 'number' || typeOf(toNumber(b)) !== 'number') {
        return false;
    }
    return toFixed((a * Math.pow(10, 5) - b * Math.pow(10, 5)) / Math.pow(10, 5), fixed);
}

/**
 * 校验返回默认值， 在html中代替 ?. 的使用， 低版本node下使用 ?. 会编译报错
 * fieldList 是对象的层级深入字段 例如 obj.a.b.c.d, 那么data初始可以是obj.a||obj.a.b等, 填写的是确定存在的值，
 * 如果不确定是否存在 那么字段写入fieldList, 即 (obj,['a','b','c','d'], '') 依次取值.a、.b、.c、.d， 如果.a下不存在.b， 那么被catch捕获， 返回空字符串
 * @param {*} data 原始数据对象
 * @param {*} fieldList 字段列表
 * @param {*} def 默认值
 * @returns 返回取到的值或者返回默认值
 */
const getObjDeepField = (data: { [x: string]: any; }, fieldList: any, def: any) => {
    try {
        const list = !isArray(fieldList) ? [fieldList] : fieldList;
        list.forEach((x: string | number) => {
            data = data[x];
        })
        return data;
    } catch (error) {
        return def;
    }
}

// 设置样式
const setStyle = (dom: { style: { [x: string]: any; }; }, styleObj: { [x: string]: any; }) => {
    Object.keys(styleObj).forEach(x => {
        dom.style[x] = styleObj[x];
    })
}

// 使用HTML5进行文字转语音
const textToVoice = (config: { text: string; lang: string; rate: number; }, isRepeat = false) => {
    const u = new SpeechSynthesisUtterance();
    u.text = config.text;
    u.lang = config.lang || 'zh';
    u.rate = config.rate || 1;
    speechSynthesis.speak(u);
    return u;
}

// 常用方法
export {
    typeOf, // 类型判断
    hasOwn, // hasOwnProperty
    isArray,
    isString,
    isNumber,
    isObject,
    toNumber, // 转换为number
    randomRange, // 获取范围内的随机数
    getRandom, // 获取大小写字母和数字组成的随机数
    download, // 下载文件
    getCookie, // 获取cookie
    toFixed, // 保留小数位数
    cached, // 添加缓存， 如果频繁调用或者使用可使用cache缓存
    uuid, // 获取uuid
    flat, // 数组扁平化
    getParentEle, // 获取父级元素
    preloadImg, // 预加载图片
    urlIsImage, // 判断url是否是图片
    getBase64Image, // 图片转base64
    isWeekday, // 判断日期是否为工作日
    average, // 平均数
    formatDate, // 格式化日期
    defArr, // 添加默认空数组
    distinguishFileTypes, // 区分文件类型
    downloadOrPreview, // 下载和预览文件
    dataURLtoBlob, // base64 url 转为blob类型
    diffEnvFun, // 不同环境下调用方法
    supplement, // 空数据使用什么字符替换， 替空操作
    str2thousand, // 千分符， 数字三位添加一个分隔符
    dateFmt, // 使用moment进行日期格式化
    fillZero, // 补零， 数值向前补0， 9=>09
    setSelectOptAllField, // 设置element的下拉选择框添加全部字段用来清空已经选择的
    getTimeRangeFromNowToPrev, // 获取现在到过去的某一个时间点的时间范围
    addCustomId, // 对object添加customId字段
    formatPaginationReqData, // 格式化分页请求参数
    customParseFloat, // 输出fixedNum 位数的小数字符串
    customParseInt, // 输出整数字符串
    jsonParse, //  添加jsonparse条件判断
    objCoverAndInherit, // 简单的 针对于对象的参数覆盖和继承, 如果对象中的某一个value其中包含了数组类型 就直接覆盖
    findField, // 深入查找某一个对象的key为field，value为value 的对象， arr.find 的递归查找模式
    subtract, // 减法
    getObjDeepField, // 校验返回默认值， 在html中代替 ?. 的使用， 低版本node下使用 ?. 会编译报错
    setStyle, // dom添加样式
    textToVoice // 文字转语音
};

// 不常用
export {
    isBrowserTabInView,
    elementIsInFocus,
    touchSupported,
    isAppleDevice,
    goToTop
}
