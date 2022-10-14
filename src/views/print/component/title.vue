<template>
  <a-list item-layout="horizontal">
    <a-list-item v-for="item in data">
      <a-list-item-meta>
        <template #title> {{ item.title }} </template>
        <template #avatar>
          <a-avatar src="https://joeschmoe.io/api/v1/random" />
        </template>
        <template #description> {{ item.value }} </template>
      </a-list-item-meta>
    </a-list-item>
  </a-list>
</template>
<script lang="ts" setup>
const data = [
  // { title: "PRINT_INIT", value: "打印初始化" },
  // { title: "PREVIEW", value: "打印预览" },
  // { title: "PRINT", value: "直接打印" },
  // { title: "PRINT_SETUP", value: "打印维护" },
  // { title: "PRINT_DESIGN", value: "打印设计" },
  {
    title: "ADD_PRINT_TEXT",
    value:
      "intTop,intLeft,intWidth,intHeight,strHtml -----距离顶部距离，距离左边距离，宽，高，文本内容",
  },
  {
    title: "SET_PRINT_STYLE",
    value:
      'strStyleName, varStyleValue ----打印初始化后、增加打印项之前调用本函数 LODOP.SET_PRINT_STYLE("FontSize",11);',
  },
  {
    title: "SET_PRINT_STYLEA",
    value:
      'value,strStyleName, varStyleValue ----LODOP.SET_PRINT_STYLEA(3,"FontName","隶书");设置第3个内容项的字体为隶书。',
  },
  {
    title: "ADD_PRINT_TABLE",
    value:
      `intTop,intLeft,intWidth,intHeight,strHtml ----  LODOP.ADD_PRINT_TABLE(0, 0, 100, 100, document.getElementById("form1").innerHTML);纸张名，必须intPageWidth等于零时本参数才有效，有如下选择：
    Letter, LetterSmall, Tabloid, Ledger, Legal,Statement, Executive,
    A3, A4, A4Small, A5, B4, B5, Folio, Quarto, qr10X14, qr11X17, Note,
    Env9, Env10, Env11, Env12,Env14, Sheet, DSheet, ESheet`,
  },
    {
    title: "ADD_PRINT_BARCODE",
    value:'顶，左，宽，高，条码的类型（规制）名称，条码值',
  },
];
</script>
<style lang="less" scoped>
.ant-list {
  width: 100%;
}
</style>
