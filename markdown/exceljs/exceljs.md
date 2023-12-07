#### 前端使用exceljs导出excel文件
1. npm install exceljs file-saver
```
<template>
    <div class="exceljs-export">
        <el-button @click="download">下载</el-button>
    </div>
</template>
<script>
import { LoadingMixin } from '@/mixins/loading';
const ExcelJS = require('@/libs/exceljs');
const saveAs = require('@/libs/file-saver');
export default {
	name: 'app',
	mixins: [LoadingMixin],
	components: {},
	computed: {},
	data() {
		return {
		};
	},
	methods: {
		async download() {
			let workbook = null;
			let worksheet = null;

			// 图片转base64
			function convertImgToBase64(url) {
				return new Promise((resove, reject) => {
					const canvas = document.createElement('canvas');
					const ctx = canvas.getContext('2d');
					const img = new Image();
					img.crossOrigin = 'Anonymous';
					img.onload = function () {
						canvas.height = img.height;
						canvas.width = img.width;
						ctx.drawImage(img, 0, 0, img.width, img.height);
						var dataURL = canvas.toDataURL('image/png');
						resove({ width: img.width, height: img.height, dataURL });
					};
					img.src = url;
				});
			}

			// 导出
			workbook = new ExcelJS.Workbook();
			workbook.created = new Date();
			workbook.modified = new Date();
			worksheet = workbook.addWorksheet('sheet-demo');

			worksheet.columns = [
				{ header: '报警详情', key: 'id', width: 10 },
				{ header: '报警详情', key: 'id1', width: 30 },
				{ header: '报警详情', key: 'id2', width: 15 },
				{ header: '报警详情', key: 'id3', width: 30 },
				{ header: '报警详情', key: 'id4', width: 15 },
				{ header: '报警详情', key: 'id5', width: 30 },
				{ header: '报警图像', key: 'DOB', width: 70, outlineLevel: 1 }
			];
			{
				// 以数组的方式写入第二行整行数据
				// const row = worksheet.getRow(2);
				// row.values = [ 2356545456, 'wb927448', 'https://www.baidu.com'];
			}

			const data = await convertImgToBase64(require('@/assets/img/404_images/404.png'));
			console.log(data);
			const imageId = workbook.addImage({
				base64: data.dataURL,
				extension: 'jpg'
			});
			console.log(imageId);
			const extH = 388; // 定死高度388
			const extW = (data.width * extH) / data.height;
			worksheet.addImage(imageId, {
				tl: {
					col: 6,
					row: 1
				},
				ext: {
					width: extW,
					height: extH
				},
				editAs: 'oneCell',
				// 超链接
				hyperlinks: {
				  hyperlink: 'https://www.baidu.com',
				  tooltip: 'https://www.baidu.com'
				}
			});

			{
				worksheet.getCell('A2').value = '车次';
				worksheet.getCell('A3').value = '辆序';
				worksheet.getCell('A4').value = '部位';
				worksheet.getCell('A5').value = '故障等级';
				worksheet.getCell('A6').value = '报警类型';
				worksheet.getCell('A7').value = '位置';
				worksheet.getCell('A8').value = '说明';
				worksheet.getCell('A9').value = '列检复核详情';
				worksheet.getCell('A10').value = '推送列检';
				worksheet.getCell('A11').value = '反馈状态';
				worksheet.getCell('A12').value = '处理人';
				worksheet.getCell('A13').value = '说明';

				worksheet.getCell('B2').value = 'asdfasdfasdf';
				worksheet.getCell('B3').value = 'asdfasdfasdf';
				worksheet.getCell('B4').value = 'asdfasdfasdf';
				worksheet.getCell('B5').value = 'asdfasdfasdf';
				worksheet.getCell('B6').value = 'asdfasdfasdf';
				worksheet.getCell('B7').value = 'asdfasdfasdf';
				worksheet.getCell('B8').value = 'asdfasdfasdf';
				worksheet.getCell('B9').value = '';
				worksheet.getCell('B10').value = 'asdfasdfasdf';
				worksheet.getCell('B11').value = 'asdfasdfasdf';
				worksheet.getCell('B12').value = 'asdfasdfasdf';
				worksheet.getCell('B13').value = 'asdfasdfasdf';

				worksheet.getCell('C2').value = '探测站';
				worksheet.getCell('C3').value = '车号';
				worksheet.getCell('C4').value = '报警时间';
				worksheet.getCell('C5').value = '故障编码';
				worksheet.getCell('C6').value = '自动报警厂家';
				worksheet.getCell('C7').value = 'AB端';
				worksheet.getCell('C8').value = '';
				worksheet.getCell('C9').value = '列检复核详情';
				worksheet.getCell('C10').value = '复核列检';
				worksheet.getCell('C11').value = '严重程度';
				worksheet.getCell('C12').value = '处理方式';
				worksheet.getCell('C13').value = '';

				worksheet.getCell('D2').value = 'asdfasdfasdf';
				worksheet.getCell('D3').value = 'asdfasdfasdf';
				worksheet.getCell('D4').value = 'asdfasdfasdf';
				worksheet.getCell('D5').value = 'asdfasdfasdf';
				worksheet.getCell('D6').value = 'asdfasdfasdf';
				worksheet.getCell('D7').value = 'asdfasdfasdf';
				worksheet.getCell('D8').value = '';
				worksheet.getCell('D9').value = '';
				worksheet.getCell('D10').value = 'asdfasdfasdf';
				worksheet.getCell('D11').value = 'asdfasdfasdf';
				worksheet.getCell('D12').value = 'asdfasdfasdf';
				worksheet.getCell('D13').value = '';

				worksheet.getCell('E2').value = '过车时间';
				worksheet.getCell('E3').value = '车型';
				worksheet.getCell('E4').value = '检车员';
				worksheet.getCell('E5').value = '故障名称';
				worksheet.getCell('E6').value = '预报时间';
				worksheet.getCell('E7').value = '发现时间';
				worksheet.getCell('E8').value = '';
				worksheet.getCell('E9').value = '列检复核详情';
				worksheet.getCell('E10').value = '反馈人';
				worksheet.getCell('E11').value = '反馈时间';
				worksheet.getCell('E12').value = '处理时间';
				worksheet.getCell('E13').value = '';

				worksheet.getCell('F2').value = 'asdfasdfasdf';
				worksheet.getCell('F3').value = 'asdfasdfasdf';
				worksheet.getCell('F4').value = 'asdfasdfasdf';
				worksheet.getCell('F5').value = 'asdfasdfasdf';
				worksheet.getCell('F6').value = 'asdfasdfasdf';
				worksheet.getCell('F7').value = 'asdfasdfasdf';
				worksheet.getCell('F8').value = '';
				worksheet.getCell('F9').value = '';
				worksheet.getCell('F10').value = 'asdfasdfasdf';
				worksheet.getCell('F11').value = 'asdfasdfasdf';
				worksheet.getCell('F12').value = 'asdfasdfasdf';
				worksheet.getCell('F13').value = '';

				// worksheet.getColumn(3).width = 200;
				// worksheet.getRow(2).height = 200;

				// worksheet.getCell('B4').value = 'Hello, World!';
				// worksheet.mergeCells('B4:B5');

				// worksheet.getCell('B4').alignment = {
				//   horizontal: 'center',
				//   vertical: 'middle'
				// };
			}

			// 设置双数列背景色和部分单元格左中对齐
			[2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].forEach(x => {
				worksheet.getRow(x).height = 20;
				['A', 'B', 'C', 'D', 'E', 'F'].forEach((m, mIndex) => {
					if (mIndex % 2 === 0) {
						worksheet.getCell(m + x).fill = {
							type: 'pattern',
							pattern: 'solid',
							// fgColor:{argb:'FFFFFF00'},
							// bgColor:{argb:'A9A9A9FF'}
							fgColor: { argb: 'FFF6F7Fb' }
							// bgColor: { argb: 'FFF6F7Fb' }
						};
					}
					worksheet.getCell(m + x).alignment = {
						horizontal: 'left',
						vertical: 'middle'
					};
				});
			});
			// 设置某列宽度
			[7].forEach(x => (worksheet.getColumn(x).width = (extW / 96) * 12)); // 计算字符数量， 设置列宽的单位是字符数， 一英寸12个字符数， 每英寸96个像素， 计算得出共计extW/96个英寸是多少字符数
			[1, 9].forEach(x => (worksheet.getRow(x).height = 30));
			[8, 13].forEach(x => (worksheet.getRow(x).height = 40));
			// 设置 A1 G1 A9标题样式
			['A1', 'G1', 'A9'].forEach(x => {
				worksheet.getCell(x).font = {
					// name: 'Arial Black',
					color: { argb: 'black' },
					background: { argb: 'black' },
					bold: true
					// family: 2,
					// size: 14,
					// italic: true
				};
				worksheet.getCell(x).fill = {
					type: 'pattern',
					pattern: 'solid',
					// fgColor:{argb:'FFFFFF00'},
					// bgColor:{argb:'A9A9A9FF'}
					fgColor: { argb: 'FF9D9D9D' }
					// bgColor: { argb: 'FF9D9D9D' }
				};
				worksheet.getCell(x).alignment = {
					horizontal: 'center',
					vertical: 'middle'
				};
			});

			// 设置所有边框
			for (let i = 0; i < 13; i++) {
				['A', 'B', 'C', 'D', 'E', 'F', 'G'].forEach(x => {
					worksheet.getCell(x + (i + 1)).border = {
						top: { style: 'thick', color: { argb: 'FFDCDFE6' } },
						left: { style: 'thick', color: { argb: 'FFDCDFE6' } },
						bottom: { style: 'thick', color: { argb: 'FFDCDFE6' } },
						right: { style: 'thick', color: { argb: 'FFDCDFE6' } }
					};
				});
			}

			worksheet.mergeCells('G2:G13');
			worksheet.mergeCells('A1:F1');
			worksheet.mergeCells('A9:F9');
			worksheet.mergeCells('B8:F8');
			worksheet.mergeCells('B13:F13');

			for (let i = 0; i < 13; i++) {
				worksheet.getCell('G' + (i + 1)).alignment = {
					horizontal: 'center',
					vertical: 'middle'
				};
			}

			const buffer = await workbook.xlsx.writeBuffer();
			saveAs(
				new Blob([buffer], {
					type: 'application/octet-stream'
				}),
				'demo.xlsx'
			);
		}
	},
	watch: {}
};
</script>

<style lang="scss">

</style>

```