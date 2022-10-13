<template>
  <a-col class="vab-tabs">
    <a-col class="vab-tabs-left-panel">
      <a-tabs
        @tab-click="handleTabClick"
        @edit="handleTabRemove"
        v-model:activeKey="tabActive"
        hide-add
        type="editable-card"
      >
        <a-tab-pane
          v-for="item in visitedRoutes"
          :key="item.path"
          :tab="locale === 'zh' ? item.meta.title : item.meta.titleEn"
        ></a-tab-pane>
      </a-tabs>
    </a-col>
    <a-col class="vab-tabs-right-panel">
      <a-dropdown>
        <template v-slot:overlay>
          <a-menu @click="handleClick">
            <a-menu-item key="closeOthersTabs">
              <a>{{ $t("base.closeOther") }}</a>
            </a-menu-item>
            <a-menu-item key="closeLeftTabs">
              <a>{{ $t("base.closeLeft") }}</a>
            </a-menu-item>
            <a-menu-item key="closeRightTabs">
              <a>{{ $t("base.closeRight") }}</a>
            </a-menu-item>
            <a-menu-item key="closeAllTabs">
              <a>{{ $t("base.closeAll") }}</a>
            </a-menu-item>
          </a-menu>
        </template>
        <a-button>
          {{ $t("base.more") }}
          <IconCom type="DownOutlined" />
        </a-button>
      </a-dropdown>
    </a-col>
  </a-col>
</template>
<script lang="ts" setup>
import { useStore } from "vuex";
import { ref, onMounted, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import IconCom from "@/components/modules/IconCom.vue";
import { useI18n } from "vue-i18n";
const { locale } = useI18n();
const tabActive = ref(null);
const store = useStore();
const route = useRoute();
const router = useRouter();
const visitedRoutes = ref(store.state.tagsBar.visitedRoutes);
onMounted(() => addTabs(route));

watch(route, () => addTabs(route));

watch(
  store.state.tagsBar,
  () => (visitedRoutes.value = store.state.tagsBar.visitedRoutes)
);

const addTabs = (tag: any) => {
  if (tag.name && tag.meta) {
    let matched = [tag.name];
    if (tag.matched) matched = tag.matched.map((item: any) => item.name);
    store.dispatch("tagsBar/addVisitedRoute", {
      path: tag.path,
      fullPath: tag.fullPath,
      query: tag.query,
      params: tag.params,
      name: tag.name,
      matched: matched,
      meta: { ...tag.meta },
    });
    tabActive.value = tag.path;
  }
};

const isActive = (routeKey: any) => {
  return routeKey.path === route.path;
};

const handleTabClick = (tab: any) => {
  const routekey = visitedRoutes.value.filter((item: any) => item.path === tab)[0];
  if (route.fullPath !== routekey.fullPath) router.push(routekey);
};

const handleTabRemove = (fullPath: any) => {
  const view = visitedRoutes.value.find((item: any) => {
    return fullPath == item.path;
  });
  if (view) {
    store.dispatch("tagsBar/delVisitedRoute", view);
    if (isActive(view)) toLastTag();
  }
};

const handleClick = (Object: any) => {
  let { key } = Object;
  switch (key) {
    case "closeOthersTabs":
      closeOthersTabs();
      break;
    case "closeLeftTabs":
      closeLeftTabs();
      break;
    case "closeRightTabs":
      closeRightTabs();
      break;
    case "closeAllTabs":
      closeAllTabs();
      break;
  }
};

const closeOthersTabs = () => {
  store.dispatch("tagsBar/delOthersVisitedRoutes", toThisTag());
};

const closeLeftTabs = () => {
  store.dispatch("tagsBar/delLeftVisitedRoutes", toThisTag());
};

const closeRightTabs = () => {
  store.dispatch("tagsBar/delRightVisitedRoutes", toThisTag());
};

const closeAllTabs = () => {
  store.dispatch("tagsBar/delAllVisitedRoutes");
  router.push("/");
};

const toLastTag = () => {
  const latestView = visitedRoutes.value.slice(-1)[0];
  if (latestView) router.push(latestView);
  else router.push("/");
};

const toThisTag = () => {
  const view = visitedRoutes.value.find((item: any) => item.path === route.path);
  if (route.path !== view.path) {
    router.push(view);
  }
  return view;
};
</script>

<style lang="less">
.vab-tabs {
  padding: 10px 0 0 10px;
  background: #ffffff;
  &-left-panel {
    float: left;
    width: calc(100% - 52px - 20px - 20px);
  }
  &-right-panel {
    float: left;
    width: 52px;
  }
  .ant-tabs {
    &-bar {
      margin: 0 !important;
    }
    &-tab {
      height: 32px !important;
      margin-right: 5px !important;
      line-height: 32px !important;
      background: #ffffff !important;
      border: 1px solid #dedede !important;
    }
    &-tab-prev,
    &-tab-next {
      height: 32px !important;
      line-height: 32px !important;
    }
    &-tab-active {
      border: 1px solid #1890ff !important;
      .ant-tabs-close-x {
        color: #1890ff !important;
      }
    }
  }
}
.ant-tabs-nav {
  margin-bottom: 10px !important;
}
</style>
