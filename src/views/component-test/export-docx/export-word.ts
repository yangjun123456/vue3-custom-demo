import htmlDocx from 'html-docx-js/dist/html-docx';
import saveAs from 'file-saver';

export class Export2Word {
    export2Word(dom:any) {
        const node:any = dom?.cloneNode(true); // clone 一份node
        const _node:any = dom; // 获取原始dom样式的node

        // 保存样式表
        const styleSheet = this._setStyleSheet(node, _node);

        console.log(styleSheet);
        console.log(node);
        console.log(node?.innerHTML);

        const el = node?.innerHTML;
        // el = `<div id="abcdefg">
        //     <span style="display:block;width: 1000px;">asdfasfd</span>
        //     <span style="display:block;float:right;">456782934</span>
        // </div>`
        console.log(111, el);
        const page = `<!DOCTYPE html><html><head><meta charset="UTF-8">
        <style>${styleSheet}</style>
        </head><body>${el}</body></html>`;
        console.log(page);
        // var converted = htmlDocx.asBlob(page,{orientation: 'landscape', margins: {top: 720}});
        const converted = htmlDocx.asBlob(page, { margins: { top: 720 } });
        // 用 FielSaver.js里的保存方法 进行输出
        saveAs(converted, 'test.docx');
    }

    // 设置样式表
    private _setStyleSheet(elItem: any, _elItem:any) {
        let styleSheet = '';
        // 递归设置所有子元素的样式表
        const setStyleSheet = (el:any, _el:any) => {
            // 获取所有子元素
            const children = Array.from(el?.children);
            // 获取所有样式
            const computedStyle = this._getComputedStyleByEl(_el);
            // style 样式的 字符串拼接
            let style:any = '{';
            let value:any = '';
            for (value of Object.values(computedStyle[1])) {
                // 设置横线显示为驼峰显示
                const key = value.replace(/-[a-z]/g, (a:any) => a.toUpperCase()).replace(/-/g, '');
                if (computedStyle[0][key]) {
                    if (key === 'width') {
                        computedStyle[0][key] = '500px';
                    }
                    // 拼接每一个样式
                    style += `${value}: ${computedStyle[0][key]};`
                }
            }
            style += '}';
            // 设置随机id，用于绑定样式
            const random = Math.random() * Math.pow(10, 20);
            const id = 'a' + random;
            styleSheet += `#${id}${style}`;
            el.id = id;
            if (children.length) {
                const children2 = Array.from(_el?.children);
                children.map((x:any, index:number) => {
                    return setStyleSheet(x, children2[index]);
                })
            }
        }
        setStyleSheet(elItem, _elItem);
        return styleSheet;
    }

    // 过滤掉以数字为key的键值对
    private _getComputedStyleByEl(el:any) {
        const style:any = getComputedStyle(el);
        // key为驼峰式的样式对象
        const obj1:any = {};
        // key为number， value为横线连接的属性值
        const obj2:any = {};
        for (const key in style) {
            if (Object.prototype.hasOwnProperty.call(style, key)) {
                if (isNaN(parseFloat(key))) {
                    obj1[key] = style[key];
                }
            }
        }
        for (const key in style) {
            if (Object.prototype.hasOwnProperty.call(style, key)) {
                if (!isNaN(parseFloat(key))) {
                    obj2[key] = style[key];
                }
            }
        }
        return [obj1, obj2];// 第一项是驼峰式，用于取值； 第二项是横线连接式包含了需要样式key值
    }
}
