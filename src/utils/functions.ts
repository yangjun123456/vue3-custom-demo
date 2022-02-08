import router from '@/router';
import { Decimal } from 'decimal.js';
import XEUtils from 'xe-utils';

/**
 * 方法说明 获取随机数设置id，类似于uuid
 * @method getRandom
 * @param {number|undefined} count 需要多少位数的随机数
 * @return {string} 随机数
 */
const getRandom = (count: number = 10) => {
    count = count < 10 ? 10 : count;
    const random = Math.random();
    const num = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    const a = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'G', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
    ];

    let str = a[parseInt(String(Math.random() * a.length), 10)];

    for (let i = 0; i < count - 1; i++) {
        if (Math.random() > 0.5) {
            str += num[parseInt(String(Math.random() * num.length), 10)];
        } else {
            str += a[parseInt(String(Math.random() * a.length), 10)];
        }
    }
    return str;
};

/**
 * 方法说明 获取指定类型的父级元素,或者当前元素就是我们要找的元素
 * @method getParentEle
 * @param {HTMLElement} ele 需要查找的当前元素
 * @param {string|HTMLElement} parent 指定父级元素的id或者className或者元素类型
 * @return {返回值类型} 无
 */
const getParentEle = (ele: any, parent: any): any => {
    const str = parent.replace(/\.|#/, '');
    // console.log(ele);
    // console.log(ele, ele.className, ele.parentElement, ele.parentElement.className);
    if (
        parent.indexOf('.') !== -1 &&
    typeof ele.parentElement.className === 'string' &&
    ele.parentElement.className.indexOf(str) !== -1
    ) {
        return ele.parentElement;
    } else if (parent.indexOf('#') !== -1 && ele.parentElement.id === str) {
        return ele.parentElement;
    } else if (ele.parentElement.tagName === parent.toUpperCase()) {
        return ele.parentElement;
    } else if (
        parent.indexOf('.') !== -1 &&
    typeof ele.className === 'string' &&
    ele.className.indexOf(str) !== -1
    ) {
        return ele;
    } else if (parent.indexOf('#') !== -1 && ele.id === str) {
        return ele;
    } else if (ele.tagName === parent.toUpperCase()) {
        return ele;
    }
    if (ele.tagName === 'BODY') {
        console.log('zhaobudao');
        return 'zhaobudao';
    }
    // console.log(ele, parent, ele.parentElement);
    return getParentEle(ele.parentElement, parent);
};
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

// 乘法 return a*b
const decMul = (a: number, b: number): number => {
    const res: any = new Decimal(a).mul(new Decimal(b));

    return parseFloat(res);
};

// 除法 return a/b
const decDiv = (a: number, b: number): number => {
    const res: any = new Decimal(a).div(new Decimal(b));

    return parseFloat(res);
};

// 加法 return a + b
const decAdd = (a: number, b: number): number => {
    const res: any = new Decimal(a).add(new Decimal(b));

    return parseFloat(res);
};

const changeWhatIfAnalysis = (num: number) => {
    // 转换为M
    if (isNaN(num)) {
        const val = num / 1000000;
        return String(val).includes('.')
            ? XEUtils.commafy(val.toFixed(2)) + 'M'
            : XEUtils.commafy(val) + 'M';
    } else {
        const val = num / 1000000;
        return String(val.toFixed(2)) + 'M';
    }
};
const changeWhatIfAnalysisInteger = (num: number) => {
    // 柱状图下方表格转换单位为M处理
    if (num > 0) {
        const val = num / 1000000;
        if (val < 10) {
            return Math.round(val * 100) / 100;
        } else {
            return Math.round(val);
        }
    } else {
        const val = num / 1000000;
        if (-val < 10) {
            return Math.round(val * 100) / 100;
        } else {
            return Math.round(val);
        }
    }
};
// 转化数据的单位为K
const changeUnits = (num: number) => {
    const val = num / 1000;
    return String(val).includes('.')
        ? XEUtils.commafy(val.toFixed(2)) + 'k'
        : XEUtils.commafy(val) + 'k';
};
// 向上取整转化数据的单位为K
const PieTitlechangeUnits = (num: number) => {
    // 不够1k，返回具体数值
    if (num < 1000) {
        return num;
    } else {
        const val = num / 1000;
        return String(XEUtils.commafy(Math.round(val))) + 'k';
    }
};
const downloadAsXLS = (res: any) => {
    let fileName = 'data.xlsx';

    // 后端设置的文件名称在res.headers的 "content-disposition": "form-data; name=\"attachment\"; filename=\"20181211191944.zip\"",
    if (res.headers['content-disposition']) {
        fileName = res.headers['content-disposition'].split(';')[1].split('=')[1];
    }

    const blob = res.data;
    // console.log('下载文件=>：', fileName, res);
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onload = (e: any) => {
        const a = document.createElement('a');
        a.download = fileName;

        a.href = e.target.result;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    };
};

// 预加载图片, 加载完成回调, 避免切换图片存在闪烁
const preloadImg = (src = '', cb: any) => {
    if (!src) {
        return false;
    }
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
    // const reg = /^http[s]?:\/\/[^]+\.(png|jpg|gif|jpeg|webp)$/i;
    const reg = /[^]+\.(png|jpg|gif|jpeg|webp)$/i;
    return reg.test(str);
};
const getBase64Image = (src: string, cb: any) => {
    // 图片来源必须同域才可
    const img = new Image();
    img.src = src + '?v=' + Math.random(); // 处理缓存
    img.crossOrigin = '*'; // 支持跨域图片
    img.onload = function () {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx: any = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, img.width, img.height);
        const dataURL = canvas.toDataURL('image/png'); // 可选其他值 image/jpeg
        cb && cb(dataURL);
    };
};

// 判断日期是否为工作日
const isWeekday = (date: Date) => date.getDay() % 6 !== 0;

// 判断当前选项卡是否在视图/焦点中    我们可以使用document.hidden属性检查当前标签页是否在视图/焦点中。
const isBrowserTabInView = () => document.hidden;

// 从日期获取时间
const timeFromDate = (date: Date) => date.toTimeString().slice(0, 8);

// 将数字四舍五入到固定的小数点
const toFixed = (n: number, fixed: number) =>
    ~~(Math.pow(10, fixed) * n) / Math.pow(10, fixed);
// toFixed(25.198726354, 1); // 25.1
// toFixed(25.198726354, 2); // 25.19
// toFixed(25.198726354, 3); // 25.198

// 检查元素当前是否处于焦点
const elementIsInFocus = (el: any) => el === document.activeElement;

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
const average = (...args: any) =>
    args.reduce((a: any, b: any) => a + b) / args.length;

export {
    getRandom,
    getParentEle,
    getCookie,
    decMul,
    decDiv,
    decAdd,
    changeUnits,
    PieTitlechangeUnits,
    changeWhatIfAnalysis,
    changeWhatIfAnalysisInteger,
    downloadAsXLS,
    getBase64Image,
    urlIsImage,
    preloadImg,
    isWeekday,
    isBrowserTabInView,
    timeFromDate,
    toFixed,
    elementIsInFocus,
    touchSupported,
    isAppleDevice,
    goToTop,
    average
};
