<template>
  <a-col :span="24">
    <a-button type="primary" @click="handleSubmit()">打印图标</a-button>
    <a-button type="primary" class="ml20" @click="handlePreview()">预览图片 </a-button>
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
  // LODOP.ADD_PRINT_IMAGE(5, 0, 600, 250, "<img border='0' src='http://www.lodop.net/demolist/PrintSample8.jpg'width='100%' height='250'/>");
  LODOP.ADD_PRINT_IMAGE(5, 0, 600, 250, "http://www.lodop.net/demolist/PrintSample8.jpg");
};

const init = () => {
  const LODOP = getLodop();
  LODOP.SET_PRINT_PAGESIZE(1, 900, 700);
};
</script>
<style lang="less" scoped></style>
