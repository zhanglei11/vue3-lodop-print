<template>
  <a-col id="APP">
    <a-config-provider :locale="locale_s">
      <router-view />
    </a-config-provider>
  </a-col>
</template>
<script lang="ts" setup name="APP">
</script>
<style lang="less" scoped>
#APP {
  height: 100vh;
  overflow: hidden;
  background:#e5e5e5;
}
</style>
