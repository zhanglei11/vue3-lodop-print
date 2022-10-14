<template>
  <a-col :span="24">
    <a-button type="primary" @click="handleSubmit()">打印二维码</a-button>
    <a-button type="primary" class="ml20" @click="handlePreview()">预览二维码 </a-button>
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
/**
 * 
 * ADD_PRINT_BARCODE(Top,Left,Width,Height,BarCodeType,BarCodeValue);
 * 顶，左，宽，高，条码的类型（规制）名称，条码值
  条码的类型 ：
  128A
  128B
  128C
  128Auto
  EAN8
  EAN13	EAN128A
  EAN128B
  EAN128C
  Code39
  39Extended
  2_5interleaved	2_5industrial
  2_5matrix
  UPC_A
  UPC_E0
  UPC_E1
  UPCsupp2	UPCsupp5
  Code93
  93Extended
  MSI
  PostNet
  Codabar	QRCode
  PDF417
 */
const AddPrintContent = () => {
  LODOP.ADD_PRINT_BARCODE(28, 88, 100, 100, "QRCode", "123456789012"); //设置条码位置、宽高、字体、值
};

const init = () => {
  const LODOP = getLodop();
  LODOP.SET_PRINT_PAGESIZE(1, 900, 700);
};
</script>
<style lang="less" scoped></style>
