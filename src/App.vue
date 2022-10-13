<template>
  <a-col id="vue-admin-beautiful">
    <a-config-provider :locale="locale_s">
      <router-view />
    </a-config-provider>
  </a-col>
</template>
<script lang="ts" setup name="APP">
</script>
<style lang="less" scoped>
#vue-admin-beautiful {
  height: 100vh;
  overflow: hidden;
  background:#e5e5e5;
}
</style>
