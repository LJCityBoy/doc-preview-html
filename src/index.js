import * as docx from "docx-preview";

/**
 * doc文件转html
 * @param file 文件路径或者二进制文件流
 * @param {*} header 如果是文件路径，可能有需要配置请求头的需求
 * @returns
 */
export const docFile2html = (file, header) => {
  return new Promise((res, rej) => {
    if (file instanceof ArrayBuffer || file instanceof Blob) {
      const div = document.createElement("div");
      docx
        .renderAsync(file, div)
        .then(() => {
          res(div.innerHTML);
        })
        .catch((error) => {
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
          const div = document.createElement("div");
          docx
            .renderAsync(xhr.response, div)
            .then(() => {
              res(div.innerHTML);
            })
            .catch((error) => {
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
};
