<template>
  <a-col id="vue-admin-beautiful">
    <NameTop></NameTop>
    <a-config-provider :locale="locale_s">
      <router-view />
    </a-config-provider>
  </a-col>
</template>
<script lang="ts" setup name="APP">
import { ref, provide } from "vue";
import NameTop from "@/components/modules/nameTop.vue";
import zhCN from "ant-design-vue/es/locale/zh_CN";
import enGB from "ant-design-vue/es/locale/en_GB";
import dayjs from "dayjs";
import { useI18n } from "vue-i18n";
import "dayjs/locale/zh-cn";
dayjs.locale("zh-cn");
const { locale } = useI18n();
const locale_s = ref(locale.value == "zh" ? zhCN : enGB);
const reload = () => {
  locale_s.value = locale.value == "zh" ? zhCN : enGB;
};
provide("reload", reload);
</script>
<style lang="less" scoped>
#vue-admin-beautiful {
  height: 100vh;
  overflow: hidden;
}
</style>
