import * as docx from "docx-preview";

const options = {
  className: (string = "docx"), //class name/prefix for default and document style classes
  inWrapper: (boolean = true), //enables rendering of wrapper around document content
  ignoreWidth: (boolean = false), //disables rendering width of page
  ignoreHeight: (boolean = false), //disables rendering height of page
  ignoreFonts: (boolean = false), //disables fonts rendering
  breakPages: (boolean = true), //enables page breaking on page breaks
  ignoreLastRenderedPageBreak: (boolean = true), //disables page breaking on lastRenderedPageBreak elements
  experimental: (boolean = false), //enables experimental features (tab stops calculation)
  trimXmlDeclaration: (boolean = true), //if true, xml declaration will be removed from xml documents before parsing
  useBase64URL: (boolean = false), //if true, images, fonts, etc. will be converted to base 64 URL, otherwise URL.createObjectURL is used
  useMathMLPolyfill: (boolean = false), //@deprecated includes MathML polyfills for chrome, edge, etc.
  renderChanges: false, //enables experimental rendering of document changes (inserions/deletions)
  renderHeaders: true, //enables headers rendering
  renderFooters: true, //enables footers rendering
  renderFootnotes: true, //enables footnotes rendering
  renderEndnotes: true, //enables endnotes rendering
  debug: (boolean = false), //enables additional logging
};
/**
 * 
 * doc文件转html
 * @param file 文件路径或者二进制文件流
 * @param {*} bodyContainer 展示文档的html容器
 * @param {*} header 可选参数，如果是文件路径，可能有需要配置请求头的需求 
 * @returns 
 */
export const docFile2html = (file, bodyContainer, header) => {
  return new Promise((res, rej) => {
    if (file instanceof ArrayBuffer || file instanceof Blob) {
      docx
        .renderAsync(file, bodyContainer, "", options)
        .then((obj) => {
          res(obj);
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
          docx
            .renderAsync(xhr.response, bodyContainer, "", options)
            .then((obj) => {
              res(obj);
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
