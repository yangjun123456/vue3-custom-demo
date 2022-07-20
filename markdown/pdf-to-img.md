#### pdf 文件转为png格式文件 并且打包下载为zip文件

实现过程原理
1. 上传pdf文件
2. 通过 `var reader = new FileReader(); reader.readAsDataURL(files.file);` 读取pdf文件的base64代码
3. 使用pdf.js 插件解析pdf文件 并添加到canvas中
4. 创建一个新的canvas 合并先前的多个canvas 为一个canvas 然后获取最终canvas的base64代码
5. 通过jszip 打包canvas的图片， 打包最终的一个canvas 或者 解析pdf后的多个canvas都可以

实现过程代码
1. 下载 pdf.js、 pdf.worker.js、 jszip.js 文件， 在index.html 中引用
2. 详细见 trans-pdf-to-img.vue 文件
```

import { saveAs } from 'file-saver';
declare const pdfjsLib: any;
declare const JSZip: any;

/* pdf 识别   pdf转图片--------------------------------------------------------------------------------start */
const pdfBase64 = ref(''); // 保存 pdf 转为 canvas 后 合并多个canvas为一张图片的 图片base64代码
const pdfToImg = (e: any): any => {
	return new Promise((resolve, reject) => {
		let scale = 2; // 倍数， 越大pdf转为canvas 越清楚
		// console.log(pdfjsLib.getDocument(e.target.result),e.target,'asdf');
		// 识别pdf添加到canvas
		pdfjsLib.getDocument(e.target.result).promise.then(async (pdf: any) => {
			for (let i = 1; i <= pdf.numPages; i++) {
				let page = await pdf.getPage(i);
				let viewport = page.getViewport({ scale });
				const canvasWraper: any = document.querySelector('#canvasWraper');
				const canvas: any = document.createElement('canvas');
				canvas.id = 'canvas_' + i;
				let context: any = canvas.getContext('2d');
				canvasWraper.appendChild(canvas);
				canvas.width = viewport.width;
				canvas.height = viewport.height;
				let renderContext = {
					canvasContext: context,
					viewport: viewport
				};
				page.render(renderContext);
			}
		});

		setTimeout(async () => {
			// 将识别到的pdf文件转化的canvas 合并成为一张canvas
			const canvasWraper: any = document.querySelector('#canvasWraper');
			const canvasList = document.querySelectorAll('#canvasWraper canvas');
			const size: any[] = [canvasWraper.offsetWidth, canvasWraper.offsetHeight];
			const newCanvas = document.createElement('canvas');
			newCanvas.width = size[0];
			newCanvas.height = size[1];
			const context: any = newCanvas.getContext('2d');
			let top = 0;
			canvasList.forEach((item: any, index: number) => {
				context.drawImage(item, 0, top, item.offsetWidth, item.offsetHeight);
				top += item.offsetHeight;
			});
			// const exportPdfImg = { url: newCanvas.toDataURL('image/png'), imageWidthHeightRatio: size[1] / size[0] };
			pdfBase64.value = newCanvas.toDataURL('image/png');
			// canvasWraper.appendChild(newCanvas);
			resolve(pdfBase64.value);
		}, 0);
	});
};
/* pdf 识别   pdf转图片--------------------------------------------------------------------------------start */

let httpRequest = async (files: any, val: any) => {
	// 读取文件信息
	var reader = new FileReader();
	reader.readAsDataURL(files.file);
	reader.onload = async function (e: any) {
		try {
			const res: any = await pdfToImg(e);
			// 读取图片base64
			let base64Path: string = res;
			let base64 = base64Path.split(',')[1];
			let type = base64Path.split(',')[0];
			// let vText = await voiceText(base64, type);

			fileList.value.push({
				name: files.file.name,
				url: files.file.type
			});
			console.log(res);
            await nextTick();
            jszipDownload();
		} catch (error) {
			console.log(error);
		}
	};
};

// 下载canvas 为图片压缩包 zip文件
const jszipDownload = () => {
	var zip = new JSZip(); //创建一个JSZip实例
	var images = zip.folder('images'); //创建一个文件夹用来存放图片

	//遍历canvas，将其生成图片放进文件夹images中
	const canvasWraper = document.querySelector('#canvasWraper');
	const canvasList: any = canvasWraper?.querySelectorAll('canvas');
	Array.from(canvasList).map((x: any, index: number) => {
		//将图片放进文件夹images中
		//参数1为图片名称，参数2为图片数据（格式为base64，需去除base64前缀 data:image/png;base64）
		images.file('photo-' + (index + 1) + '.png', splitBase64(x.toDataURL('image/png', 1.0)), {
			base64: true
		});
	});

	//打包下载
	zip.generateAsync({
		type: 'blob'
	}).then(function (content:any) {
		saveAs(content, 'picture.zip'); // saveAs依赖的js文件是FileSaver.js
	});
};

// 截取base64前缀
const splitBase64 = (dataurl: string) => {
	var arr = dataurl.split(',');
	return arr[1];
};
```