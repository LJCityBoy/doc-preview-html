
import * as mammoth from "mammoth";
import Docxtemplater from "docxtemplater";
import PizZip from "pizzip";
import PizZipUtils from "pizzip/utils/index.js";

const loadFile = (url, callback) => {
  PizZipUtils.getBinaryContent(url, callback);
};

/**
 * doc文件转html
 * @param fileUrl 文件路径
 */
export const docFile2html = (fileUrl) => {
  return new Promise((res, rej) => {
    loadFile(fileUrl, (error, content) => {
      if (error) throw error;
      const zip = new PizZip(content);
      const doc = new Docxtemplater(zip, {
        paragraphLoop: true,
        linebreaks: true,
      });
      try {
        doc.render();
      } catch (err) {
        function replaceErrors(key, value) {
          if (value instanceof Error) {
            return Object.getOwnPropertyNames(value).reduce(function (
              error,
              key
            ) {
              error[key] = value[key];
              return error;
            },
            {});
          }
          return value;
        }
        console.log(JSON.stringify({ error: error }, replaceErrors));

        if (error.properties && error.properties.errors instanceof Array) {
          const errorMessages = error.properties.errors
            .map(function (error) {
              return error.properties.explanation;
            })
            .join("\n");
          console.log("errorMessages", errorMessages);
        }
        rej(error);
        throw error;
      }
      const buffData = doc.getZip().generate({
        type: "blob",
        mimeType:
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      });
      mammoth
        .convertToHtml({ arrayBuffer: buffData })
        .then((result) => {
          res(result.value);
        })
        .done();
    });
  });
};

/**
 * 二进制doc文件流转html
 * @param {*} bufferData 二进制文件流
 */
export const docBuffer2html = (bufferData) => {
  return new Promise((res, rej) => {
    mammoth
      .convertToHtml({ arrayBuffer: bufferData })
      .then((result) => {
        if (result) res(result.value);
        rej("转换失败！");
      })
      .done();
  });
};
