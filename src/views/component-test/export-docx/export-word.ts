import htmlDocx from 'html-docx-js/dist/html-docx';
import saveAs from 'file-saver';

/**
 * word导出说明
 * 1. 调用 export2Word 方法，传入相应参数
 * 2. 在html中设置 export2wordOption="{export2wordTransform2table:true,export2wordTransform2inline:true}" 属性， 属性值根据需要进行增改
 * 3. export2wordTransform2inline 在需要转为inline内元素的标签上加export2wordTransform2inline类名， 因为好多样式导出word后不支持，需要转换为span标签才能使多个标签的文本显示在同一行中
 * 4. export2wordTransform2table 一行中的 两列或者多列布局需要转换成为table， 添加export2wordTransform2table类名， 可以转换成为table布局， 实现类似flex 和 float 的效果
 * 5. word文档中不需要考虑同行文字水平居中对齐的问题
 * 6. 当前未处理图片，如果引入的是在线的图片可以显示，如果引入的不是在线的图片不能正常显示
 */

class Export2Word {
    /**
   * export2Word 导出word文档 方法
   * @param {any} dom 需要转换成为html导出word的元素
   * @param {string} fileName 导出的word名称
   * @returns {any} void
   */
    public export2Word(dom: any, fileName: string = 'test.docx') {
        const node: any = dom?.cloneNode(true); // clone 一份node
        const _node: any = dom; // 获取原始dom样式的node

        // 找到需要转换成为span标签的类名，转换成为span标签， 以用于导出的word文档中的文案可以和别的文案同行展示，div等块级标签会导致换行
        this._transform2inline(node);

        // 保存样式表
        const styleSheet = this._setStyleSheet(node, _node);

        console.log(styleSheet);
        console.log(node);
        console.log(node?.innerHTML);

        // 在获取innerHTML之前移除不显示的元素
        this._removeNoneChild(node);
        // 转换两侧布局的html为表格类型
        this._transform2Table(node);

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
        saveAs(converted, fileName);
    }

    /**
   * _transform2inline div 等块式 代码标签转换成为 span 等 inline代码标签， 两个标签不换行
   * @param {any} el 元素
   * @returns {any} void
   */
    private _transform2inline(el:any) {
        const children = Array.from(el?.children);
        const parentEl = el.parentElement;
        const export2wordOption = this._getExport2wordOption(el);
        if (export2wordOption && export2wordOption.export2wordTransform2inline === 'true') {
            const span = document.createElement('span');
            span.innerHTML = el.innerHTML;
            this._setAttribute(span, el);
            parentEl.replaceChild(span, el);
            console.log(span.children);
            const spanChildren = Array.from(span.children);
            if (spanChildren.length) {
                // 遍历刚刚生成的span下的元素，看看有没有需要替换成为span标签的
                spanChildren.map((x: any) => {
                    this._transform2inline(x);
                });
            }
        } else {
            // 如果元素替换成为了span标签了就不遍历子元素了，交给span去遍历
            if (children.length) {
                children.map((x: any) => {
                    this._transform2inline(x);
                });
            }
        }
    }

    /**
   * _transform2Table 转换两侧布局的html为表格类型
   * @param {any} el 元素
   * @returns {any} void
   */
    private _transform2Table(el: any) {
        const parentEl = el.parentElement;
        const children = Array.from(el?.children);
        const export2wordOption = this._getExport2wordOption(el);
        if (export2wordOption && export2wordOption.export2wordTransform2table === 'true') {
            // 如果能识别到这个className， 那么把所有子元素按照表格布局排列， 实现左右布局排列
            const table = document.createElement('table');
            this._setAttribute(table, el);
            table.classList.add('export2-word-table');
            table.style.cssText += 'width: 100%';
            const tr = document.createElement('tr');
            children.map((x:any, index:number, list:any) => {
                const td = document.createElement('td');
                const textAlignObj = [
                    ['text-align:left;', 'text-align:right;'],
                    ['text-align:left;', 'text-align:right;', 'text-align:center;']
                ];
                if (list.length === 2) {
                    // 只有左右布局
                    td.style.cssText += textAlignObj[0][index];
                } else {
                    // 涵盖左中右等中间有多列的布局
                    if (index === 0 || index === list.length - 1) {
                        // 第一项或者最后一项 取值
                        const _index = +(index === list.length - 1);
                        td.style.cssText += textAlignObj[1][_index];
                    } else {
                        // 除第一项或者最后一项以外 的 取值
                        td.style.cssText += textAlignObj[1][2];
                    }
                    // 按照百分比设置宽度
                    td.style.cssText += `width:${(100 / list.length)}%`;
                }
                td.appendChild(x);
                tr.appendChild(td);
            })
            table.appendChild(tr);
            // el.appendChild(table);
            parentEl.replaceChild(table, el);

            const tableChildren = Array.from(table.children);
            if (tableChildren.length) {
                // 遍历刚刚生成的span下的元素，看看有没有需要替换成为span标签的
                tableChildren.map((x: any) => {
                    this._transform2Table(x);
                });
            }
        } else {
            // 如果元素替换成为了table标签了就不遍历子元素了，交给table去遍历
            if (children.length) {
                children.map((x: any) => {
                    this._transform2Table(x);
                });
            }
        }
    }

