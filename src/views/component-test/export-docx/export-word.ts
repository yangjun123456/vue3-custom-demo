import htmlDocx from 'html-docx-js/dist/html-docx';
import saveAs from 'file-saver';

/**
 * word导出说明
 * 1. 调用 export2Word 方法，传入相应参数
 * 2. 在html中设置 export2wordOption="{export2wordTransform2table:true,export2wordTransform2inline:true}" 属性， 属性值根据需要进行增改
 * 3. export2wordTransform2inline 在需要转为inline内元素的标签上加export2wordTransform2inline类名， 因为好多样式导出word后不支持，需要转换为span标签才能使多个标签的文本显示在同一行中
 * 4. export2wordTransform2table 一行中的 两列或者多列布局需要转换成为table， 添加export2wordTransform2table类名， 可以转换成为table布局， 实现类似flex 和 float 的效果
 * 4. export2wordTransform2Style 在转换成为word时需要添加什么样式
 * 5. word文档中不需要考虑同行文字水平居中对齐的问题
 * 6. 当前未处理图片，如果引入的是在线的图片可以显示，如果引入的不是在线的图片不能正常显示
 * 7. 添加页眉页脚处理需要添加word-footer-content、word-header-content 类名， 根据需要添加是否转换为表格和转为word后的样式
 * 8. 本次导出添加了页眉页脚， 如果有其他更好的页眉页脚设置可修改整个html模板进行替换
 */
/**
 * 设计思路
 * 1. 生成样式表和html可正常导出word： 先拷贝一份html， 通过获取原始 html 的样式生成一份 styleSheet 样式表， 样式表通过 生成的随机id 进行元素和样式表匹配， 设置相对应的 随机id 并将id赋值到相对应的clone 的html的元素上
 * 2. 通过步骤1可正常显示样式
 * 3. 移除不显示的元素： 如果遇到display：none 的元素 从clone 的html中移除掉
 * 4. table实现两侧布局： 如果是flex布局或者float布局的 两侧布局 转换成为table 表格进行分列展示， 可实现word中的两侧布局或者三列布局或者多列布局
 * 5. 多个块级标签显示在同一行： 如果标签使用的div 导出word后想要多个div 在同一行通过样式无法实现， 遍历clone 的html 将块级标签替换成为span标签其余不变
 * 6. 导出word的样式改变： 好多样式word无法正常显示， 但可以设计基本样式， 在导出word时读取标签设置的 export2wordTransform2Style 属性 可修改导出的word的相对应的文案样式
 * 7.
 */

