<template>
  <a-form :wrapperCol="{ span: 20 }" >
    <a-row :gutter="{ xs: 8, sm: 16, md: 24}">
      <slot></slot>
    </a-row>
  </a-form>
</template>
<script lang="ts" setup>
// 公共页面不要修改 如果达不到你的要求 找zhangle 让他来改
</script>
<style lang="less" scoped>
.col-block {
  display: none;
}
:deep(.ant-form-item) {
  margin-bottom: 5px !important;
}
</style>
