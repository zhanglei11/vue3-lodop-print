<template>
  <a-col :span="24">
    <a-button type="primary" @click="handleSubmit()">打印HTML</a-button>
    <a-button type="primary" class="ml20" @click="handlePreview()">预览HTML </a-button>
  </a-col>
  <div id="form1">
    <div style="height: 40px; line-height: 40px;font-size: 18px;">
      <span>姓名：</span>
      <span>张三</span>
    </div>
    <div style="height: 40px; line-height: 40px;font-size: 18px;">
      <span>性别：</span>
      <span>男</span>
    </div>
    <div style="height: 40px; line-height: 40px;font-size: 18px;">
      <span>手机号:</span>
      <span>19912345678</span>
    </div>
    <div style="height: 80px; line-height: 80px;font-size: 18px;">
      <span>微信二维码:</span>
    </div>
  </div>
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
/**
 *
 * ADD_PRINT_HTM(Top,Left,Width,Height,srcHtml);
 * 顶，左，宽，高，dom
 *
 * 针对结合 根据定位，将固定的位置空置出来
 */
const AddPrintContent = () => {
  LODOP.ADD_PRINT_HTM(5, 0, 600, 250, document.getElementById("form1").innerHTML);
  LODOP.ADD_PRINT_BARCODE(138, 100, 100, 100, "QRCode", "123456789012");
};

const init = () => {
  const LODOP = getLodop();
  LODOP.SET_PRINT_PAGESIZE(1, 900, 700);
};
</script>
<style lang="less" scoped>
.name1 {
  height: 40px;
  line-height: 40px;
}
.name2 {
  height: 80px;
  line-height: 40px;
}
</style>
