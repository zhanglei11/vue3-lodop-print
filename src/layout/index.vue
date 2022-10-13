<template>
  <a-layout class="vab-layout-wrap" v-if="!isFullscreen">
    <a-layout-sider
      collapsible
      class="vab-sider"
      width="250"
      v-model:collapsed="collapse"
      :trigger="null"
    >
      <VabLogo ref="vabLogRef" />
      <VabMenu ref="vabMenuRef" />
    </a-layout-sider>
    <a-layout :class="collapse ? 'vab-layout-min' : 'vab-layout'">
      <a-layout-header class="vab-header">
        <a-row>
          <a-col :md="16" :sm="24">
            <span class="fl">
              <MenuUnfoldOutlined
                v-if="collapse"
                @click="toggleCollapse"
                class="trigger"
              ></MenuUnfoldOutlined>
              <MenuFoldOutlined
                v-else
                @click="toggleCollapse"
                class="trigger"
              ></MenuFoldOutlined>
            </span>
          </a-col>
          <a-col :md="8" :sm="24">
            <VabAvatar ref="vabAvatarRef" @changeIsFullscreen="changeIsFullscreen" />
          </a-col>
        </a-row>
      </a-layout-header>
      <VabTabs />
      <VabContent />
    </a-layout>
  </a-layout>
  <VabContent v-if="isFullscreen" style="z-index: 2000" />
  <VabAvatar
    style="display: none"
    ref="vabAvatarRef"
    @changeIsFullscreen="changeIsFullscreen"
  />
</template>
<script lang="ts" setup>
import VabLogo from "./vab-logo/index.vue";
import VabAvatar from "./vab-avatar/index.vue";
import VabMenu from "./vab-menu/index.vue";
import VabTabs from "./vab-tabs/index.vue";
import VabContent from "./vab-content/index.vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { ref, onMounted, watch, nextTick } from "vue";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons-vue";
import { getCurrentUser, getUserInfo } from "@/pages/apis/user";
const vabLogRef = ref();
const vabAvatarRef = ref();
const vabMenuRef = ref();
const store = useStore();
const collapse = ref<any>(store.state.settings.collapse);
const isFullscreen = ref<boolean>(false);

//切换 collapsed 模式
const toggleCollapse = () => {
  store.dispatch("settings/toggleCollapse");
  collapse.value = store.state.settings.collapse;
  vabLogRef.value.setCollapse(store.state.settings.collapse);
};

//获取基本信息
const getAccount = () => {
  getCurrentUser().then((res) => {
    if (res.errorCode == "00000") {
      vabAvatarRef.value.updateData(res.data.loginName);
      store.dispatch("user/toggleUserInfo", res.data);
    } else {
      store.dispatch("user/toggleUserInfo", {});
    }
  });

};

const changeIsFullscreen = (value: any) => {
  isFullscreen.value = value;
  if (collapse.value != isFullscreen.value) {
    toggleCollapse();
  }
};

onMounted(() => {
  vabMenuRef.value.setMenu();
  getAccount();
});
watch(
  () => isFullscreen.value,
  (val) => {
    if (!val) {
      nextTick(() => {
        vabMenuRef.value.setMenu();
      });
    }
  }
);
</script>
<style lang="less">
.vab-layout-wrap {
  .vab-sider {
    position: fixed;
    left: 0;
    height: 100vh;
    overflow: auto;
    background: #485460;
    .vab-menu {
      height: calc(100vh - 65px);
    }
    .ant-menu-inline,
    .ant-menu-inline-collapsed {
      background: #485460;
    }
    .ant-menu-item,
    .ant-menu-submenu-title {
      margin-bottom: 0 !important;
      margin-top: 0 !important;
      height: 48px;
      line-height: 48px;
      color: #fff;
    }
    .ant-menu-item-selected {
      background: #15171a;
    }
    .ant-menu-item-selected::after {
      border-right: 0px;
    }
  }
  .vab-layout {
    padding-left: 250px;
    transition: all 0.2s;
  }

  .vab-layout-min {
    padding-left: 80px;
    transition: all 0.2s;
  }

  .vab-header {
    padding: 0;
    background: #fff;
    color: #001529;
    border-bottom: 1px solid rgb(223, 223, 224);
    .ant-col + .ant-col {
      display: flex;
      justify-content: flex-end;
      padding: 0 20px;
    }
    .trigger {
      height: 16px;
      line-height: 64px;
      cursor: pointer;
      transition: color 0.3s;
      margin-top: 3px;
      font-size: 16px;
      padding: 0 10px;
      &:hover {
        color: #1890ff;
      }
    }
  }
}
.ant-menu-submenu-popup > .ant-menu {
  background-color: #485460;
  color: #fff;
  margin-bottom: 0 !important;
  margin-top: 0 !important;
  .ant-menu-item:hover {
    color: #fff;
  }
  .ant-menu-item-selected {
    background-color: #15171a;
    color: #fff;
  }
}
.ant-menu-submenu-arrow::after,
.ant-menu-submenu-arrow::before {
  background-color: #fff;
}
</style>