  /**
   * _removeNoneChild 移除掉display=none的元素，导出word文档， 导出word文档 display属性失效
   * @param {any} el 元素
   * @returns {any} void
   */
  private _removeNoneChild = (el: any) => {
      const children = Array.from(el?.children);
      if (children.length) {
          children.map((x: any, index: number) => {
              if (
                  x.style.display === 'none' ||
          x.style.visibility === 'hidden' ||
          x.style.opacity === 0
              ) {
                  el.removeChild(x);
              } else {
                  this._removeNoneChild(x);
              }
          });
      }
  };

  /**
   * _setStyleSheet 设置样式表 使用 _elItem 的元素样式 给 elItem 元素
   * @param {any} elItem 目标元素
   * @param {any} _elItem 原始元素
   * @returns {any} void
   */
  private _setStyleSheet(elItem: any, _elItem: any) {
      let styleSheet = '';
      // 递归设置所有子元素的样式表
      const setStyleSheet = (el: any, _el: any) => {
      // 获取所有子元素
          const children = Array.from(el?.children);
          // 获取所有样式
          const computedStyle = this._getComputedStyleByEl(_el);
          // style 样式的 字符串拼接
          let style: any = '{';
          let value: any = '';
          for (value of Object.values(computedStyle[1])) {
              // 设置横线显示为驼峰显示
              const key = value
                  .replace(/-[a-z]/g, (a: any) => a.toUpperCase())
                  .replace(/-/g, '');
              if (computedStyle[0][key]) {
                  if (key === 'width') {
                      // computedStyle[0][key] = "588px";
                      computedStyle[0][key] = '100%';
                  }
                  // 拼接每一个样式
                  style += `${value}: ${computedStyle[0][key]};`;
              }
          }
          style += '}';
          // 设置随机id，用于绑定样式
          const random = Math.random() * Math.pow(10, 20);
          const id = 'a' + random; // id 不能以数字开头
          styleSheet += `#${id}${style}`;
          el.id = id;
          if (children.length) {
              const children2 = Array.from(_el?.children);
              children.map((x: any, index: number) => {
                  return setStyleSheet(x, children2[index]);
              });
          }
      };
      setStyleSheet(elItem, _elItem);
      return styleSheet;
  }

  /**
   * _getComputedStyleByEl 区分横划线和驼峰的style的key值， 获取样式值
   * @param {any} el 元素
   * @returns {any} void
   */
  private _getComputedStyleByEl(el: any) {
      const style: any = getComputedStyle(el);
      // key为驼峰式的样式对象
      const obj1: any = {};
      // key为number， value为横线连接的属性值
      const obj2: any = {};
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
      return [obj1, obj2]; // 第一项是驼峰式，用于取值； 第二项是横线连接式包含了需要样式key值
  }

  /**
   * _getTagName 获取元素的id名称、className、标签
   * @param {any} el 元素
   * @param {any} tag 想要id还是className还是tagName
   * @returns {any} void
   */
  private _getTagName(el: any, tag: string = 'className') {
      const id = el.id.trim();
      const className = el.className.trim();
      const tagName = el.tagName.trim().toLowerCase();
      const obj: { [key: string]: string } = {
          id,
          className,
          tag: tagName,
          default: ''
      };
      return obj[tag];
  }

  /**
   * _setAttribute  copy 所有 attr 到 另一个元素
   * @param {any} node 目标元素
   * @param {any} _node 原始元素
   * @returns {any} void
   */
  private _setAttribute(node: any, _node: any) {
      const attributes = _node.attributes;
      console.log(attributes);
      let [key, value]: any = [];
      for ([key, value] of Object.entries(attributes)) {
          if (!isNaN(parseInt(key))) {
              const _key = value.nodeName;
              const _value = value.nodeValue;
              node.setAttribute(_key, _value);
          }
      }
  }

  /**
   * _getExport2wordOptions 获取导出word文档的attr属性列表
   * @param {any} el 元素
   * @returns {any} void
   */
  private _getExport2wordOption(el: any) {
      const export2wordOption = el.getAttribute('export2wordOption');
      const obj: any = {};
      if (export2wordOption) {
          const attr = export2wordOption.slice(1, export2wordOption.length - 1);
          (attr.split(',') || []).map((x: any) => {
              const t = x.split(':');
              obj[t[0]] = t[1];
          });
          return obj;
      }
      return false;
  }
}

export const export2WordInstance = new Export2Word();
