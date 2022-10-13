<template>
  <a-col :span="24">
    <a-button type="primary" @click="handleSubmit()">打印表格</a-button>
    <a-button type="primary" class="ml20" @click="handlePreview()">预览表格 </a-button>
    <div id="form1" style="display: none">
      <table border="1" style="border-collapse: collapse; width: 330px">
        <tr>
          <td>打印初始化</td>
          <td>打印初始化</td>
        </tr>
        <tr>
          <td>打印初始化</td>
          <td>打印初始化</td>
        </tr>
      </table>
    </div>
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
 * AddPrintContent(Top,Left,Width,Height,srcHtml);
 * 顶，左，宽，高，dom
 */
const AddPrintContent = () => {
  LODOP.ADD_PRINT_TABLE(10, 0, 100, 100, document.getElementById("form1").innerHTML);
};

const init = () => {
  const LODOP = getLodop();
  LODOP.SET_PRINT_PAGESIZE(1, 900, 700);
};
</script>
<style lang="less" scoped></style>
