import * as docx from "docx-preview";

/**
 *
 * doc文件转html
 * @param file 文件路径或者二进制文件流
 * @param {*} bodyContainer 展示文档的html容器
 * @param {*} header 可选参数，如果是文件路径，可能有需要配置请求头的需求
 * @returns
 */
function docFile2html(file, bodyContainer, header) {
  return new Promise(function (res, rej) {
    if (file instanceof ArrayBuffer || file instanceof Blob) {
      docx
        .renderAsync(file, bodyContainer, "")
        .then(function (obj) {
          res(obj);
        })
        .catch(function (error) {
          console.log(error);
          rej(error);
        });
    } else {
      const xhr = new XMLHttpRequest();
      xhr.open("get", file, true);
      xhr.responseType = "arraybuffer";
      xhr.send(JSON.stringify(header));
      xhr.onload = function () {
        if (xhr.status === 200 || xhr.status === 304) {
          docx
            .renderAsync(xhr.response, bodyContainer, "")
            .then(function (obj) {
              res(obj);
            })
            .catch(function (error) {
              console.log(error);
              rej(error);
            });
        } else {
          const err = new Error("文档解析错误！");
          console.log(err);
          rej(err);
        }
      };
    }
  });
}

export { docFile2html };
