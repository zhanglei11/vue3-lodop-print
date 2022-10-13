<template>
  <a-row class="print mt20" :span="24">
    <a-col :span="24" class="tips">
      <h1>lodop标签打印</h1>
    </a-col>
    <a-tabs v-model:activeKey="activeKey">
      <a-tab-pane key="Title" tab="标题">
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
    </a-tabs>
  </a-row>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import { getLodop } from "@/utils/LodopFuncs.js";
import Title from "./component/title.vue";
import QRCode from "./component/QRCode.vue";
import Text from "./component/text.vue";
import Table from "./component/table.vue";
const activeKey = ref("Table");
</script>
<style lang="less" scoped>
.print {
  text-align: left;
  width: 1000px;
  margin-left: auto;
  margin-right: auto;
  background: #fff;
}
h1 {
  text-align: center;
}
</style>
