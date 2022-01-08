import { ref } from 'vue';
import { useStore } from 'vuex';
export default function () {
  const websocket: any = ref(null);
  if ('WebSocket' in window) {
    websocket.value = new WebSocket('ws://127.0.0.1:3000');
  } else {
    alert('该浏览器不支持websocket!');
  }

  websocket.value.onopen = function (event: any) {
    console.log('建立连接');
    websocket.value.send('链接成功');
  };
  websocket.value.onsend = function (data:any) {
    console.log(data);
    websocket.value.send(data);
  };

  websocket.value.onclose = function (event: any) {
    console.log('连接关闭');
  };

  websocket.value.onmessage = function (event:any) {
    console.log('收到消息:' + event.data);
    // 所要执行的操作
  };

  websocket.value.onerror = function () {
    alert('websocket通信发生错误！');
  };

  window.onbeforeunload = function () {
    websocket.value.close();
  };

  return {
    open: websocket.value.onopen,
    close: websocket.value.onclose,
    message: websocket.value.onmessage,
    error: websocket.value.onerror,
    send: websocket.value.onsend,
    beforeunload: websocket.value.onbeforeunload

  }
}
