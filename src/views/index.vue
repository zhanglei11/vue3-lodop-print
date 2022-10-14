<template>
  <a-row class="print mt20" :span="24">
    <a-col :span="24" class="tips">
      <h1 class="pt20">lodop标签打印</h1>
    </a-col>
    <a-tabs v-model:activeKey="activeKey">
      <a-tab-pane key="Title" tab="简介">
        <Title></Title>
      </a-tab-pane>
      <a-tab-pane key="QRCode" tab="二维码">
        <QRCode></QRCode>
      </a-tab-pane>
      <a-tab-pane key="Text" tab="文本">
        <Text></Text>
      </a-tab-pane>
      <a-tab-pane key="Table" tab="表格">
        <Table></Table>
      </a-tab-pane>
      <a-tab-pane key="Image" tab="图片">
        <Image></Image>
      </a-tab-pane>
      <a-tab-pane key="Html" tab="HTML">
        <Html></Html>
      </a-tab-pane>
    </a-tabs>
  </a-row>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import { getLodop } from "@/utils/LodopFuncs.js";
import Title from "@/components/title.vue";
import QRCode from "@/components/QRCode.vue";
import Text from "@/components/text.vue";
import Table from "@/components/table.vue";
import Image from "@/components/image.vue";
import Html from "@/components/html.vue";
const activeKey = ref("Title");
</script>
<style lang="less" scoped>
.print {
  text-align: left;
  width: 1000px;
  margin-left: auto;
  margin-right: auto;
  background: #fff;
  padding: 0 20px;
}
h1 {
  text-align: center;
}
.ant-tabs {
  width: 100%;
}
:deep(.ant-tabs-content-holder) {
  padding-bottom: 20px !important;
}
</style>
