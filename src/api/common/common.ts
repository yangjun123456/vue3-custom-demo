// 项目需要公共的接口
import { http } from '@/service';

// 获取行政区划树
export const messagePage = (data: {
    pageNum: number;
    pageSize: number;
    keyWord: string;
    type: string;
    startTime: string;
    endTime: string;
}) => {
    return http.request({
        url: '/api/comm/message/page',
        method: 'post',
        data
    });
};
