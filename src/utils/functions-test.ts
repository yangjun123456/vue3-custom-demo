import { getRandom } from './function';
import { sm4Encrypt, aesEncrypt } from '../libs/utils';
import { validatorPhoneNum, strInsert } from './validator';
import { ref, getCurrentInstance, inject } from 'vue';
import { Base64, encode, decode } from 'js-base64';
export class FunctionTest {
    constructor() {
        this.splitConsole();
        this.splitConsole();
        this.splitConsole();
        this.splitConsole();
        this.splitConsole();
        this.splitConsole();
        this.splitConsole();
        console.log(
            '%c 测试function.ts 测试方法',
            'font-size: 40px;color: #abcdef;'
        );
        this.testGetRandom();
        this.splitConsole();
        this.testUuid();
        this.splitConsole();
        this.encrypt();
        this.splitConsole();
        console.log(
            '%c 测试function.ts 测试方法',
            'font-size: 40px;color: #abcdef;'
        );
        this.splitConsole();
        this.splitConsole();
        this.splitConsole();
        this.splitConsole();
        this.splitConsole();
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
        console.log(
            '%c 如果uuidv3给第二个参数传uuidv3.URL,那么如果前边参数相同，那么生成的uuid相同',
            'font-size: 20px;color: red'
        );
        console.log(
            '%c uuidv3的参数只能传字符串，不能传object对象',
            'font-size: 20px;color: red'
        );
    }

    /**
   * 验证正则匹配
   */
    validatorPhoneFun() {
        validatorPhoneNum('15931501775');
    }

    /**
   * 正则分割
   */
    validatorStrInsert() {
        strInsert('121233123', 4);
    }

    /**
   * 验证密码加密
   */
    encrypt() {
        {
            // sm4 加密解密方法， 需要依赖js-base64
            const aEncodeEncrypt = sm4Encrypt('888888', 'encrypt');
            const aDecodeEncrypt = sm4Encrypt(aEncodeEncrypt, 'decrypt');
            console.log('sm4加密解密方式', aEncodeEncrypt, aDecodeEncrypt);
        }
        {
            // base64加密解密方式 需要依赖js-base64
            const aEncodeEncrypt = encode('888888');
            const aDecodeEncrypt = decode(aEncodeEncrypt);
            console.log('base64加密解密方式', aEncodeEncrypt, aDecodeEncrypt);
        }
        {
            // aes加密解密方式
            const aEncodeEncrypt = aesEncrypt('888888', 'encrypt');
            const aDecodeEncrypt = aesEncrypt(aEncodeEncrypt, 'decrypt');
            console.log('aes加密解密方式', aEncodeEncrypt, aDecodeEncrypt);
        }
    }
}
