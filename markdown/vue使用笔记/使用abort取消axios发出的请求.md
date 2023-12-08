### 取消请求
#### axios
```javascript
// axios 请求及取消请求的方法
async function getOrgMenuTree() {
    try {
        let res = {};
        // 定义一个controller用于取消发起的请求
        const abort = new AbortController();
        setTimeout(() => {
            // 3秒后取消请求
            abort.abort();
        }, 3000)
        res = await httpPost({
            url: apiPath + '/aaaa/aaaa',
            data: {},
            config: {
                // 放到config中， 而不是data请求参数中
                signal: abort.signal,
            }
        });
        if (res?.code === 200) {
            this.$message.success('获取数据成功');
        } else {
            this.$message.error('获取数据失败');
        }
    } catch (error) {
        console.error(error);
    }
},
```
#### fetch
1. get请求的传参方式和取消请求方式
```javascript
const abort = new AbortController();
setTimeout(() => {
    abort.abort();
}, 3000)
fetch(apiPath + '/orgMain/orgTree?a=1&b=2', {
    method: 'get',
    signal: abort.signal,
}).then(()=>{}).catch(err=>console.error(error));
```

2. post请求的传参方式和取消请求方式
```javascript
const abort = new AbortController();
setTimeout(() => {
    abort.abort();
}, 3000)
fetch(apiPath + '/orgMain/orgTree', {
    method: 'post',
    body: JSON.stringify({
        a:1,
        b:2
    }),
    headers:{
        'Content-Type': 'application/json'
    },
    signal: abort.signal,
}).then(()=>{}).catch(err=>console.error(error));
```

3. post请求的传参方式和取消请求方式
```javascript
const abort = new AbortController();
setTimeout(() => {
    abort.abort();
}, 3000)
fetch(apiPath + '/orgMain/orgTree', {
    method: 'post',
    body: 'a=1&b=2',
    headers:{
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    signal: abort.signal,
}).then(()=>{}).catch(err=>console.error(error));
```
