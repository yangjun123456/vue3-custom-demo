const svgFiles = require.context('./svg', true, /\.svg$/);
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const iconList = svgFiles.keys().map((item) => svgFiles(item));
