(function () {
    const cssText =
    '' +
    '@charset "utf-8";html{color:#000;background:#fff;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;-webkit-overflow-scrolling:touch}html *{outline:0;-webkit-text-size-adjust:none;-webkit-tap-highlight-color:transparent}body,html{font-family:"Microsoft YaHei",sans-serif,Tahoma,Arial}article,aside,blockquote,body,button,code,dd,details,div,dl,dt,fieldset,figcaption,figure,footer,form,h1,h2,h3,h4,h5,h6,header,hgroup,hr,input,legend,li,menu,nav,ol,p,pre,section,td,textarea,th,ul{margin:0;padding:0;-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box}article,aside,details,figcaption,figure,footer,header,hgroup,menu,nav,section{display:block}input,input[type=button],input[type=reset],input[type=submit]{resize:none;border:none;-webkit-appearance:none;border-radius:0}input,select,textarea{font-size:100%}table{border-collapse:collapse;border-spacing:0}fieldset,img{border:0}abbr,acronym{border:0;font-variant:normal}del{text-decoration:line-through}address,caption,cite,code,dfn,em,th,var{font-style:normal;font-weight:500}ol,ul{list-style:none}caption,th{text-align:left}h1,h2,h3,h4,h5,h6{font-size:100%;font-weight:500}q:after,q:before{content:\'\'}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sup{top:-.5em}sub{bottom:-.25em}a:hover{text-decoration:underline}a,ins{text-decoration:none}a:active,a:hover,a:link,a:visited{background:0 0;-webkit-tap-highlight-color:transparent;-webkit-tap-highlight-color:transparent;outline:0;text-decoration:none}';
    // cssText end

    const styleEl = document.createElement('style');
    document.getElementsByTagName('head')[0].appendChild(styleEl);
    if (styleEl.styleSheet) {
        if (!styleEl.styleSheet.disabled) {
            styleEl.styleSheet.cssText = cssText;
        }
    } else {
        try {
            styleEl.innerHTML = cssText;
        } catch (e) {
            styleEl.innerText = cssText;
        }
    }
})();

(function (win, lib) {
    const doc = win.document;
    const docEl = doc.documentElement;
    let metaEl = doc.querySelector('meta[name="viewport"]');
    const flexibleEl = doc.querySelector('meta[name="flexible"]');
    let dpr = 0;
    let scale = 0;
    let tid;
    const flexible = lib.flexible || (lib.flexible = {});

    if (metaEl) {
        console.warn('将根据已有的meta标签来设置缩放比例');
        const match = metaEl
            .getAttribute('content')
            .match(/initial-scale=([\d.]+)/);
        if (match) {
            scale = parseFloat(match[1]);
            dpr = parseInt(1 / scale);
        }
    } else if (flexibleEl) {
        const content = flexibleEl.getAttribute('content');
        if (content) {
            const initialDpr = content.match(/initial-dpr=([\d.]+)/);
            const maximumDpr = content.match(/maximum-dpr=([\d.]+)/);
            if (initialDpr) {
                dpr = parseFloat(initialDpr[1]);
                scale = parseFloat((1 / dpr).toFixed(2));
            }
            if (maximumDpr) {
                dpr = parseFloat(maximumDpr[1]);
                scale = parseFloat((1 / dpr).toFixed(2));
            }
        }
    }

    if (!dpr && !scale) {
        const isAndroid = win.navigator.appVersion.match(/android/gi);
        const isIPhone = win.navigator.appVersion.match(/iphone/gi);
        const devicePixelRatio = win.devicePixelRatio;
        if (isIPhone) {
            // iOS下，对于2和3的屏，用2倍的方案，其余的用1倍方案
            if (devicePixelRatio >= 3 && (!dpr || dpr >= 3)) {
                dpr = 3;
            } else if (devicePixelRatio >= 2 && (!dpr || dpr >= 2)) {
                dpr = 2;
            } else {
                dpr = 1;
            }
        } else {
            // 其他设备下，仍旧使用1倍的方案
            dpr = 1;
        }
        scale = 1 / dpr;
    }

    docEl.setAttribute('data-dpr', dpr);
    if (!metaEl) {
        metaEl = doc.createElement('meta');
        metaEl.setAttribute('name', 'viewport');
        metaEl.setAttribute(
            'content',
            'initial-scale=' +
        scale +
        ', maximum-scale=' +
        scale +
        ', minimum-scale=' +
        scale +
        ', user-scalable=no'
        );
        if (docEl.firstElementChild) {
            docEl.firstElementChild.appendChild(metaEl);
        } else {
            const wrap = doc.createElement('div');
            wrap.appendChild(metaEl);
            doc.write(wrap.innerHTML);
        }
    }

    function refreshRem() {
        let width = docEl.getBoundingClientRect().width;
        // if (width / dpr > 540) {
        //   width = width * dpr;
        // }
        // const rem = width / 10;

        if (width / dpr < 400) {
            width = 400 * dpr;
        } else if (width / dpr > 2560) {
            width = 2560 * dpr;
        }
        const rem = width / 24;

        docEl.style.fontSize = rem + 'px';
        flexible.rem = win.rem = rem;
    }

    win.addEventListener(
        'resize',
        function () {
            clearTimeout(tid);
            tid = setTimeout(refreshRem, 300);
        },
        false
    );
    win.addEventListener(
        'pageshow',
        function (e) {
            if (e.persisted) {
                clearTimeout(tid);
                tid = setTimeout(refreshRem, 300);
            }
        },
        false
    );

    if (doc.readyState === 'complete') {
        doc.body.style.fontSize = 12 * dpr + 'px';
    } else {
        doc.addEventListener(
            'DOMContentLoaded',
            function (e) {
                doc.body.style.fontSize = 12 * dpr + 'px';
            },
            false
        );
    }

    refreshRem();

    flexible.dpr = win.dpr = dpr;
    flexible.refreshRem = refreshRem;
    flexible.rem2px = function (d) {
        let val = parseFloat(d) * this.rem;
        if (typeof d === 'string' && d.match(/rem$/)) {
            val += 'px';
        }
        return val;
    };
    flexible.px2rem = function (d) {
        let val = parseFloat(d) / this.rem;
        if (typeof d === 'string' && d.match(/px$/)) {
            val += 'rem';
        }
        return val;
    };
})(window, window.lib || (window.lib = {}));
