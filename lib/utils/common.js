/**
 * @param {*} url  需要下载的文件地址
 * @param {*} fileName  需要下载后的文件名称（跨域的地址无效）
 */
export const downFileByUrl = (url, fileName) => {
  // let data = await fetch(res, { mode: 'cors' });
  // let url = window.URL.createObjectURL(new Blob([data]));
  let link = document.createElement("a");
  link.href = url;
  link.download = fileName; // 跨域无法设置名称
  if (/(\.png|\.jpeg|\.jpg|\.gif)$/.test(fileName)) {
    link.target = "_blank";
  }
  link.dispatchEvent(new MouseEvent("click"));
  // var xml = new XMLHttpRequest();
  // xml.open('GET', res, true);
  // xml.responseType = 'blob';
  // xml.onload = function () {
  //   var url = window.URL.createObjectURL(xml.response);
  //   var a = document.createElement('a');
  //   a.href = url;
  //   a.download = fileName;
  //   a.click();
  // };
  // xml.send();
};

/**
 * 导出-下载文件
 * @param {*} res -后端返回二进制流
 * @param {*} fileName -文件名需要带后缀名
 */
export function exportDownFile(res, fileName) {
  let url = window.URL.createObjectURL(new Blob([res])); // 将后端给的二进制文件，转a的地址
  let link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  link.dispatchEvent(new MouseEvent("click"));
}

/**
 * 获取到的二进制文件 转 base64文件
 * @param file
 * @param scale ----压缩比例
 * @param callback ---回调函数
 */
export function fileToCompressBase64AndBlob(file, scale, callback) {
  const reader = new FileReader();
  reader.readAsDataURL(file); // 添加二进制文件
  reader.onload = function (event) {
    console.log("转换成功");
    const base64 = event.target.result;
    compressImg(base64, scale, callback);
  };
  //转 失败
  reader.onerror = function (error) {
    console.log("转换失败");
    callback(false);
  };
}

/**
 * 压缩图片方法
 * @param base64  ----baser64文件
 * @param scale ----压缩比例 画面质量0-9，数字越小文件越小画质越差
 * @param callback ---回调函数
 *
 * png 图片无法压缩，会用默认黑底显示
 *
 */
function compressImg(base64, scale, callback) {
  console.log(`缩放比例 ${scale}`);

  // 处理缩放，转换格式
  const img = new Image();
  img.src = base64;
  img.onload = function () {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.setAttribute("width", img.width);
    canvas.setAttribute("height", img.height);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // 绘制白底（png图片默认黑底）
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    // 绘制图片
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    // 转成base64 文件, png 图片无效（可以用 canvas-png-compression）
    // let base64 = canvas.toDataURL('image/jpeg');
    let base64 = canvas.toDataURL("image/jpeg");
    // 方案1、直接用传入的压缩比例
    base64 = canvas.toDataURL("image/jpeg", scale);
    // 方案2、限制图片最大为3M
    // while (base64.length > 1024 * 1024 * 3) {
    //   scale -= 0.01;
    //   base64 = canvas.toDataURL('image/jpeg', scale);
    // }
    // baser64 TO blob
    const arr = base64.split(",");
    const mime = arr[0].match(/:(.*?);/)[1];
    const bytes = atob(arr[1]);
    const bytesLength = bytes.length;
    const u8arr = new Uint8Array(bytesLength);
    for (let i = 0; i < bytes.length; i++) {
      u8arr[i] = bytes.charCodeAt(i);
    }
    const blob = new Blob([u8arr], { type: mime });
    // 回调函数
    callback(true, blob, base64); // blob, base64 压缩后的二进制文件 和 base64
  };
}
