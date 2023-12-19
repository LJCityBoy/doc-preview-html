# 一个辅助预览docx文件的小工具

## 提供的方法与参数如下

|     方法名      |      说明      |           类型          |  默认值 |  版本   |
|:-------------:|:----------:|:---------------------:|:-------:|-------:|
|  docFile2html  | docx文件转html | (file, header) => string     |    -    |  1.1.0+  |
### docFile2html入参参数说明
|     参数      |      说明      |    默认值  |  
|:-------------:|:----------:|:---------------------:|
|     file      |      文档路径、或者文档流      |    默认值  |
|     header      |      当file为文档路径时，可以通过header参数设置请求头      |    默认值  |


## Vue中示例

```
<template>
  <div>
    <div v-html="content"></div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { docFile2html } from "doc-preview-html";

const content = ref();

// 调用方法，入参可以时文档地址，可以是二进制文档流
docFile2html("./test1.docx").then((res) => {
  content.value = res;
});
</script>

<style scoped></style>

```