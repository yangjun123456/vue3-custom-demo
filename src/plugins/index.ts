// ant-design-vue
import { setupAntd } from '@/plugins/ant-design-vue';
// vue-i18n 多语言
import { setupI18n } from '@/plugins/vue-i18n';
// element-plus
import { setupElementPlus } from '@/plugins/element-plus';
import { setupVXETable } from '@/plugins/vxe-table';
import * as lodash from 'lodash'
import moment from 'moment';
// uuid
import { v4 as uuidv4, v3 as uuidv3 } from 'uuid';

import store from '@/store'

import { getToken } from '@/utils/auth'

import { messageDuration } from '@/config'
import { ElMessage } from 'element-plus'
import * as utils from '@/utils/utils';
import * as functions from '@/utils/function';

const install = (app: any, opts = {}) => {
    /* 全局Message */
    app.config.globalProperties.$message = (options: any, type: string) => {
        if (utils.isString(options)) {
            options = {
                message: options
            }
        }
        options.type = type;
        options = Object.assign({
            offset: 60,
            showClose: true,
            dangerouslyUseHTMLString: true,
            duration: messageDuration
        }, options);
        ElMessage(options);
    }

    // /* 全局Confirm */
    // app.config.globalProperties.$confirm = (content: string, title: string, callback1: Function, callback2: Function) => {
    //     MessageBox.confirm(content, title || '温馨提示', {
    //         confirmButtonText: '确定',
    //         cancelButtonText: '取消',
    //         closeOnClickModal: false,
    //         type: 'warning',
    //     })
    //         .then(() => {
    //             if (callback1) {
    //                 callback1()
    //             }
    //         })
    //         .catch(() => {
    //             if (callback2) {
    //                 callback2()
    //             }
    //         })
    // }

    // /* 全局Notification */
    // app.config.globalProperties.$notify = (message: string, title: string, type: string, position: string) => {
    //     Notification({
    //         title: title,
    //         message: message,
    //         position: position || 'top-right',
    //         type: type || 'success',
    //         duration: messageDuration,
    //     })
    // }

    /* 全局lodash */
    app.config.globalProperties.$lodash = lodash;
    /* moment 时间格式化 */
    app.config.globalProperties.$moment = moment;
    /* 全局添加utils/function 方法 */
    app.config.globalProperties.$utils = utils;
    app.config.globalProperties.$functions = functions;

    app.config.globalProperties.$uuid = uuidv4;
    app.config.globalProperties.$uuidv3 = uuidv3;
    console.log(app);
}

export function setPlugins(app: any) {
    setupElementPlus(app);
    setupAntd(app);
    setupI18n(app);
    setupVXETable(app);

    install(app);
    app.provide('$utils', app.config.globalProperties.$utils);
    app.provide('$getUuidv4', uuidv4); // 组件内需使用inject 引入
    app.provide('$getUuidv3', uuidv3); // 组件内需使用inject 引入
}
