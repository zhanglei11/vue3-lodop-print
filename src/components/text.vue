<template>
  <a-col :span="24">
    <a-button type="primary" @click="handleSubmit()">打印文本</a-button>
    <a-button type="primary" class="ml20" @click="handlePreview()">预览文本 </a-button>
  </a-col>
</template>
<script lang="ts" setup>
import { getLodop } from "@/utils/LodopFuncs.js";
const handleSubmit = async () => {
  await init();
  await AddPrintContent();
  LODOP.PRINT();
};

const handlePreview = async () => {
  await init();
  await AddPrintContent();
  LODOP.PREVIEW();
};

const AddPrintContent = () => {
  LODOP.ADD_PRINT_TEXT(28, 88, 800, 500, "尼古拉斯张三");
  LODOP.SET_PRINT_STYLEA(0,"FontSize",22);//设置上面这个条码下方的文字字体大小
  LODOP.SET_PRINT_STYLEA(0,"Color","#FF0000");//设置当前条码以及条码下方字体的颜色
};

const init = () => {
  const LODOP = getLodop();
  LODOP.SET_PRINT_PAGESIZE(1, 900, 700);
};
</script>
<style lang="less" scoped></style>
