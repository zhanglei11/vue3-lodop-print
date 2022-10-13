<template>
<!-- {{menusList}} -->
  <a-menu mode="inline" v-model:selectedKeys="selectedKeys" v-model:openKeys="openKeys">
    <template v-for="item in menusList">
      <template v-if="item.children.length">
        <a-sub-menu :key="item.title">
          <template #icon>
            <IconCom :type="item.icon" />
          </template>
          <template #title>{{ locale === "zh" ? item.title : item.titleEn }}</template>
          <a-menu-item
            v-for="item_1 in item.children"
            :key="item_1.title"
            :class="$route.path == item.path ? 'ant-menu-item-selected' : ''"
            @click="saveNavState(item_1)"
          >
            {{ locale === "zh" ? item_1.title : item_1.titleEn }}
          </a-menu-item>
        </a-sub-menu>
      </template>
      <template v-else>
        <a-menu-item
          @click="saveNavState(item)"
          :key="item.title"
          :class="$route.path == item.path ? 'ant-menu-item-selected' : ''"
        >
          <template #icon>
            <IconCom :type="item.icon" />
          </template>
          {{ locale === "zh" ? item.title : item.titleEn }}
        </a-menu-item>
      </template>
    </template>
  </a-menu>
</template>
<script lang="ts" setup>
import baseMenu from "@/utils/menus";
import { useStore } from "vuex";
import { onMounted, ref, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import IconCom from "@/components/modules/IconCom.vue";
import { useI18n } from "vue-i18n";
const menusList = ref<any>();
const selectedKeys = ref<any>([]);
const openKeys = ref<any>([]);
const allowRouter = ref<any>([]);
const { locale } = useI18n();
const store = useStore();
const route = useRoute();
const router = useRouter();
watch(
  route,
  (Object: Object) => {
    let { matched } = Object;
    selectedKeys.value = !matched[1] ? [] : [matched[1].meta.title];
    openKeys.value = !matched[0] ? [] : [matched[0].meta.title];
  },
  { immediate: true }
);

const saveNavState = (item: Object) => {
  if (route.path == item.path) return;
  router.push({
    path: item.path,
    query: {},
  });
};

onMounted(() => {
  getAccountMenu();
});

const setMenu = () => {
  let baseMenuHis = JSON.parse(JSON.stringify(baseMenu));
  menusList.value = baseMenuHis
  // setMenusList(baseMenuHis);
};

//路由过滤 判断该路由是否显示规则
const setMenusList = (menus: any) => {
  menus.forEach((item: any, index: any) => {
    let flage = false;
    if (item.children.length > 0) {
      item.children.forEach((item_1: any) => {
        //判断是否具有访问权限
        if (allowRouter.value.includes(item_1.path)) {
          item_1.isShow = true;
          flage = true;
        } else {
          item_1.isShow = false;
        }
      });
    }
    menus[index].isShow = allowRouter.value.includes(item.path) ? true : flage;
  });
  setGoMenus(menus);
};

//设置自动访问界面
const setGoMenus = (menus: any) => {
  let menusArr: Array<any> = [];
  let arrempty: Array<any> = [];
  let arremptyTop: Array<any> = [];
  menus.forEach((item: any) => {
    let childrenMenusArr: Array<any> = [];
    if (item.path != "") {
      arrempty.push(item.path);
      arremptyTop.push(item.path.split("/")[1]);
    }
    if (item.children.length > 0) {
      item.children.forEach((item_1: any) => {
        if (item_1.path != "") {
          arrempty.push(item_1.path);
          arremptyTop.push(item_1.path.split("/")[1]);
        }
        if (item_1.isShow) childrenMenusArr.push(item_1);
      });
    }
    item.children = childrenMenusArr;
    if (item.isShow) menusArr.push(item);
  });
  if (!arremptyTop.includes(route.path.split("/")[1])) {
    router.push(arrempty[0]);
  }
  menusList.value = menusArr;
};

//设置 localStorage 中allowRouter
const getAccountMenu = () => {
  let allowRouterEKB: any = localStorage.getItem("allowRouter");
  allowRouter.value = JSON.parse(allowRouterEKB).list;
};
defineExpose({
  setMenu
})
</script>
