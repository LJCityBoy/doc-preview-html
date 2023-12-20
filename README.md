# 一个辅助预览docx文件的小工具

## 提供的方法与参数如下

|     方法名      |      说明      |           类型          |  默认值 |  版本   |
|:-------------:|:----------:|:---------------------:|:-------:|-------:|
|  docFile2html  | docx文件转html | (file, bodyContainer, header) => string     |    -    |  1.1.0+  |
### docFile2html入参参数说明
|     参数      |      说明      |    默认值  |  
|:-------------:|:----------:|:---------------------:|
|     file      |      文档路径、或者文档流      |    默认值  |
|     bodyContainer      |      展示文档的html容器      |    默认值  |
|     header      |      可选参数，当file为文档路径时，可以通过header参数设置请求头      |    默认值  |


## Vue中示例

```
<template>
  <div>
    <div ref="content"></div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { docFile2html } from "./components/DocPreview.js";

const content = ref();

onMounted(() => {
  // 调用方法，入参可以是文档地址，可以是二进制文档流
  docFile2html("./test.doc", content.value);
});
</script>

<style scoped></style>


```