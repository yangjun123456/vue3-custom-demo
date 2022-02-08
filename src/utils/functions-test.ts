
import { getRandom } from './functions';
import { ref, getCurrentInstance, inject } from 'vue';

export class FunctionTest {
    constructor() {
        console.log('%c 测试function.ts 测试方法', 'font-size: 40px;color: #abcdef;')
        this.testGetRandom();
        this.splitConsole();
        this.testUuid();
        this.splitConsole();
        console.log('%c 测试function.ts 测试方法', 'font-size: 40px;color: #abcdef;')
    }

    // 隔断console.log
    splitConsole() {
        console.log('');
        console.log('');
        console.log('');
    }

    // 测试随机数生成
    testGetRandom() {
        console.log(getRandom(15));
    }

    // 测试uuid  通过传参 输出相同uuid值
    testUuid() {
        const $uuid: any = inject('$getUuidv4');
        const $uuidv3: any = inject('$getUuidv3');
        const obj = { a: 1, b: 2, c: 3 };
        const obj2 = { a: 1, b: 2, c: 3 };
        console.log($uuidv3(JSON.stringify(obj), $uuidv3.URL));
        console.log($uuidv3(JSON.stringify(obj2), $uuidv3.URL));
        console.log('uuid 相同');
        console.log($uuidv3('objasdfasdfasdf', $uuidv3.DNS));
        console.log($uuidv3('objasdfasdfasdf', $uuidv3.DNS));
        console.log('uuid 相同');
        console.log('$uuidv3.URL======', $uuidv3.URL);
        console.log('$uuidv3.DNS======', $uuidv3.DNS);
        console.log('%c 如果uuidv3给第二个参数传uuidv3.URL,那么如果前边参数相同，那么生成的uuid相同', 'font-size: 20px;color: red');
        console.log('%c uuidv3的参数只能传字符串，不能传object对象', 'font-size: 20px;color: red');
    }
}
