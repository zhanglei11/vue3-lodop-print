<template>
  <a-layout-content class="vab-content">
    <transition mode="out-in" name="fade-transform">
      <router-view v-slot="{ Component }" key="routerView">
        <keep-alive>
          <component :is="Component" :key="$route.meta.path" v-if="$route.meta.keepAlive" />
        </keep-alive>
        <component :is="Component" :key="$route.meta.path" v-if="!$route.meta.keepAlive" />
      </router-view>
    </transition>
  </a-layout-content>
</template>
<script lang="ts" setup>
</script>
<style lang="less">
.fade-transform-leave-active,
.fade-transform-enter-active {
  transition: all 0.2s;
}

.fade-transform-enter {
  opacity: 0;
  transform: translateX(-30px);
}

.fade-transform-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.vab-content {
  height: calc(100vh - 110px) !important;
  overflow-y: auto;
  overflow-x: hidden;
  .ant-card,
  & > .ant-col {
    margin: 12px;
    background: #fff;
    min-width: 100px;
    & > .ant-card-body{
      padding:15px;
    }
  }
}
</style>
