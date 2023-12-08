import HttpRequest from './axios'
const http = new HttpRequest(process.env.NODE_ENV === 'production' ? '/' : '/', 60000); // 不同的服务需要不同的代理， 根据不同的代理在vue.config.js 中进行配置
const http2 = new HttpRequest('/api2', 50000); // 不同的服务需要不同的代理， 根据不同的代理在vue.config.js 中进行配置
const http3 = new HttpRequest('/api3', 80000); // 不同的服务需要不同的代理， 根据不同的代理在vue.config.js 中进行配置
export { http, http2, http3 }

interface HttpObj {
    url: string | Function,
    method: string,
    config: object,
    data: object,
    params: object
}

/**
 * 请求方法
 * @param {object} obj
 * @param {number|undefined} maxCount 失败重连次数 输入1 允许重连1次，共计调用两次
 * @returns
 */
export const httpRequest = (obj: HttpObj, maxCount = 0): any => {
    obj.config = obj.config || {}; // 配置项， 例如下载时设置responseType: 'blob'
    obj.data = obj.data || {}; // post请求data参数
    obj.params = obj.params || {}; // get请求params参数
    const { url, method, data, params, config } = obj;
    return http.request({
        url,
        method,
        data,
        params,
        ...config
    }).catch(err => {
        // 设置失败重连
        if (maxCount <= 0) {
            return Promise.reject(err);
        }
        return httpRequest(obj, maxCount - 1);
    })
}

// get 请求
export const httpGet = (obj: HttpObj, maxCount = 0) => {
    return httpRequest({ ...obj, method: 'get' }, maxCount);
}

// post 请求
export const httpPost = (obj: HttpObj, maxCount = 0) => {
    return httpRequest({ ...obj, method: 'post' }, maxCount);
}