class Export2Word {
  /**
   * export2Word 导出word文档 方法
   * @param dom 需要转换成为html导出word的元素
   * @param fileName 导出的word名称
   */
  public export2Word(dom: any, fileName: string = 'test.docx') {
    const node: any = dom?.cloneNode(true); // clone 一份node
    const _node: any = dom; // 获取原始dom样式的node

    // 找到需要转换成为span标签的类名，转换成为span标签， 以用于导出的word文档中的文案可以和别的文案同行展示，div等块级标签会导致换行
    this._transform2inline(node);

    // 设置行内样式，在导出word时添加需要修改的样式
    this._transform2Style(node);

    // 保存样式表
    const styleSheet = this._setStyleSheet(node, _node);

    // console.log(styleSheet);
    // console.log(node);
    // console.log(node?.innerHTML);

    // 在获取innerHTML之前移除不显示的元素
    this._removeNoneChild(node);
    // 转换两侧布局的html为表格类型
    this._transform2Table(node);

    // el = `<div id="abcdefg">
    //     <span style="display:block;width: 1000px;">asdfasfd</span>
    //     <span style="display:block;float:right;">456782934</span>
    // </div>`
    // console.log(111, el);

    // const page = `<!DOCTYPE html><html><head><meta charset="UTF-8">
    // <style>${styleSheet}</style>
    // </head><body>${el}</body></html>`;
    const footer = this._getFooter(node);
    const header = this._getHeader(node);
    this._hideWordContentFooterHeader(node);
    const el = node?.innerHTML;
    // 设置页眉页脚
    const page = `<!DOCTYPE html xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office"
        xmlns:w="urn:schemas-microsoft-com:office:word"
        xmlns:m="http://schemas.microsoft.com/office/2004/12/omml"
        xmlns="http://www.w3.org/TR/REC-html40">
        <head>
            <meta charset="UTF-8">
            <style>
            @page {
                mso-footer: f1;
                mso-header: h1;
            }
            
            @page Section1 {}
            
            div.Section1 {
                page: Section1;
            }
            
            p.MsoHeader,
            p.MsoFooter {
                border: 0px;
                text-align: center
            }
            
            table#tableHdFt {
                margin: 0in 0in 0in 900in;
                width: 1px;
                height: 1px;
            }
            </style>
            <style>${styleSheet}</style>
            <xml>
                <w:WordDocument>
                    <w:View>Print</w:View>
                    <w:Zoom>100</w:Zoom>
                    <w:DoNotOptimizeForBrowser />
                </w:WordDocument>
            </xml>
        </head>
        
        <body>
        <div class="Section1">
                ${el}
                <table id="tableHdFt" border="0" cellspacing="0" cellpadding="0">
                    <tr style="">
                        <td style="height:1pt;width:1px;overflow:hidden;mso-height-rule:exactly;mso-width-rule:exactly;">
                            <div style="mso-element:footer; text-align:center;position:relative;z-index:-1" id="f1">
                                <!--[if supportFields]>
                                    <span class="MsoPageNumber" style="display:none;">
                                        <span style="mso-element:field-begin"></span>PAGE<span style="mso-element:field-end"></span>/<span style="mso-element:field-begin"></span>NUMPAGES</span><span style="mso-element:field-end"></span>
                                    </span>
                                    ${footer}
                                <![endif]-->
                            </div>
        
                            <div style="mso-element:header; text-align:center;position:relative;z-index:-1" id="h1">
                              <span style= text-align:center; font-size:24px; font-weight:bold; display:none;font-family:宋体">
                                  123123年-123123月份微信汇款<br>合计：'123123元</span>
                                ${header}
                            </div>
                        </td>
                    </tr>
                </table>
            </div>
        </body>
        
        
        </html>`;

    console.log(page);
    // var converted = htmlDocx.asBlob(page,{orientation: 'landscape', margins: {top: 720}});
    const converted = htmlDocx.asBlob(page, { margins: { top: 1000 } });
    // 用 FielSaver.js里的保存方法 进行输出
    saveAs(converted, fileName);
  }

  /**
   * _transform2Style 转换成为word时需要添加什么样式
   * @param el 元素
   */
  private _transform2Style(el: any) {
    const children = Array.from(el?.children);
    const export2wordOption = this._getExport2wordOption(el);
    if (export2wordOption && export2wordOption.export2wordTransform2Style) {
      for (const i in export2wordOption.export2wordTransform2Style) {
        el.style.cssText += `${i}:${export2wordOption.export2wordTransform2Style[i]};`;
      }
    }

    if (children.length) {
      children.map((x: any) => {
        this._transform2Style(x);
      });
    }
  }

