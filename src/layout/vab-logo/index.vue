<template>
  <a-anticoncol class="vab-logo">
    <div :class="collapse ? 'anticon' : 'anticon-s'">
      <span v-if="locale == 'zh'">动态超市</span>
      <span v-if="locale == 'en'">supermarket</span>
    </div>
  </a-anticoncol>
</template>
<script lang="ts" setup>
import { useI18n } from "vue-i18n";
import { useStore } from "vuex";
import { ref } from "vue";
const { t, locale } = useI18n();
const store = useStore();
const collapse = ref<boolean>(store.state.settings.collapse);
const setCollapse = (value: boolean) => (collapse.value = value);
</script>
<style lang="less" scoped>
.vab-logo {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 64px;
  font-size: 20px;
  font-weight: bold;
  // color: #de0000;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  border-bottom: 1px solid #485460;
  background: #485460;
  border-right: 1px solid rgb(223, 223, 224);
  text-align: center;
}
.anticon {
  width: 60px !important;
  height: 18px !important;
  line-height: 18px;
  font-size: 12px;
  font-weight: bold;
  color: #fff;
}
.anticon-s {
  margin: 0 auto;
  width: 220px;
  // height: 300px;
  // line-height: 64px;
  color: white;
  background: #485460;
  font-size: 26px;
}
</style>
