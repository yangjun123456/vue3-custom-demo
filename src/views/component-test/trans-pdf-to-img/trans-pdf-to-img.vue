<template>
	<section class="trans-pdf-to-img">
		<section class="img">
			<h1>pdf 转换的 png 格式</h1>
			<img :src="pdfBase64"
				alt="">
			<hr>
			<hr>
		</section>
		<section class="canvas">
			<h1>pdf 转换的 canvas 格式</h1>
			<div id="canvasWraper"></div>
			<hr>
			<hr>
		</section>
		<section class="upload-com">
			<h1>上传文件</h1>
			<el-upload class="upload-demo"
				action="https://jsonplaceholder.typicode.com/posts/"
				:on-preview="handlePreview"
				:on-remove="handleRemove"
				:before-remove="beforeRemove"
				:http-request="httpRequest"
				multiple
				:limit="3"
				:on-exceed="handleExceed"
				:file-list="fileList">
				<el-button type="primary">Click to upload</el-button>
				<template #tip>
					<div class="el-upload__tip">
						jpg/png files with a size less than 500KB.
					</div>
				</template>
			</el-upload>
		</section>

	</section>
</template>
<script lang="ts" setup>
import { nextTick, ref } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import { saveAs } from 'file-saver';
declare const pdfjsLib: any;
declare const JSZip: any;

const fileList = ref<any[]>([
    // {
    // 	name: 'food.jpeg',
    // 	url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
    // },
]);

const handleRemove: any['onRemove'] = (file: any, uploadFiles: any) => {
    console.log(file, uploadFiles);
};

const handlePreview: any['onPreview'] = (uploadFile: any) => {
    console.log(uploadFile);
};

const handleExceed: any['onExceed'] = (files: any, uploadFiles: any) => {
    ElMessage.warning(`The limit is 3, you selected ${files.length} files this time, add up to ${files.length + uploadFiles.length} totally`);
};

const beforeRemove: any['beforeRemove'] = (uploadFile: any, uploadFiles: any) => {
    return ElMessageBox.confirm(`Cancel the transfert of ${uploadFile.name} ?`).then(
        () => true,
        () => false
    );
};

/* pdf 识别   pdf转图片--------------------------------------------------------------------------------start */
const pdfBase64 = ref('');
const pdfToImg = (e: any): any => {
    return new Promise((resolve, reject) => {
        const scale = 2;
        // console.log(pdfjsLib.getDocument(e.target.result),e.target,'asdf');
        // 识别pdf添加到canvas
        pdfjsLib.getDocument(e.target.result).promise.then(async (pdf: any) => {
            for (let i = 1; i <= pdf.numPages; i++) {
                const page = await pdf.getPage(i);
                const viewport = page.getViewport({ scale });
                const canvasWraper: any = document.querySelector('#canvasWraper');
                const canvas: any = document.createElement('canvas');
                canvas.id = 'canvas_' + i;
                const context: any = canvas.getContext('2d');
                canvasWraper.appendChild(canvas);
                canvas.width = viewport.width;
                canvas.height = viewport.height;
                const renderContext = {
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

const httpRequest = async (files: any, val: any) => {
    // 读取文件信息
    var reader = new FileReader();
    reader.readAsDataURL(files.file);
    reader.onload = async function (e: any) {
        try {
            const res: any = await pdfToImg(e);
            // 读取图片base64
            const base64Path: string = res;
            const base64 = base64Path.split(',')[1];
            const type = base64Path.split(',')[0];
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
    var zip = new JSZip(); // 创建一个JSZip实例
    var images = zip.folder('images'); // 创建一个文件夹用来存放图片

    // 遍历canvas，将其生成图片放进文件夹images中
    const canvasWraper = document.querySelector('#canvasWraper');
    const canvasList: any = canvasWraper?.querySelectorAll('canvas');
    Array.from(canvasList).map((x: any, index: number) => {
        // 将图片放进文件夹images中
        // 参数1为图片名称，参数2为图片数据（格式为base64，需去除base64前缀 data:image/png;base64）
        images.file('photo-' + (index + 1) + '.png', splitBase64(x.toDataURL('image/png', 1.0)), {
            base64: true
        });
    });

    // 打包下载
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
</script>

<style lang="scss" scoped>
.trans-pdf-to-img {
	text-align: left;
	display: flex;
	align-items: flex-start;
	flex-direction: column;
}
h1 {
	font-size: 40px;
}
.upload-demo {
	width: 500px;
}
.upload-com {
	// height: 30vh;
	flex: 1;
}
.img {
	height: 30vh;
	overflow: auto;
}
.canvas {
	height: 30vh;
	overflow: auto;
}
</style>