  /**
   * _transform2inline div 等块式 代码标签转换成为 span 等 inline代码标签， 两个标签不换行
   * @param el 元素
   */
  private _transform2inline(el: any) {
    const children = Array.from(el?.children);
    const parentEl = el.parentElement;
    const export2wordOption = this._getExport2wordOption(el);
    if (export2wordOption && export2wordOption.export2wordTransform2inline) {
      const span = document.createElement('span');
      span.innerHTML = el.innerHTML;
      this._setAttribute(span, el);
      parentEl.replaceChild(span, el);
      // console.log(span.children);
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
   * @param el 元素
   */
  private _transform2Table(el: any) {
    const parentEl = el.parentElement;
    const children = Array.from(el?.children);
    const export2wordOption = this._getExport2wordOption(el);
    if (export2wordOption && export2wordOption.export2wordTransform2table) {
      // 如果能识别到这个className， 那么把所有子元素按照表格布局排列， 实现左右布局排列
      const table = document.createElement('table');
      this._setAttribute(table, el);
      table.classList.add('export2-word-table');
      table.style.cssText += 'width: 100%';
      const tr = document.createElement('tr');
      children.map((x: any, index: number, list: any) => {
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
          td.style.cssText += `width:${100 / list.length}%`;
        }
        td.appendChild(x);
        tr.appendChild(td);
      });
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
   * @param el 元素
   */
  private _removeNoneChild = (el: any) => {
    const children = Array.from(el?.children);
    if (children.length) {
      children.map((x: any, index: number) => {
        const style = getComputedStyle(x);
        if (
          style.display === 'none' ||
          style.visibility === 'hidden' ||
          style.opacity === '0' ||
          x.style.display === 'none' ||
          x.style.visibility === 'hidden' ||
          x.style.opacity === 0 ||
          x.style.opacity === '0'
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
   * @param elItem 目标元素
   * @param _elItem 原始元素
   * @returns
   */
  private _setStyleSheet(elItem: any, _elItem: any) {
    let styleSheet = '';
    // 递归设置所有子元素的样式表
    const setStyleSheet = (el: any, _el: any) => {
      // 获取所有子元素
      const children = Array.from(el?.children);
      // 获取所有样式
      const computedStyle = this._getComputedStyleByEl(_el);
      let value: any = '';
      for (value of Object.values(computedStyle[1])) {
        // 初次遍历修改样式 调用 _parseStyle 方法
        const key = this._line2TuoFeng(value);
        // 修改样式， 例如不支持rgba， 透明度在word无效， 改为rgb
        this._parseStyle(key, computedStyle);
      }
      // style 样式的 字符串拼接
      let style: any = '{';
      let val: any = '';
      for (val of Object.values(computedStyle[1])) {
        // 样式表只添加常用的样式其余的过滤掉了，如果遇到不常用的，可在styleList中添加取消过滤
        // eslint-disable-next-line no-loop-func
        if (styleList.some((x: any) => x === val)) {
          // 设置横线显示为驼峰显示
          const key = this._line2TuoFeng(val);
          if (computedStyle[0][key] !== '') {
            // 拼接每一个样式
            style += `${val}: ${computedStyle[0][key]};`;
          }
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
   * @param el 元素
   * @returns
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
   * @param el 元素
   * @param tag 想要id还是className还是tagName
   * @returns
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
   * @param node 目标元素
   * @param _node 原始元素
   */
  private _setAttribute(node: any, _node: any) {
    const attributes = _node.attributes;
    // console.log(attributes);
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
   * @param el 元素
   * @returns
   */
  private _getExport2wordOption(el: any) {
    const export2wordOption = el.getAttribute('export2wordOption');
    if (export2wordOption) {
      return JSON.parse(export2wordOption);
    }
    return false;
  }

  private _typeof(item: any) {
    return Object.prototype.toString.call(item).slice(8, -1);
  }

  /**
   * 横划线转为驼峰
   * @param str 要转换的值
   * @returns string
   */
  private _line2TuoFeng(str: string) {
    return str
      .replace(/-[a-z]/g, (a: any) => a.toUpperCase())
      .replace(/-/g, '');
  }

  /**
   * 驼峰转为横划线
   * @param str 要转换的值
   * @returns string
   */
  private _tuoFeng2Line(str: any) {
    return str.replace(/[A-Z]/g, (a: any) => '-' + a.toLowerCase());
  }

  /**
   * 解析样式
   * @param key
   * @param style
   */
  private _parseStyle(key: string, style: any, ...params: any[]) {
    // console.log(params);
    if (key === 'width') {
      // 统一设置所有宽度为最大
      // computedStyle[0][key] = "588px";
      style[0][key] = '100%';
    }
    if (key === 'backgroundColor' || key === 'color') {
      // 转换rgba为rgb
      // 设置颜色， 如果是rgba形式， 转换为rgb形式并且忽略透明度， 如果透明度是0， 那么设置为transparent
      // transparent 只针对background有效， 对color设置无效， 针对color需要设置为transparent后再针对color特殊处理
      // console.log(key,'++++',style[0][key]);
      const bgcolor: string = style[0][key].replace(/\s/g, '');
      let _bgcolor: string = bgcolor;
      let opacity: string = '10086';
      if (bgcolor.indexOf('rgba') >= 0) {
        // 匹配rgba, 改为rgb格式， 保存opacity透明度值
        _bgcolor = bgcolor.replace(
          /(rgb)a?\(([0-9]*),([0-9]*),([0-9]*),([0-9.]*)\)/g,
          (
            $1: any,
            $2: any,
            $3: any,
            $4: any,
            $5: any,
            $6: any,
            $7: any,
            $8: any,
            $9: any
          ) => {
            // console.log($1,$2,$3,$4,$5,$6,$7,$8,$9);
            if ($6) {
              // 设置透明度值
              opacity = $6;
            }
            return `${$2}(${$3},${$4},${$5})`;
          }
        );
      }
      if (opacity === '0') {
        // 如果透明度是0， 那么不显示背景色
        _bgcolor = 'transparent';
      }
      style[0][key] = _bgcolor;

      // 针对color再次进行处理
      if (key === 'color') {
        // 如果经过修改rgba的条件区域设置为了transparent或者本身设置的就是transparent
        const color = style[0][key].replace(/\s/g, '');
        if (color === 'transparent') {
          // 隐藏掉透明文字的元素
          style[0].display = 'none';
        }
        // console.log('-------',color);
      }
    }
  }

  /**
   * 获取页脚
   */
  private _getFooter(node: any) {
    const footer = node.querySelector('.word-footer-content').innerHTML;
    return footer;
  }

  /**
   * 获取页眉
   */
  private _getHeader(node: any) {
    const header = node.querySelector('.word-header-content').innerHTML;
    return header;
  }

  /**
   * 隐藏word中的页眉和页脚
   * @param node clone 后的dom元素
   * @returns
   */
  private _hideWordContentFooterHeader(node: any) {
    // 设置页眉
    console.log(node.querySelector('.word-header-content'));
    if (node.querySelector('.word-header-content')) {
      node.querySelector('.word-header-content').innerHTML = '';
      node.querySelector('.word-header-content').style.display = 'none';
      node.querySelector('.word-header-content').style.opacity = 0;
      // node.querySelector('.word-header-content').style.visibility='hidden';
      // node.querySelector('.word-header-content').style.width='0px';
      // node.querySelector('.word-header-content').style.height='0px';
    }
    // 设置页脚
    if (node.querySelector('.word-footer-content')) {
      console.log(node.querySelector('.word-footer-content'));
      node.querySelector('.word-footer-content').innerHTML = '';
      node.querySelector('.word-footer-content').style.display = 'none';
      node.querySelector('.word-footer-content').style.opacity = 0;
      // node.querySelector('.word-footer-content').style.visibility='hidden';
      // node.querySelector('.word-footer-content').style.width='0px';
      // node.querySelector('.word-footer-content').style.height='0px';
    }
  }
}

export const export2WordInstance = new Export2Word();

// 允许写入 styleSheet 的样式， 如果styleList样式中有的style字段才能添加到styleSheet表中
const styleList = [
  // "accent-color",
  // "align-content",
  // "align-items",
  // "align-self",
  // "alignment-baseline",
  // "animation-delay",
  // "animation-direction",
  // "animation-duration",
  // "animation-fill-mode",
  // "animation-iteration-count",
  // "animation-name",
  // "animation-play-state",
  // "animation-timing-function",
  // "app-region",
  // "appearance",
  // "backdrop-filter",
  // "backface-visibility",
  // "background-attachment",
  // "background-blend-mode",
  'background-clip',
  'background-color',
  'background-image',
  'background-origin',
  'background-position',
  'background-repeat',
  'background-size',
  // "baseline-shift",
  // "block-size",
  // "border-block-end-color",
  // "border-block-end-style",
  // "border-block-end-width",
  // "border-block-start-color",
  // "border-block-start-style",
  // "border-block-start-width",
  'border-bottom-color',
  'border-bottom-left-radius',
  'border-bottom-right-radius',
  'border-bottom-style',
  'border-bottom-width',
  'border-collapse',
  'border-end-end-radius',
  'border-end-start-radius',
  // "border-image-outset",
  // "border-image-repeat",
  // "border-image-slice",
  // "border-image-source",
  // "border-image-width",
  // "border-inline-end-color",
  // "border-inline-end-style",
  // "border-inline-end-width",
  // "border-inline-start-color",
  // "border-inline-start-style",
  // "border-inline-start-width",
  'border-left-color',
  'border-left-style',
  'border-left-width',
  'border-right-color',
  'border-right-style',
  'border-right-width',
  // "border-start-end-radius",
  // "border-start-start-radius",
  'border-top-color',
  'border-top-left-radius',
  'border-top-right-radius',
  'border-top-style',
  'border-top-width',
  // "bottom",
  'box-shadow',
  'box-sizing',
  'break-after',
  'break-before',
  // "break-inside",
  // "buffered-rendering",
  // "caption-side",
  // "caret-color",
  'clear',
  'clip',
  'clip-path',
  'clip-rule',
  'color',
  // "color-interpolation",
  // "color-interpolation-filters",
  // "color-rendering",
  // "column-count",
  // "column-gap",
  // "column-rule-color",
  // "column-rule-style",
  // "column-rule-width",
  'column-span',
  'column-width',
  // "contain-intrinsic-block-size",
  // "contain-intrinsic-height",
  // "contain-intrinsic-inline-size",
  // "contain-intrinsic-size",
  // "contain-intrinsic-width",
  'content',
  'cursor',
  // "cx",
  // "cy",
  // "d",
  'direction',
  'display',
  // "dominant-baseline",
  // "empty-cells",
  'fill',
  'fill-opacity',
  'fill-rule',
  'filter',
  // "flex-basis",
  // "flex-direction",
  // "flex-grow",
  // "flex-shrink",
  // "flex-wrap",
  'float',
  // "flood-color",
  // "flood-opacity",
  'font-family',
  // "font-kerning",
  // "font-optical-sizing",
  'font-size',
  'font-stretch',
  'font-style',
  'font-variant',
  'font-variant-caps',
  'font-variant-east-asian',
  'font-variant-ligatures',
  'font-variant-numeric',
  'font-weight',
  // "grid-auto-columns",
  // "grid-auto-flow",
  // "grid-auto-rows",
  // "grid-column-end",
  // "grid-column-start",
  // "grid-row-end",
  // "grid-row-start",
  // "grid-template-areas",
  // "grid-template-columns",
  // "grid-template-rows",
  'height',
  // "hyphens",
  // "image-orientation",
  // "image-rendering",
  // "inline-size",
  // "inset-block-end",
  // "inset-block-start",
  // "inset-inline-end",
  // "inset-inline-start",
  // "isolation",
  // "justify-content",
  // "justify-items",
  // "justify-self",
  // "left",
  'letter-spacing',
  'lighting-color',
  'line-break',
  'line-height',
  'list-style-image',
  'list-style-position',
  'list-style-type',
  // "margin-block-end",
  // "margin-block-start",
  'margin-bottom',
  // "margin-inline-end",
  // "margin-inline-start",
  'margin-left',
  'margin-right',
  'margin-top',
  // "marker-end",
  // "marker-mid",
  // "marker-start",
  // "mask-type",
  // "max-block-size",
  'max-height',
  // "max-inline-size",
  'max-width',
  // "min-block-size",
  'min-height',
  // "min-inline-size",
  'min-width',
  // "mix-blend-mode",
  // "object-fit",
  // "object-position",
  // "offset-distance",
  // "offset-path",
  // "offset-rotate",
  'opacity',
  'order',
  // "orphans",
  'outline-color',
  'outline-offset',
  'outline-style',
  'outline-width',
  // "overflow-anchor",
  // "overflow-clip-margin",
  // "overflow-wrap",
  'overflow-x',
  'overflow-y',
  // "overscroll-behavior-block",
  // "overscroll-behavior-inline",
  // "padding-block-end",
  // "padding-block-start",
  'padding-bottom',
  // "padding-inline-end",
  // "padding-inline-start",
  'padding-left',
  'padding-right',
  'padding-top',
  // "paint-order",
  'perspective',
  'perspective-origin',
  // "pointer-events",
  // "position",
  // "r",
  'resize',
  // "right",
  // "row-gap",
  // "ruby-position",
  // "rx",
  // "ry",
  // "scroll-behavior",
  // "scroll-margin-block-end",
  // "scroll-margin-block-start",
  // "scroll-margin-inline-end",
  // "scroll-margin-inline-start",
  // "scroll-padding-block-end",
  // "scroll-padding-block-start",
  // "scroll-padding-inline-end",
  // "scroll-padding-inline-start",
  // "scrollbar-gutter",
  // "shape-image-threshold",
  // "shape-margin",
  // "shape-outside",
  // "shape-rendering",
  'speak',
  // "stop-color",
  // "stop-opacity",
  // "stroke",
  // "stroke-dasharray",
  // "stroke-dashoffset",
  // "stroke-linecap",
  // "stroke-linejoin",
  // "stroke-miterlimit",
  // "stroke-opacity",
  // "stroke-width",
  // "tab-size",
  'table-layout',
  'text-align',
  'text-align-last',
  // "text-anchor",
  // "text-decoration",
  // "text-decoration-color",
  // "text-decoration-line",
  // "text-decoration-skip-ink",
  // "text-decoration-style",
  'text-indent',
  'text-overflow',
  'text-rendering',
  'text-shadow',
  // "text-size-adjust",
  'text-transform',
  'text-underline-position',
  // "top",
  // "touch-action",
  'transform',
  'transform-origin',
  'transform-style',
  // "transition-delay",
  // "transition-duration",
  // "transition-property",
  // "transition-timing-function",
  // "unicode-bidi",
  'user-select',
  // "vector-effect",
  // "vertical-align",
  'visibility',
  'white-space',
  'widows',
  'width',
  // "will-change",
  'word-break',
  'word-spacing',
  'writing-mode',
  // "x",
  // "y",
  'z-index',
  'zoom'
];
